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
import { GridModule, ExcelModule  } from '@progress/kendo-angular-grid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ApproveUsersComponent } from './account/approve-users/approve-users.component';
import { ConfirmPasswordEquilValidatorDirectiveDirective } from './directives/confirm-password-equil-validator-directive.directive';
import { LandingComponent } from './common/landing/landing.component'
import { LayoutModule } from '@progress/kendo-angular-layout'
import { PDFExportModule } from '@progress/kendo-angular-pdf-export'
import { DateInputsModule } from '@progress/kendo-angular-dateinputs'
import { UploadModule } from '@progress/kendo-angular-upload'
import { InputsModule } from '@progress/kendo-angular-inputs';



const routes: Routes = [
  
  
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: SigninComponent },  
  { path: 'home', component: HomeComponent},
  {path:'approve',component:ApproveUsersComponent},  
  {path:'resetpassword',component:ResetPasswordComponent},
  {path:'changepassword',component:ChangePasswordComponent},
  {path:'setpassword',component:SetPasswordComponent},
  {path:'tenantselection',component:TenantselectionComponent},
  {path:'landing',component:LandingComponent},
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
    ApproveUsersComponent,
    ConfirmPasswordEquilValidatorDirectiveDirective,
    LandingComponent
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
    GridModule,
    LayoutModule,
    TabsModule.forRoot(),
    PDFExportModule,
    ExcelModule,
    DateInputsModule,
    UploadModule,
    InputsModule
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
