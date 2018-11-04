import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl = 'https://mybuds.herokuapp.com/api/auth/';

  constructor(private http: HttpClient) {}

  getPost() {
    return this.http.get(this.baseUrl + 'post?token=' + this.getToken());
  }

  createPost(post) {
    return this.http.post(this.baseUrl + 'post', {
      token: this.getToken(),
      post: post
    });
  }

  deletePost(postId) {
    return this.http.post(this.baseUrl + 'post/' + postId, {
      token: this.getToken()
    });
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
