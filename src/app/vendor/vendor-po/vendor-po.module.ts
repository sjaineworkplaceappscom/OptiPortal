import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorPoHeaderComponent } from './vendor-po-header/vendor-po-header.component';
import { VendorPoAttchmentsComponent } from './vendor-po-attchments/vendor-po-attchments.component';
import { VendorPiHeaderComponent } from '../vendor-pi/vendor-pi-header/vendor-pi-header.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [VendorPiHeaderComponent, VendorPoHeaderComponent, VendorPoAttchmentsComponent]
})
export class VendorPoModule { }
