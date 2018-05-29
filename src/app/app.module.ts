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
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './guards/intercepters/authIntercepter';
import { RightComponent } from './common/right/right.component';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown'; // Bootstrap Dropdown

@NgModule({
  declarations: [
    AppComponent,
    LeftComponent,    
    TopComponent,
    MainContentComponent,
    RightComponent
  ],
  imports: [
    BrowserModule,
    ButtonsModule,
    BsDropdownModule.forRoot()
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
