import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { RegisterResponse } from '../models/register-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth/login';
  private profileUrl = 'http://localhost:3000/user/profile/';
  private signupUrl = 'http://localhost:3000/auth/signup';
  private http = inject(HttpClient);
  //public staticToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hbnVlbDExQGdtYWlsLmNvbSIsInN1YiI6IjY3YzZmZGMyYzk0ZjMyNWZmNWY0OGNkNiIsImlhdCI6MTc0MTA5NDM4OSwiZXhwIjoxNzQxMTA1MTg5fQ.7GPoFAaL-RlQM9bxkyTvSU_S6eaJocAeIlE94tsmkag';
  login(
    username: string,
    password: string
  ): Observable<{ access_token: string }> {
    return this.http
      .post<{ access_token: string }>(this.apiUrl, { username, password })
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
