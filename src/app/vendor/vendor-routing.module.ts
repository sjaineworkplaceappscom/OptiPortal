import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { VendorDashboardComponent } from './vendor-dashboard/vendor-dashboard.component';
import { VendorPoListComponent } from './vendor-po/vendor-po-list/vendor-po-list.component';
import { VendorPiListComponent } from './vendor-pi/vendor-pi-list/vendor-pi-list.component';
import { VendorPiModule } from './vendor-pi/vendor-pi.module';



const routes: Routes = [
  { 
    path: '',component:VendorDashboardComponent,   
  },
  {path: 'dashboard',component:VendorDashboardComponent } ,
  {path: 'vpinquery',loadChildren:"./vendor-pi/vendor-pi.module#VendorPiModule"} ,
  {path: 'vporder',loadChildren:"./vendor-po/vendor-po.module#VendorPoModule"},
  
  {path: 'vasn',loadChildren:"./vendor-asn/vendor-asn.module#VendorAsnModule"} ,  
  {path: 'vcontect',loadChildren:"./vendor-contact/vendor-contact.module#VendorAsnModule"} , 
  {path: 'vpinvoice',loadChildren:"./vendor-p-invoice/vendor-p-invoice.module#VendorPInvoiceModule"} ,  
  {path: 'vpayment',loadChildren:"./vendor-payment/vendor-payment.module#VendorPaymentModule"} 

];

@NgModule({
  imports: [RouterModule.forChild(routes),VendorPiModule],
  exports: [RouterModule]
})
export class VendorRoutingModule { }
