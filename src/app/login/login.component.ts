import { Component, OnInit, HostBinding } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { moveIn } from '../animation';
import { MatSnackBar } from '@angular/material';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [moveIn()]
})
export class LoginComponent implements OnInit {
  @HostBinding('@moveIn')
  user: any = {};
  loginError: string;
  submit = false;
  showPassword = 'password';

  constructor(
    private userService: UserService,
    private router: Router,
    private titleService: Title,
    public snackBar: MatSnackBar,
    public _flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Login');
    if (this.userService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top'
    });
  }

  toggleShowPassword() {
    if (this.showPassword === 'password') {
      this.showPassword = 'text';
    } else {
      this.showPassword = 'password';
    }
  }

  login(event) {
    this.submit = true;
    this.userService.login(this.user).subscribe(
      data => {
        this.userService.loggedIn(data);
        this.router.navigate(['/dashboard']);
        this.submit = false;
        this._flashMessagesService.show('Logged In.', {
          cssClass: 'alert-success',
          timeout: 4000
        });
      },
      error => {
        this.loginError = error.error.error;
        this.openSnackBar(error.error.error, 'Close');
        this.user.password = null;
        this.submit = false;
      }
    );
  }
}
