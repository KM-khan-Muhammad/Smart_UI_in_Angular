import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { EmployeeService, Employee } from '../employee.service';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './employee.html',
  styleUrl: './employee.css',
})
export class EmployeeComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  loading = false;
  error = '';
  searchQuery = '';
  
  activeEmp: Employee = this.resetEmp();
  isEditing = false;
  showAddForm = false;

  constructor(
    private employeeService: EmployeeService,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadEmployees();
  }

  resetEmp(): Employee {
    return { name: '', post: '', salary: 0, gnder: 'Male', profileImg: '', coverImg: '' };
  }

  sanitizeImageUrl(url: string): SafeUrl {
    if (!url) return 'https://ui-avatars.com/api/?name=User';
    // If it's already a base64 or safe http url, let it through
    if (url.startsWith('data:') || url.startsWith('http')) {
      return this.sanitizer.bypassSecurityTrustUrl(url);
    }
    // Handle local paths if they exist, but base64 is preferred
    if (url.startsWith('C:') || url.startsWith('file:')) {
      return this.sanitizer.bypassSecurityTrustUrl(url);
    }
    return url;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.activeEmp.profileImg = e.target.result; // This will be the base64 string
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(file);
    }
  }

  loadEmployees() {
    this.loading = true;
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.employees = data || [];
        console.log('Employees loaded:', this.employees);
        this.applyFilter();
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load employees. Check if API and Database are running.';
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  applyFilter() {
    if (!this.searchQuery) {
      this.filteredEmployees = [...this.employees];
    } else {
      const query = this.searchQuery.toLowerCase();
      this.filteredEmployees = this.employees.filter(e => 
        (e.name?.toLowerCase() || '').includes(query) || 
        (e.post?.toLowerCase() || '').includes(query)
      );
    }
  }

  onSearch() {
    this.applyFilter();
  }

  saveEmployee() {
    if (!this.activeEmp.name) return;
    this.loading = true;

    if (this.isEditing && this.activeEmp.id) {
      this.employeeService.updateEmployee(this.activeEmp.id, this.activeEmp).subscribe({
        next: () => this.handleSuccess(),
        error: (err) => this.handleError('Update failed')
      });
    } else {
      this.employeeService.addEmployee({ ...this.activeEmp }).subscribe({
        next: () => this.handleSuccess(),
        error: () => this.handleError('Creation failed')
      });
    }
  }

  handleSuccess() {
    this.activeEmp = this.resetEmp();
    this.showAddForm = false;
    this.isEditing = false;
    this.loadEmployees();
  }

  handleError(msg: string) {
    this.error = msg;
    this.loading = false;
    this.cdr.detectChanges();
  }

  edit(emp: Employee) {
    this.activeEmp = { ...emp };
    this.isEditing = true;
    this.showAddForm = true;
  }

  delete(id: number) {
    if (!confirm('Are you sure?')) return;
    this.employeeService.deleteEmployee(id).subscribe({
      next: () => this.loadEmployees(),
      error: () => (this.error = 'Delete failed'),
    });
  }

  cancel() {
    this.showAddForm = false;
    this.isEditing = false;
    this.activeEmp = this.resetEmp();
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) {
      this.cancel();
    }
  }
}
