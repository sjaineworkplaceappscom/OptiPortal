import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerPurchaseOrderRoutingModule } from './customer-purchase-order-routing.module';
import { CustomerPurchaseOrderListComponent } from './customer-purchase-order-list/customer-purchase-order-list.component';
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { FileDropModule } from 'ngx-file-drop';
import { CustomerPurchaseOrderHomeComponent } from './customer-purchase-order-home/customer-purchase-order-home.component';
import { CustomerPurchaseOrderNotesComponent } from './customer-purchase-order-notes/customer-purchase-order-notes.component';
import { CustomerPurchaseOrderAttachmentComponent } from './customer-purchase-order-attachment/customer-purchase-order-attachment.component';
import { CustomerPurchaseOrderUpdateComponent } from './customer-purchase-order-update/customer-purchase-order-update.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';


@NgModule({
  imports: [
    CommonModule,
    CustomerPurchaseOrderRoutingModule,
    GridModule,
    ExcelModule,
    FormsModule,
    AngularSvgIconModule,
    FileDropModule,
    PerfectScrollbarModule,
    DropDownsModule,
    DateInputsModule
  ],
  declarations: [CustomerPurchaseOrderListComponent, CustomerPurchaseOrderHomeComponent, CustomerPurchaseOrderNotesComponent, CustomerPurchaseOrderAttachmentComponent, CustomerPurchaseOrderUpdateComponent],
  exports:[CustomerPurchaseOrderListComponent, CustomerPurchaseOrderUpdateComponent]
})
export class CustomerPurchaseOrderModule { }
