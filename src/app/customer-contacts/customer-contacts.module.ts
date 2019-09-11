import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerContactsRoutingModule } from './customer-contacts-routing.module';
import { CustomerContactsListComponent } from './customer-contacts-list/customer-contacts-list.component';
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { FileDropModule } from 'ngx-file-drop';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { CustomerContactsComponent } from './customer-contacts.component';
import { CustomerContactsAddComponent } from './customer-contacts-add/customer-contacts-add.component';
import { CustomerContactsUpdateComponent } from './customer-contacts-update/customer-contacts-update.component';
import { SharedComponent } from '../shared/shared.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  imports: [
    CommonModule,
    CustomerContactsRoutingModule,
    GridModule,
    ExcelModule,
    FormsModule,
    AngularSvgIconModule,
    PerfectScrollbarModule,
    FileDropModule,
    DropDownsModule,
    SharedModule,
    
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      },
      isolate: false
    }),

  ],
  declarations: [CustomerContactsListComponent, CustomerContactsComponent, CustomerContactsAddComponent, CustomerContactsUpdateComponent],
  exports:[CustomerContactsListComponent, CustomerContactsComponent, CustomerContactsAddComponent, CustomerContactsUpdateComponent]
})
export class CustomerContactsModule { }
