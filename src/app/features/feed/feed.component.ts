import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Post, Comment } from '../../shared/models/register-response.model';
import { PostService } from '../../core/services/post.service';
import { MatDialog } from '@angular/material/dialog';
import { EditPostDialogComponent } from '../dialog/edit-post-dialog/edit-post-dialog.component';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../core/services/auth.service';
import { ConfirmDialogComponent } from '../dialog/confirm-dialog/confirm-dialog.component';

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
  userName: string | null = localStorage.getItem('username');

  // Paginación
  currentPage = 1;
  postsPerPage = 5;
  paginatedPosts: Post[] = [];

  comments: Record<string, Comment[]> = {};
  newComment: Record<string, string> = {};

  constructor(
    private postService: PostService,
    private router: Router,
    public dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts() {
    this.postService.getPosts().subscribe({
      next: posts => {
        this.posts = posts;
        this.updatePaginatedPosts();
      },
      error: err => {
        console.error('Error al obtener los posts', err);
        alert('Error al cargar los posts');
      },
    });
  }

  updatePaginatedPosts() {
    const startIndex = (this.currentPage - 1) * this.postsPerPage;
    const endIndex = startIndex + this.postsPerPage;
    this.paginatedPosts = this.posts.slice(startIndex, endIndex);
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
          this.updatePaginatedPosts();
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

  nextPage() {
    if (this.currentPage * this.postsPerPage < this.posts.length) {
      this.currentPage++;
      this.updatePaginatedPosts();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedPosts();
    }
  }

  loadComments(postId: string) {
    this.postService.getComments(postId).subscribe({
      next: (comments: Comment[]) => {
        this.comments[postId] = comments;
      },
      error: err => {
        console.error(`Error al obtener comentarios del post ${postId}`, err);
      },
    });
  }

  toggleComments(postId: string) {
    if (this.comments[postId]) {
      delete this.comments[postId];
    } else {
      this.loadComments(postId);
    }
  }

  addComment(postId: string) {
    if (!this.newComment[postId] || this.newComment[postId].trim() === '')
      return;
    this.postService.addComment(postId, this.newComment[postId]).subscribe({
      next: () => {
        this.loadComments(postId);
        this.newComment[postId] = '';
      },
      error: err => {
        console.error('Error al agregar comentario', err);
        alert('Error al agregar comentario');
      },
    });
  }

  editComment(comment: Comment) {
    const newText = prompt('Edita tu comentario:', comment.text);
    if (newText && newText.trim() !== '') {
      this.postService.updateComment(comment._id, newText).subscribe({
        next: updatedComment => {
          comment.text = updatedComment.text; // Actualiza el comentario en la UI
        },
        error: err => {
          console.error('Error al editar comentario', err);
          alert('No se pudo editar el comentario.');
        },
      });
    }
  }

  deleteComment(commentId: string, postId: string) {
    this.postService.deleteComment(commentId).subscribe({
      next: () => {
        this.comments[postId] = this.comments[postId].filter(
          c => c._id !== commentId
        );
      },
      error: err => {
        console.error('Error al eliminar comentario', err);
        alert('No se pudo eliminar el comentario.');
      },
    });
  }

  openEditCommentDialog(comment: Comment) {
    const dialogRef = this.dialog.open(EditPostDialogComponent, {
      width: '400px',
      data: { post: comment },
    });

    dialogRef.afterClosed().subscribe(updatedComment => {
      if (updatedComment) {
        comment.text = updatedComment.text;
      }
    });
  }

  openDeleteCommentDialog(commentId: string, postId: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        message: '¿Estás seguro de que deseas eliminar este comentario?',
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteComment(commentId, postId);
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
