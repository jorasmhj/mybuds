import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ForgotPasswordComponent } from './forgot-password.component'

const routes: Routes = [{ path: '', component: ForgotPasswordComponent }]

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class ForgotPasswordRoutingModule {}
