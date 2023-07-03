import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getEmployeeData(): Observable<any> {
    return this.http.get("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
  }
  handleEdit(row: any) {
    row['edit'] = true;
  }
}
