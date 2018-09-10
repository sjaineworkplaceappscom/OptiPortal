import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesOrderRoutingModule } from './sales-order-routing.module';
import { SalesOrderListComponent } from './sales-order-list/sales-order-list.component';
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SalesOrderDetailComponent } from './sales-order-detail/sales-order-detail.component';
import { SalesOrderDetailHomeComponent } from './sales-order-detail-home/sales-order-detail-home.component';
import { SalesOrderDetailContentComponent } from './sales-order-detail-content/sales-order-detail-content.component';
import { SalesOrderDetailAttachmentComponent } from './sales-order-detail-attachment/sales-order-detail-attachment.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';

// Please check shashank sir
import { SalesOrderNotesComponent } from '../shared/sales-order-notes/sales-order-notes.component';

@NgModule({
  imports: [
    CommonModule,
    SalesOrderRoutingModule,

    GridModule,
    ExcelModule,
    FormsModule,
    AngularSvgIconModule,
    PerfectScrollbarModule,
    DropDownsModule
  ],
  declarations: [SalesOrderListComponent, SalesOrderDetailComponent, SalesOrderDetailHomeComponent, SalesOrderDetailContentComponent, SalesOrderDetailAttachmentComponent, SalesOrderNotesComponent],
  exports:[SalesOrderListComponent, SalesOrderDetailComponent]
})
export class SalesOrderModule { }
