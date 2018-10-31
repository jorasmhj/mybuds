import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  open = 0;

  constructor(public userService: UserService, private router: Router) {}

  ngOnInit() {}

  trigger() {
    this.open = this.open === 1 ? 0 : 1;
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/']);
  }
}
