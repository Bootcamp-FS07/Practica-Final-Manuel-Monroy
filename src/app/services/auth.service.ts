import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Post } from '../models/register-response.model';  // Ajusta la ruta si es necesario
import { RegisterResponse } from '../models/register-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth/login';
  private profileUrl = 'http://localhost:3000/user/profile/';
  private signupUrl = 'http://localhost:3000/auth/signup';
  private http = inject(HttpClient);

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

  getPosts(): Observable<Post[]> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Post[]>(this.apiUrl, { headers });
  }
}
