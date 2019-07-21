import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../environments/environment'

@Injectable({
    providedIn: 'root'
})
export class PostService {
    private baseUrl = environment.apiUrl
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.getToken()
        })
    }

    constructor(private http: HttpClient) {}

    getPost(userId) {
        console.log(userId)
        return this.http.get(`${this.baseUrl}/post/?userId=${userId}`, this.httpOptions)
    }

    createPost(post) {
        return this.http.post(`${this.baseUrl}/post`, post, this.httpOptions)
    }

    deletePost(postId) {
        return this.http.delete(`${this.baseUrl}/${postId}`, this.httpOptions)
    }

    reactPost(option) {
        return this.http.post(`${this.baseUrl}/post-react/`, {
            token: this.getToken(),
            ...option
        })
    }

    getReact(postId) {
        return this.http.get(`${this.baseUrl}/post-react/${postId}`, this.httpOptions)
    }

    getToken() {
        return localStorage.getItem('token')
    }
}
