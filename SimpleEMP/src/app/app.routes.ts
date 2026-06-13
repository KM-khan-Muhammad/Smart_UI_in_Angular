import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { EmployeeComponent } from './employee/employee.component';
import { SettingsComponent } from './settings.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'employe-list', component: EmployeeComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'departments', component: DashboardComponent }, // Placeholder
  { path: 'reports', component: DashboardComponent }, // Placeholder
];
