import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PostService } from '../post.service';

interface Post {
  id: number;
  content: string;
  user: string;
  date: Date;
}

@Component({
  selector: 'app-feed',
  standalone: true,
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
  providers: [PostService],
  imports: [FormsModule, CommonModule],
})
export class FeedComponent implements OnInit {
  posts: Post[] = [];
  newPost = '';

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
    });
  }

  addPost() {
    if (this.newPost.trim().length > 0 && this.newPost.length <= 200) {
      this.postService.addPost(this.newPost, 'currentUser');
      this.newPost = '';
      this.loadPosts();
    } else {
      alert('El post debe tener entre 1 y 200 caracteres.');
    }
  }
}
