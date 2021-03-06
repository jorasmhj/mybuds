import { FlashMessagesService } from 'angular2-flash-messages'
import { PayoutService } from './payout.service'
import { Component, OnInit } from '@angular/core'
import { moveIn, fallIn } from '../animation'

@Component({
    selector: 'app-payout',
    templateUrl: './payout.component.html',
    styleUrls: ['./payout.component.css'],
    animations: [fallIn(), moveIn()]
})
export class PayoutComponent implements OnInit {
    countries = [
        { code: 'NP', currency: 'NPR', name: 'Nepal', postalCode: '4470' },
        { code: 'AU', currency: 'AUD', name: 'Australia', postalCode: '4470' },
        { code: 'CA', currency: 'CAD', name: 'Canada', postalCode: 'k1a0b1' },
        { code: 'IN', currency: 'INR', name: 'India', postalCode: '4470' },
        { code: 'US', currency: 'USD', name: 'United States', postalCode: '44712' },
        { code: 'UK', currency: 'GBP', name: 'United Kingdom', postalCode: '44712' }
    ]
    country: any = ''
    newAccount = {}
    loading: boolean

    constructor(private payoutService: PayoutService, private _flashMessagesService: FlashMessagesService) {}

    ngOnInit() {}

    changeCountry(country) {
        if (country == '') {
            this.country = ''
            return
        }
        this.country = JSON.parse(country)
        this.newAccount['country'] = this.country['code']
        this.newAccount['currency'] = this.country['currency']
        this.newAccount['postalCode'] = this.country['postalCode']
    }

    branchIdRequired() {
        let countries = ['US', 'AU', 'UK', 'CA', 'IN']
        if (this.country['code'] !== 'CA') delete this.newAccount['bankId']
        if (this.country !== {} && countries.includes(this.country['code'])) {
            return true
        }
        delete this.newAccount['branchId']
        return false
    }

    swiftRequired() {
        let countries = ['NP', 'IN']
        if (this.country['code'] !== 'CA') delete this.newAccount['bankId']
        if (this.country !== {} && countries.includes(this.country['code'])) {
            return true
        }
        delete this.newAccount['swiftBic']
        return false
    }

    add() {
        this.loading = true
        this.payoutService.addAccount(this.newAccount).subscribe(
            res => {
                this._flashMessagesService.show(res['message'], {
                    cssClass: 'alert-success',
                    timeout: 4000
                })
                this.loading = false
            },
            err => {
                console.log(err)
                this._flashMessagesService.show(err['error']['message'], {
                    cssClass: 'alert-danger',
                    timeout: 4000
                })
                this.loading = false
            }
        )
    }
}
