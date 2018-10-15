import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseQuotationRoutingModule } from './purchase-quotation-routing.module';
import { PurchaseQuotationListComponent } from './purchase-quotation-list/purchase-quotation-list.component';

@NgModule({
  imports: [
    CommonModule,
    PurchaseQuotationRoutingModule
  ],
  declarations: [PurchaseQuotationListComponent]
})
export class PurchaseQuotationModule { }
