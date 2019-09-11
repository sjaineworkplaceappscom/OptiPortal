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
import { HttpClientModule, HttpClient } from '@angular/common/http';
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
import { InputsModule } from '@progress/kendo-angular-inputs';
import { ConfirmPasswordEquilValidatorDirectiveDirective } from '../directives/confirm-password-equil-validator-directive.directive';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
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
  
    InputsModule, 
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      },
      isolate: false
    }),       

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
   
  ],
  declarations: [AccountComponent, SigninComponent, SignupComponent, SetPasswordComponent, ResetPasswordComponent,TenantselectionComponent ,ConfirmPasswordEquilValidatorDirectiveDirective]
})
export class AccountModule { }
