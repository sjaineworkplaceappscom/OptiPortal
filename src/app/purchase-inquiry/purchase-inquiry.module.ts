import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseInquiryRoutingModule } from './purchase-inquiry-routing.module';
import { PurchaseInqListComponent } from './purchase-inq-list/purchase-inq-list.component';
import { PurchaseInqAddComponent } from './purchase-inq-add/purchase-inq-add.component';
import { PurchaseInqUpdateComponent } from './purchase-inq-update/purchase-inq-update.component';
import { PurchaseInqDetailComponent } from './purchase-inq-detail/purchase-inq-detail.component';
import { PurchaseInquiryComponent } from './purchase-inquiry.component';

@NgModule({
  imports: [
    CommonModule,
    PurchaseInquiryRoutingModule
  ],
  declarations: [PurchaseInqListComponent,PurchaseInqAddComponent,PurchaseInqUpdateComponent,PurchaseInqDetailComponent,PurchaseInquiryComponent]
})
export class PurchaseInquiryModule { }
