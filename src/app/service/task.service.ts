import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  baseUrl = 'http://127.0.0.1:8000/'

  constructor(private http: HttpClient, private router: Router) { }

  private getObservableResponse(
    endPointUrl: string,
    requestMethod: 'get' | 'post' | 'put' | 'delete',
    data: any,
  ): Observable<any> | null {

    const TOKEN = localStorage.getItem('token') ?? null;

    if (!TOKEN) {
      this.router.navigateByUrl('');
      return null;
    }

    const HEADERS = new HttpHeaders({
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `${TOKEN}`
    });

    switch (requestMethod) {

      case 'get':
        return this.http.get(`${this.baseUrl}${endPointUrl}`, { headers: HEADERS });
      case 'post':
        return this.http.post(`${this.baseUrl}${endPointUrl}`, data, { headers: HEADERS });
      case 'put':
        return this.http.put(`${this.baseUrl}${endPointUrl}`, data, { headers: HEADERS });
      case 'delete':
        return this.http.delete(`${this.baseUrl}${endPointUrl}`, { headers: HEADERS });
    }
  }


  getStatusChoices(): Observable<any> | null  {
    return this.getObservableResponse('status-choices/', 'get', null);
  }


  getPriorityChoices(): Observable<any> | null  {
    return this.getObservableResponse('priority-choices/', 'get', null);
  }


  getAllTask(): Observable<any> | null  {
    return this.getObservableResponse('task/', 'get', null);
  }


  createTask(data: any): Observable<any> | null  {
    return this.getObservableResponse('task/', 'post', data);
  }

  
  getTaskById(id: any): Observable<any> | null  {
    return this.getObservableResponse(`task/${id}`, 'get', null);
  }


  updateTask(id: any, data: any): Observable<any> | null  {
    return this.getObservableResponse(`task/${id}/`, 'put', data);
  }


  deleteTask(id: any): Observable<any> | null  {
    return this.getObservableResponse(`task/${id}/`, 'delete', null);
  }
}
