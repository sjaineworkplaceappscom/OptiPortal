import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { PortalHomeComponent } from './portal-home.component';
import { AuthGuard } from '../guards/auth.guard';
import { SalesQuotationsListComponent } from '../sales-quotations/sales-quotations-list/sales-quotations-list.component';
import { SalesOrderListComponent } from '../sales-order/sales-order-list/sales-order-list.component';
import { DeliveryNotesListComponent } from '../delivery-notes/delivery-notes-list/delivery-notes-list.component';
import { CustomerPurchaseOrderListComponent } from '../customer-purchase-order/customer-purchase-order-list/customer-purchase-order-list.component';


const routes: Routes = [
  {
    path: '', component: PortalHomeComponent,
    children: [
      { path: 'purchaseinquiry', loadChildren: '../purchase-inquiry/purchase-inquiry.module#PurchaseInquiryModule' },      
      { path: 'shared', loadChildren: '../shared/shared.module#SharedModule' },
      { path: 'sales', component:SalesQuotationsListComponent },
      { path:'dashboard', component:DashboardComponent },
      { path: 'customerpurchaseorder', component:CustomerPurchaseOrderListComponent },
      { path: 'salesorder', component:SalesOrderListComponent },
      { path: 'deliverynotes', component:DeliveryNotesListComponent }
      

      // { path: 'list', component: PurchaseInqListComponent },
      // { path: 'piadd', component: PurchaseInqAddComponent },
      // { path: 'piupdate', component: PurchaseInqUpdateComponent },
      // { path: 'pidetail', component: PurchaseInqDetailComponent }
      
    ],
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalHomeRoutingModule { }
