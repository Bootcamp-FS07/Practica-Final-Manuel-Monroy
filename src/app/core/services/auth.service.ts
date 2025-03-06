import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { RegisterResponse } from '../../shared/models/register-response.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrlLogin = environment.apiUrl + '/auth/login';
  private profileUrl = environment.apiUrl + '/user/profile/';
  private signupUrl = environment.apiUrl + '/auth/signup';
  private http = inject(HttpClient);

  login(
    username: string,
    password: string
  ): Observable<{ access_token: string }> {
    return this.http
      .post<{ access_token: string }>(this.apiUrlLogin, { username, password })
      .pipe(
        tap(response => {
          localStorage.setItem('authToken', response.access_token);
        })
      );
  }

  getUserProfile(): Observable<{ _id: string; username: string }> {
    const token = localStorage.getItem('authToken');

    return this.http
      .get<{ _id: string; username: string }>(this.profileUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(
        tap(response => {
          localStorage.setItem('userId', response._id);
          localStorage.setItem('username', response.username);
        })
      );
  }

  register(email: string, password: string): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(this.signupUrl, {
      username: email,
      password,
    });
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }
}
