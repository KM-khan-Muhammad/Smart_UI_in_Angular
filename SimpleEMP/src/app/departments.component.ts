import { Component } from '@angular/core';

@Component({
  selector: 'app-departments',
  standalone: true,
  template: `<div class="placeholder-container"><h2>Departments</h2><p>Department management coming soon.</p></div>`,
  styles: [`.placeholder-container { padding: 2rem; background: var(--bg-card); margin: 2rem auto; max-width: 1000px; border-radius: var(--radius); text-align: center; }`]
})
export class DepartmentsComponent {}
