import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl = 'https://mybuds-backend.herokuapp.com/post/';

  constructor(private http: HttpClient) { }

  getPost(userId) {
    console.log(userId);
    return this.http.get(this.baseUrl + '?token=' + this.getToken() + '&userId=' + userId);
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

  reactPost(option) {
    return this.http.post('https://mybuds-backend.herokuapp.com/post-react/', {
      token: this.getToken(),
      ...option
    });
  }

  getReact(postId) {
    return this.http.get(('https://mybuds-backend.herokuapp.com/post-react/' + postId + '/?token=' + this.getToken()));
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
