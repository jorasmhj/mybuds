import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { RouterModule, PreloadAllModules } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatSnackBarModule, MatMenuModule, MatSidenavModule } from '@angular/material'
import { FlashMessagesModule } from 'angular2-flash-messages'
import { AgmCoreModule } from '@agm/core'

import { AppComponent } from './app.component'
import { NavbarComponent } from './navbar/navbar.component'
import { NotFoundComponent } from './not-found/not-found.component'
import { LoginComponent } from './login/login.component'
import { SignupComponent } from './signup/signup.component'
import { DashboardComponent } from './user/dashboard/dashboard.component'
import { AuthGuardService } from './auth-guard.service'
import { CoverComponent } from './user/dashboard/cover/cover.component'
import { ProjectComponent } from './project/project.component'
import { PostModule } from './post/post.module'
import { PayoutComponent } from './payout/payout.component'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NotFoundComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    CoverComponent,
    ProjectComponent,
    PayoutComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBYSdzNZkdiZ_PRcsnOgnbGf4V7ugwI7no',
      libraries: ['places']
    }),
    PostModule,
    BrowserModule,
    MatSidenavModule,
    MatMenuModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    HttpClientModule,
    FlashMessagesModule.forRoot(),
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
        {
          path: 'settings',
          loadChildren: './user/settings/settings.module#SettingsModule'
        },
        {
          path: 'projects',
          component: ProjectComponent
        },
        {
          path: 'forgot-password',
          loadChildren: './forgot-password/forgot-password.module#ForgotPasswordModule'
        },
        {
          path: 'payout',
          component: PayoutComponent
        },

        { path: '**', component: NotFoundComponent }
      ],
      { preloadingStrategy: PreloadAllModules }
      // { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
