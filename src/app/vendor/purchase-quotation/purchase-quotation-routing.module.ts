import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PurchaseQuotationListComponent } from './purchase-quotation-list/purchase-quotation-list.component';

const routes: Routes = [
  {path:'', redirectTo:'purchasequotationlist', pathMatch:'full'},
  {path:'purchasequotationlist', component:PurchaseQuotationListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseQuotationRoutingModule { }
