import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  private iss = {
    login: 'https://mybuds.herokuapp.com/api/auth/login',
    signup: 'https://mybuds.herokuapp.com/api/auth/signup'
  };
  private baseUrl = 'http://localhost:3000/user/';
  get user() {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user) return user;
  }

  constructor(private http: HttpClient) {}

  signUp(user) {
    return this.http.post(this.baseUrl + 'signup', user);
  }

  login(user) {
    this.httpOptions.headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
    return this.http.post(this.baseUrl + 'login', user, this.httpOptions);
  }

  me() {
    return this.http.post(this.baseUrl + 'me', {
      token: this.getToken()
    });
  }

  getUser(id) {
    return this.http.get(this.baseUrl + 'getUser/' + id);
  }

  loggedIn(data) {
    localStorage.setItem('token', data.token);
    // this.me();
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    // return tokenNotExpired();
    const token = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return new Date().getTime() / 1000 < payload.exp ? true : false;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  uploadPic(pic) {
    let fd = new FormData();
    fd.append('userImage', pic, pic.name);
    let data = {a: 'good'};
    fd.append('data', JSON.stringify(data));
    return this.http.patch(this.baseUrl + 'upload-img/?token=' + this.getToken(), fd, {
      reportProgress: true,
      observe: 'events'
    });
  }
}
