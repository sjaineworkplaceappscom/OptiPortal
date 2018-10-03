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
    DropDownsModule
  ],
  declarations: [CustomerContactsListComponent, CustomerContactsComponent, CustomerContactsAddComponent, CustomerContactsUpdateComponent],
  exports:[CustomerContactsListComponent, CustomerContactsComponent, CustomerContactsAddComponent, CustomerContactsUpdateComponent]
})
export class CustomerContactsModule { }
