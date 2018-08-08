import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { TenantselectionComponent } from './tenantselection/tenantselection.component';
import { FormsModule } from '../../../node_modules/@angular/forms';
import { HttpClientModule } from '../../../node_modules/@angular/common/http';
import { ButtonsModule } from '../../../node_modules/@progress/kendo-angular-buttons';
import { BsDropdownModule } from '../../../node_modules/ngx-bootstrap/dropdown';
import { ModalModule } from '../../../node_modules/ngx-bootstrap/modal';
import { PerfectScrollbarModule } from '../../../node_modules/ngx-perfect-scrollbar';
import { AngularSvgIconModule } from '../../../node_modules/angular-svg-icon';
import { DropDownsModule } from '../../../node_modules/@progress/kendo-angular-dropdowns';

import { TooltipModule } from '../../../node_modules/ngx-bootstrap/tooltip';
import { GridModule, ExcelModule } from '../../../node_modules/@progress/kendo-angular-grid';
import { LayoutModule } from '../../../node_modules/@progress/kendo-angular-layout';
import { DateInputsModule } from '../../../node_modules/@progress/kendo-angular-dateinputs';
import { UploadModule } from '../../../node_modules/@progress/kendo-angular-upload/dist/es2015/main';
import { InputsModule } from '../../../node_modules/@progress/kendo-angular-inputs';


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
   
  ],
  declarations: [AccountComponent, SigninComponent, SignupComponent, SetPasswordComponent, ResetPasswordComponent,TenantselectionComponent ]
})
export class AccountModule { }
