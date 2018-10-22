import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user: User = new User();
  conformPassword: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Sign Up');
  }

  signUp(form) {
    this.userService.signUp(this.user).subscribe(
      data => {
        this.userService.loggedIn(data);
        this.router.navigate(['/dashboard']);
      },
      error => {
        console.log(error);
      }
    );
  }
}
