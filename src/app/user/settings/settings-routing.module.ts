import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { SettingsComponent } from './settings.component'
import { AuthGuardService } from 'src/app/auth-guard.service'

const routes: Routes = [{ path: '', component: SettingsComponent, canActivate: [AuthGuardService] }]

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class SettingsRoutingModule {}
