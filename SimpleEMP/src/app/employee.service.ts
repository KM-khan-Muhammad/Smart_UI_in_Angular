import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Employee {
  id?: number;
  name: string;
  post: string;
  salary: number;
  gnder: string;
  profileImg: string;
  coverImg: string;
}

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = 'http://localhost:5085/api/Employes';

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    // Sending as JSON body now
    return this.http.post<Employee>(this.apiUrl, employee);
  }

  deleteEmployee(id: number): Observable<string> {
    return this.http.delete(this.apiUrl, { 
      params: new HttpParams().set('id', id.toString()),
      responseType: 'text' 
    });
  }

  updateEmployee(id: number, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(this.apiUrl, employee, {
      params: new HttpParams().set('id', id.toString())
    });
  }
}
