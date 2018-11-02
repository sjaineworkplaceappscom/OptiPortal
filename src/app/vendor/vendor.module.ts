import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorRoutingModule } from 'src/app/vendor/vendor-routing.module';
import { VendorPiModule } from './vendor-pi/vendor-pi.module';
import { VendorContactModule } from './vendor-contact/vendor-contact.module';
import { VendorAsnModule } from './vendor-asn/vendor-asn.module';
import { VendorPInvoiceModule } from './vendor-p-invoice/vendor-p-invoice.module';
import { VendorPoModule } from './vendor-po/vendor-po.module';
import { VendorDashboardComponent } from './vendor-dashboard/vendor-dashboard.component';


@NgModule({
  imports: [
    CommonModule,
    VendorRoutingModule,
    VendorPiModule,
    VendorContactModule,
    VendorAsnModule,
    VendorPInvoiceModule,
    VendorPoModule
  ],
  declarations: [VendorDashboardComponent],
  exports:[VendorPiModule]
})
export class VendorModule { }
