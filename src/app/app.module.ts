//===============================================================================
// © 2018 Optipro.  All rights reserved.
// Original Author: Shashank Jain
// Original Date: 10 March 2018
//==============================================================================


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
import { AuthGuard } from 'src/app/guards/auth.guard';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
// for svg icon
import { AngularSvgIconModule } from 'angular-svg-icon';

// It's for dropdown module
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { GridModule, ExcelModule  } from '@progress/kendo-angular-grid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { ConfirmPasswordEquilValidatorDirectiveDirective } from './directives/confirm-password-equil-validator-directive.directive';
import { LandingComponent } from './common/landing/landing.component'
import { LayoutModule } from '@progress/kendo-angular-layout'
import { PDFExportModule } from '@progress/kendo-angular-pdf-export'
import { DateInputsModule } from '@progress/kendo-angular-dateinputs'
import { UploadModule } from '@progress/kendo-angular-upload'

import { InputsModule } from '@progress/kendo-angular-inputs';

 

import { CommonModule, DatePipe } from '@angular/common';
import { PortalHomeModule } from './portal-home/portal-home.module';
import { PurchaseInquiryModule } from './purchase-inquiry/purchase-inquiry.module';


// for new Routing for Lazy load
const routes: Routes = [
  { path: '', redirectTo:'home',pathMatch: 'full'},
  { path:'landing',component:LandingComponent},  
  { path: 'account', loadChildren: "./account/account.module#AccountModule" },
  { path: 'home', loadChildren: "./portal-home/portal-home.module#PortalHomeModule" },
  { path: '**', component: LandingComponent}
 ];

//  const routes: Routes = [
//   { path: '', redirectTo: 'landing',pathMatch: 'full' },
//   {path:'landing',component:LandingComponent}, 
//   { path: 'account', loadChildren: "./account/account.module#AccountModule" },
//   { path: 'home', component: HomeComponent},

//   {path: '**', component: LandingComponent}
//   ];


@NgModule({
  declarations: [
    
    AppComponent,
    LandingComponent,

    // Custom Pipes
    
    

    //Home Components(Need to be delete)
    LeftComponent,    
    TopComponent,
    MainContentComponent,
    RightComponent,
    HomeComponent,

    // Directive
    ConfirmPasswordEquilValidatorDirectiveDirective,        
  ],
  imports: [
    CommonModule, 
    FormsModule,
    
    HttpClientModule,
    ButtonsModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    PerfectScrollbarModule,
    RouterModule.forRoot(routes,{preloadingStrategy: PreloadAllModules}),
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
    InputsModule,

    PortalHomeModule,
    PurchaseInquiryModule

  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
  
  DatePipe
],
  bootstrap: [AppComponent]
})
export class AppModule { }
