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
    { code: 'NP', currency: 'NPR', name: 'Nepal' },
    { code: 'AU', currency: 'AUD', name: 'Australia' },
    { code: 'CA', currency: 'CAD', name: 'Canada' },
    { code: 'IN', currency: 'IND', name: 'India' },
    { code: 'US', currency: 'USD', name: 'United States' },
    { code: 'UK', currency: 'GBP', name: 'United Kingdom' }
  ]
  country: any = ''
  newAccount = {}

  constructor(private payoutService: PayoutService) {}

  ngOnInit() {}

  changeCountry(country) {
    if (country == '') {
      this.country = ''
      return
    }
    this.country = JSON.parse(country)
    this.newAccount['country'] = this.country['code']
    this.newAccount['currency'] = this.country['currency']
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
    this.payoutService.addAccount(this.newAccount).subscribe(
      res => {
        console.log(res)
      },
      err => {
        console.log(err)
      }
    )
  }
}
