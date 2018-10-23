import { Component, OnInit, HostBinding } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { moveIn, fallIn } from '../animation';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  animations: [moveIn()]
})
export class SignupComponent implements OnInit {
  @HostBinding('@moveIn')
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
