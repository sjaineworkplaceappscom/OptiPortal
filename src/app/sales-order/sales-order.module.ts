import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesOrderRoutingModule } from './sales-order-routing.module';
import { SalesOrderListComponent } from './sales-order-list/sales-order-list.component';

@NgModule({
  imports: [
    CommonModule,
    SalesOrderRoutingModule
  ],
  declarations: [SalesOrderListComponent],
  exports:[SalesOrderListComponent]
})
export class SalesOrderModule { }
