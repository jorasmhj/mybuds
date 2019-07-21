import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment'

@Injectable({
    providedIn: 'root'
})
export class PayoutService {
    constructor(private http: HttpClient) {}
    baseUrl = environment.apiUrl

    addAccount(account) {
        return this.http.post(`${this.baseUrl}/payout/addaccount`, account)
    }
}
