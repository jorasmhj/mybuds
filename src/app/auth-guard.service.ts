import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private auth: UserService, private router: Router) {}

  canActivate(): boolean {
    if (this.auth.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['']);
    return false;
  }
}
