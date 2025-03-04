import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

interface Post {
  id: number;
  content: string;
  user: string;
  date: Date;
}

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private posts: Post[] = [
    {
      id: 1,
      content: 'Primer post',
      user: 'user1',
      date: new Date('2025-03-01T12:00:00'),
    },
    {
      id: 2,
      content: 'Segundo post',
      user: 'user2',
      date: new Date('2025-03-02T14:00:00'),
    },
  ];

  getPosts(): Observable<Post[]> {
    return of(this.posts.sort((a, b) => b.date.getTime() - a.date.getTime()));
  }

  addPost(content: string, user: string): void {
    this.posts.push({
      id: this.posts.length + 1,
      content,
      user,
      date: new Date(),
    });
  }
}
