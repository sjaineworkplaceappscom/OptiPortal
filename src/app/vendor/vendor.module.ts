import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorRoutingModule } from 'src/app/vendor/vendor-routing.module';
import { VendorPiModule } from './vendor-pi/vendor-pi.module';


@NgModule({
  imports: [
    CommonModule,
    VendorRoutingModule,
    VendorPiModule
  ],
  declarations: []
})
export class VendorModule { }
