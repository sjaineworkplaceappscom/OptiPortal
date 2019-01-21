import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsignInventoryListComponent } from './consign-inventory-list/consign-inventory-list.component';
import { ConsignInventorySRBatchDetailComponent } from './consign-inventory-sr-batch-detail/consign-inventory-sr-batch-detail.component';
import { ConsignInventoryDetailComponent } from './consign-inventory-detail/consign-inventory-detail.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ConsignInventoryListComponent, ConsignInventorySRBatchDetailComponent, ConsignInventoryDetailComponent],
  exports:[ConsignInventoryListComponent]
})
export class ConsignInventoryModule { }
