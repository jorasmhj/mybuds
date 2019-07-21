import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    open = 0;

    constructor(public userService: UserService, private router: Router, private _flashMessagesService: FlashMessagesService) {}

    ngOnInit() {}

    trigger() {
        this.open = this.open === 1 ? 0 : 1;
    }

    logout() {
        this.userService.logout();
        this.router.navigate(['/']);
        this._flashMessagesService.show('Logged Out.', {
            cssClass: 'alert-success',
            timeout: 4000
        });
    }
}
