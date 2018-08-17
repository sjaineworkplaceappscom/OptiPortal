import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerPurchaseOrderRoutingModule } from './customer-purchase-order-routing.module';
import { CustomerPurchaseOrderListComponent } from './customer-purchase-order-list/customer-purchase-order-list.component';

@NgModule({
  imports: [
    CommonModule,
    CustomerPurchaseOrderRoutingModule
  ],
  declarations: [CustomerPurchaseOrderListComponent],
  exports:[CustomerPurchaseOrderListComponent]
})
export class CustomerPurchaseOrderModule { }
