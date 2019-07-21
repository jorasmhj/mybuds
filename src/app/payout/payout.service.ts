import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class PayoutService {
    constructor(private http: HttpClient) {}

    url = `http://192.168.100.11:3000/payout/addaccount`;

    addAccount(account) {
        return this.http.post(this.url, account);
    }
}
