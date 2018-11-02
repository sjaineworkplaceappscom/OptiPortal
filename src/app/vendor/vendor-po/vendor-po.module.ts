import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorPoHeaderComponent } from './vendor-po-header/vendor-po-header.component';
import { VendorPoAttchmentsComponent } from './vendor-po-attchments/vendor-po-attchments.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ VendorPoHeaderComponent, VendorPoAttchmentsComponent]
})
export class VendorPoModule { }
