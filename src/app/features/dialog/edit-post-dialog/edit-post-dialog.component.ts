import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { PostService } from '../../../core/services/post.service';
import { Post } from '../../../shared/models/register-response.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-post-dialog',
  templateUrl: './edit-post-dialog.component.html',
  styleUrls: ['./edit-post-dialog.component.scss'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    CommonModule,
  ],
})
export class EditPostDialogComponent {
  postText: string;

  constructor(
    public dialogRef: MatDialogRef<EditPostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { post: Post },
    private postService: PostService
  ) {
    this.postText = data.post.text;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    const updatedPost = { ...this.data.post, text: this.postText };
    this.postService.updatePost(updatedPost._id, this.postText).subscribe({
      next: () => {
        this.dialogRef.close(updatedPost);
      },
      error: err => {
        console.error('Error al editar el post', err);
        alert('Error al editar el post');
      },
    });
  }
}
