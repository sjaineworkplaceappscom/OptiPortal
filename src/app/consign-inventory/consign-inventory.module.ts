import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsignInventoryListComponent } from './consign-inventory-list/consign-inventory-list.component';
import { ConsignInventorySRBatchDetailComponent } from './consign-inventory-sr-batch-detail/consign-inventory-sr-batch-detail.component';
import { ConsignInventoryDetailComponent } from './consign-inventory-detail/consign-inventory-detail.component';
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { FormsModule } from '@angular/forms';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DeliveryNotesModule } from '../delivery-notes/delivery-notes.module';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  imports: [
    CommonModule,

    GridModule,
    ExcelModule,
    FormsModule,
    AngularSvgIconModule,
    PerfectScrollbarModule,
    DropDownsModule,
    DeliveryNotesModule,
    BsDatepickerModule.forRoot()
  ],
  declarations: [ConsignInventoryListComponent, ConsignInventorySRBatchDetailComponent, ConsignInventoryDetailComponent],
  exports:[ConsignInventoryListComponent,ConsignInventorySRBatchDetailComponent, ConsignInventoryDetailComponent]
})
export class ConsignInventoryModule { }
