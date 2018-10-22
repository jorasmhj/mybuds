import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { AuthGuardService } from './auth-guard.service';
import { CoverComponent } from './user/dashboard/cover/cover.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NotFoundComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    CoverComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          component: LoginComponent
        },
        { path: 'signup', component: SignupComponent },
        {
          path: 'dashboard',
          component: DashboardComponent,
          canActivate: [AuthGuardService]
        },
        {
          path: 'user/:id',
          component: DashboardComponent,
          canActivate: [AuthGuardService]
        },

        { path: '**', component: NotFoundComponent }
      ]
      // { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
