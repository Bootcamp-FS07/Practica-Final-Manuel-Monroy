import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Post } from '../models/register-response.model';
import { PostService } from '../services/post.service';
import { MatDialog } from '@angular/material/dialog';
import { EditPostDialogComponent } from '../edit-post-dialog/edit-post-dialog.component';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-feed',
  standalone: true,
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
  imports: [FormsModule, CommonModule, MatIconModule],
})
export class FeedComponent implements OnInit {
  posts: Post[] = [];
  newPost = '';
  userId: string | null = localStorage.getItem('userId');

  constructor(
    private postService: PostService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts() {
    this.postService.getPosts().subscribe({
      next: posts => {
        this.posts = posts;
        console.log('Posts cargados:', this.posts);
      },
      error: err => {
        console.error('Error al obtener los posts', err);
        alert('Error al cargar los posts');
      },
    });
  }

  addPost() {
    if (this.newPost.trim().length > 0 && this.newPost.length <= 200) {
      this.postService.addPost(this.newPost).subscribe({
        next: () => {
          this.newPost = '';
          this.loadPosts();
        },
        error: err => {
          console.error('Error al agregar el post', err);
          alert('Error al agregar el post');
        },
      });
    } else {
      alert('El post debe tener entre 1 y 200 caracteres.');
    }
  }

  openEditDialog(post: Post): void {
    const dialogRef = this.dialog.open(EditPostDialogComponent, {
      width: '400px',
      data: { post },
    });

    dialogRef.afterClosed().subscribe((updatedPost: Post) => {
      if (updatedPost) {
        const index = this.posts.findIndex(p => p._id === updatedPost._id);
        if (index !== -1) {
          this.posts[index] = updatedPost;
        }
      }
    });
  }

  openDeleteDialog(postId: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { message: '¿Estás seguro de que deseas eliminar este post?' },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deletePost(postId);
      }
    });
  }

  deletePost(postId: string) {
    this.postService.deletePost(postId).subscribe({
      next: () => {
        this.loadPosts();
      },
      error: err => {
        console.error('Error al eliminar el post', err);
        alert('Error al eliminar el post');
      },
    });
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    this.router.navigate(['/auth/login']);
  }
}
