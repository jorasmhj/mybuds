import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { decode } from '@angular/router/src/url_tree';
import { stringify } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private iss = {
    login: 'https://herokuapp.com/api/auth/login',
    signup: 'https://herokuapp.com/api/auth/signup'
  };
  private baseUrl = 'https://herokuapp.com/api/auth/';
  get user() {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user) return user;
  }

  constructor(private http: HttpClient) {}

  signUp(user) {
    return this.http.post(this.baseUrl + 'signup', user);
  }

  login(user) {
    return this.http.post(this.baseUrl + 'login', user);
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
    localStorage.setItem('token', data.access_token);
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
}
