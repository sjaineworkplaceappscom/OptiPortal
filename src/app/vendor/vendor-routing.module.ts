import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VendorDashboardComponent } from './vendor-dashboard/vendor-dashboard.component';
import { VendorPiModule } from './vendor-pi/vendor-pi.module';
import { VendorOIModel } from '../tempmodels/vendor/vendor-OI-model';
import { VendorPInvoiceModule } from 'src/app/vendor/vendor-p-invoice/vendor-p-invoice.module';
import { ConsignInventoryListComponent } from '../consign-inventory/consign-inventory-list/consign-inventory-list.component';
import { ConsignInventoryModule } from '../consign-inventory/consign-inventory.module';



const routes: Routes = [
  { 
    path: '',component:VendorDashboardComponent,   
  },
  {path: 'dashboard',component:VendorDashboardComponent } ,
  {path: 'vpinquery',loadChildren:"./vendor-pi/vendor-pi.module#VendorPiModule"} ,
  {path: 'vporder',loadChildren:"./vendor-po/vendor-po.module#VendorPoModule"},  
  {path: 'vasn',loadChildren:"./vendor-asn/vendor-asn.module#VendorAsnModule"} ,  
  {path: 'vcontect',loadChildren:"./vendor-contact/vendor-contact.module#VendorContactModule"} , 
  {path: 'vpinvoice',loadChildren:"src/app/vendor/vendor-p-invoice/vendor-p-invoice.module#VendorPInvoiceModule"} ,  
  {path: 'vpayment',loadChildren:"./vendor-payment/vendor-payment.module#VendorPaymentModule"} ,
  { path: 'consigninventory', component:ConsignInventoryListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes),VendorPiModule,VendorPInvoiceModule,ConsignInventoryModule],
  exports: [RouterModule]
})
export class VendorRoutingModule { }
