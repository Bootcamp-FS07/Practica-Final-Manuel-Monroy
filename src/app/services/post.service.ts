import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/register-response.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = 'http://localhost:3000/post';
  private http = inject(HttpClient);

  getPosts(): Observable<Post[]> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Post[]>(this.apiUrl, { headers });
  }

  addPost(text: string): Observable<Post> {
    const token = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      throw new Error('No hay token o userId disponible');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const body = {
      text,
      author: userId,
    };

    return this.http.post<Post>('http://localhost:3000/post', body, {
      headers,
    });
  }

  deletePost(postId: string): Observable<void> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${this.apiUrl}/${postId}`, { headers });
  }

  updatePost(postId: string, text: string): Observable<Post> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.patch<Post>(
      `${this.apiUrl}/${postId}`,
      { text },
      { headers }
    );
  }
}
