import { Component, OnInit, HostBinding } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { moveIn, fallIn } from '../animation';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  submit: boolean;

  constructor(
    private userService: UserService,
    private router: Router,
    private titleService: Title,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Sign Up');
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top'
    });
  }

  signUp(form) {
    this.submit = true;
    this.userService.signUp(this.user).subscribe(
      data => {
        this.userService.loggedIn(data);
        this.router.navigate(['/dashboard']);
        this.submit = false;
      },
      error => {
        console.log(error);
        this.submit = false;
        this.openSnackBar(error.error.message, 'Close');
      }
    );
  }
}
