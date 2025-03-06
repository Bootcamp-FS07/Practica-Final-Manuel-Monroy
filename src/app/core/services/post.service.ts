import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post, Comment } from '../../shared/models/register-response.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = environment.apiUrl + '/post';
  private commentUrl = environment.apiUrl + '/comment';
  private http = inject(HttpClient);

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }

  addPost(text: string): Observable<Post> {
    const userId = localStorage.getItem('userId');
    if (!userId) throw new Error('No hay userId disponible');

    const body = { text, author: userId };
    return this.http.post<Post>(this.apiUrl, body);
  }

  deletePost(postId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${postId}`);
  }

  updatePost(postId: string, text: string): Observable<Post> {
    return this.http.patch<Post>(`${this.apiUrl}/${postId}`, { text });
  }

  getComments(postId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.commentUrl}?postId=${postId}`);
  }

  addComment(postId: string, text: string): Observable<Comment> {
    const userId = localStorage.getItem('userId');
    if (!userId) throw new Error('No hay userId disponible');

    const body = { text, author: userId, post: postId };
    return this.http.post<Comment>(this.commentUrl, body);
  }

  updateComment(commentId: string, newText: string): Observable<Comment> {
    return this.http.patch<Comment>(`${this.commentUrl}/${commentId}`, { text: newText });
  }

  deleteComment(commentId: string): Observable<void> {
    return this.http.delete<void>(`${this.commentUrl}/${commentId}`);
  }
}
