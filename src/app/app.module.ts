//===============================================================================
// © 2018 Optipro.  All rights reserved.
// Original Author: Shashank Jain
// Original Date: 10 March 2018
//==============================================================================

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { LeftComponent } from './common/left/left.component';

import { TopComponent } from './common/top/top.component';
import { MainContentComponent } from './common/main-content/main-content.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './guards/intercepters/authIntercepter';
import { RightComponent } from './common/right/right.component';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown'; // Bootstrap Dropdown
import { ModalModule } from 'ngx-bootstrap/modal'; // Bootstrap modal

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar'; // perfect scroll bar
import { SignupComponent } from 'src/app/account/signup/signup.component';
import { SigninComponent } from 'src/app/account/signin/signin.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ResetPasswordComponent } from 'src/app/account/reset-password/reset-password.component';
import { ChangePasswordComponent } from 'src/app/account/change-password/change-password.component';
import { SetPasswordComponent } from 'src/app/account/set-password/set-password.component';
import { TenantselectionComponent } from 'src/app/account/tenantselection/tenantselection.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';

// for svg icon
// import { HttpClientModule } from '@angular/common/http'; also need this module
import { AngularSvgIconModule } from 'angular-svg-icon';

// It's for dropdown module
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { GridModule } from '@progress/kendo-angular-grid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ApproveUsersComponent } from './account/approve-users/approve-users.component';
import { ConfirmPasswordEquilValidatorDirectiveDirective } from './confirm-password-equil-validator-directive.directive';


const routes: Routes = [
  
  
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: SigninComponent },
  // { path: 'home', component: HomeComponent,canActivate:[AuthGuard] },
  { path: 'home', component: HomeComponent ,canActivate:[AuthGuard]},
  {path:'approve',component:ApproveUsersComponent},  
  {path:'resetpassword',component:ResetPasswordComponent},
  {path:'changepassword',component:ChangePasswordComponent},
  {path:'setpassword',component:SetPasswordComponent},
  {path:'tenantselection',component:TenantselectionComponent},
 // {path:'manageusers',component:UserListWithStatusComponent},
  { path: '', redirectTo: 'login',pathMatch: 'full' },
  {path: '**', component: SigninComponent}
 ];
@NgModule({
  declarations: [
    AppComponent,
    LeftComponent,    
    TopComponent,
    MainContentComponent,
    RightComponent,
    HomeComponent,

    // Account

    ChangePasswordComponent,
    ResetPasswordComponent,
    SetPasswordComponent,
    SigninComponent ,
    SignupComponent,
    TenantselectionComponent,
    ApproveUsersComponen,
    ConfirmPasswordEquilValidatorDirectiveDirectivet
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    ButtonsModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    PerfectScrollbarModule,
    RouterModule.forRoot(routes),
    HttpClientModule, 
    AngularSvgIconModule, 
    DropDownsModule, 
    BrowserAnimationsModule, 
    BrowserAnimationsModule,
    TooltipModule.forRoot(),
    GridModule
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
