import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl = 'http://localhost:3000/post/';

  constructor(private http: HttpClient) {}

  getPost() {
    return this.http.get(this.baseUrl + '?token=' + this.getToken());
  }

  createPost(post) {
    return this.http.post(this.baseUrl, {
      token: this.getToken(),
      ...post
    });
  }

  deletePost(postId) {
    return this.http.delete(this.baseUrl + postId + '?token=' + this.getToken());
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
