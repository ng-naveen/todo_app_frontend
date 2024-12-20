import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = 'http://127.0.0.1:8000/'
  private _authState = new BehaviorSubject<boolean>(this.isAuthenticated());

  constructor(private http: HttpClient) { }

  get authState() {
    return this._authState.asObservable();
  }

  updateAuthState(isLoggedIn: boolean) {
    this._authState.next(isLoggedIn);
  }


  register(data: any) {
    let headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Accept': 'application/json'
    })
    return this.http.post(`${this.baseUrl}user/`, data, { headers: headers });
  }

  login(data: any) {

    return this.http.post(`${this.baseUrl}token/`, data);
  }

  isAuthenticated() {
    return 'token' in localStorage;
  }
}
