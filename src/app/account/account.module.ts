import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { TenantselectionComponent } from './tenantselection/tenantselection.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { UploadModule } from '@progress/kendo-angular-upload/dist/es2015/main';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { ConfirmPasswordEquilValidatorDirectiveDirective } from '../directives/confirm-password-equil-validator-directive.directive';



@NgModule({
  imports: [
    CommonModule,
    AccountRoutingModule,    

    // Kendo    
    ButtonsModule,
    DropDownsModule,
    GridModule,
    LayoutModule,
    ExcelModule,
    DateInputsModule,
    UploadModule,
    InputsModule,        

    // BS
    AngularSvgIconModule, 
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    PerfectScrollbarModule,
    
    // Angular
    HttpClientModule,         
    FormsModule,
    
    //PDFExportModule,
   // Directive
   ConfirmPasswordEquilValidatorDirectiveDirective
  ],
  declarations: [AccountComponent, SigninComponent, SignupComponent, SetPasswordComponent, ResetPasswordComponent,TenantselectionComponent ]
})
export class AccountModule { }
