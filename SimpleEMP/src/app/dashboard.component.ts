import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmployeeService, Employee } from './employee.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {
  totalEmployees = 0;
  totalSalary = 0;
  maleCount = 0;
  femaleCount = 0;
  recentEmployees: Employee[] = [];
  loading = true;

  constructor(
    private employeeService: EmployeeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    this.loading = true;
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        const employees = data || [];
        this.totalEmployees = employees.length;
        this.totalSalary = employees.reduce((sum, emp) => sum + (Number(emp.salary) || 0), 0);
        this.maleCount = employees.filter(e => e.gnder === 'Male').length;
        this.femaleCount = employees.filter(e => e.gnder === 'Female').length;
        this.recentEmployees = employees.slice(-5).reverse();
        this.loading = false;
        this.cdr.detectChanges(); // Force refresh
      },
      error: () => {
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
