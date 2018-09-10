import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerPurchaseOrderRoutingModule } from './customer-purchase-order-routing.module';
import { CustomerPurchaseOrderListComponent } from './customer-purchase-order-list/customer-purchase-order-list.component';
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { FileDropModule } from 'ngx-file-drop';

@NgModule({
  imports: [
    CommonModule,
    CustomerPurchaseOrderRoutingModule,
    GridModule,
    ExcelModule,
    FormsModule,
    AngularSvgIconModule,
    FileDropModule
  ],
  declarations: [CustomerPurchaseOrderListComponent],
  exports:[CustomerPurchaseOrderListComponent]
})
export class CustomerPurchaseOrderModule { }
