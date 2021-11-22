import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewEmployee } from './employee.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  constructor(private http: HttpClient) { }

  api: string = "	http://dummy.restapiexample.com/api/v1";

  getEmployees(): Observable<any>{
    return this.http.get<any>(`${this.api}/employees`);
  }

  getEmployeeById(id: number | undefined): Observable<any>{
    return this.http.get<any>(`${this.api}/employee/${id}`);
  }

  createEmployee(employee: NewEmployee): Observable<any> {
    return this.http.post(`${this.api}/create`, JSON.stringify(employee));
  }

  updateEmployee(employee: NewEmployee, id: number | undefined): Observable<any> {
    return this.http.put(`${this.api}/update/${id}`, JSON.stringify(employee));
  }

  deleteEmployeeById(id: number | undefined): Observable<any>{
    return this.http.delete(`${this.api}/delete/${id}`);
  }

}
