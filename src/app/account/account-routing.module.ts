import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { TenantselectionComponent } from './tenantselection/tenantselection.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  { path: '', component: SigninComponent },
  { path: 'login', component: SigninComponent },
  { path: 'signup', component: SignupComponent },  
  { path: 'resetpassword', component: ResetPasswordComponent },
  
  { path: 'setpassword', component: SetPasswordComponent },
  { path: 'tenantselection', component: TenantselectionComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
