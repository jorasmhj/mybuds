import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from './forgot-password.component';
import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [ForgotPasswordComponent],
	imports: [
		FormsModule,
		CommonModule,
		ForgotPasswordRoutingModule,
	]
})
export class ForgotPasswordModule { }
