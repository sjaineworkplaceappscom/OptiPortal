import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:'',redirectTo:'purchasequotation', pathMatch:'full'},
  {path:'purchasequotation', loadChildren:'./purchase-quotation/purchase-quotation.module#PurchaseQuotationModule'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorRoutingModule { }
