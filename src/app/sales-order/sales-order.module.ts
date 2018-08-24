import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesOrderRoutingModule } from './sales-order-routing.module';
import { SalesOrderListComponent } from './sales-order-list/sales-order-list.component';
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SalesOrderDetailComponent } from './sales-order-detail/sales-order-detail.component';

@NgModule({
  imports: [
    CommonModule,
    SalesOrderRoutingModule,

    GridModule,
    ExcelModule,
    FormsModule,
    AngularSvgIconModule
  ],
  declarations: [SalesOrderListComponent, SalesOrderDetailComponent],
  exports:[SalesOrderListComponent, SalesOrderDetailComponent]
})
export class SalesOrderModule { }
