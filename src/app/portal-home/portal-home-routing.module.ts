import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { PortalHomeComponent } from './portal-home.component';
import { AuthGuard } from '../guards/auth.guard';
import { SalesQuotationsListComponent } from '../sales-quotations/sales-quotations-list/sales-quotations-list.component';
import { SalesOrderListComponent } from '../sales-order/sales-order-list/sales-order-list.component';
import { DeliveryNotesListComponent } from '../delivery-notes/delivery-notes-list/delivery-notes-list.component';
import { AdvanceShipmentNotesListComponent } from '../delivery-notes/advance-shipment-notes-list/advance-shipment-notes-list.component';
import { CustomerPurchaseOrderListComponent } from '../customer-purchase-order/customer-purchase-order-list/customer-purchase-order-list.component';
import { OpenInvoicesListComponent } from '../open-invoices/open-invoices-list/open-invoices-list.component';
import { CustomerContactsListComponent } from '../customer-contacts/customer-contacts-list/customer-contacts-list.component';
import { CustomerContractsListComponent } from '../customer-contracts/customer-contracts-list/customer-contracts-list.component';
import { VendorModule } from '../vendor/vendor.module';
import { ConsignInventoryListComponent } from '../consign-inventory/consign-inventory-list/consign-inventory-list.component';


const routes: Routes = [
  {
    path: '', component: PortalHomeComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'purchaseinquiry', loadChildren: '../purchase-inquiry/purchase-inquiry.module#PurchaseInquiryModule' },      
      
      { path: 'shared', loadChildren: '../shared/shared.module#SharedModule' },
      { path: 'sales', component:SalesQuotationsListComponent },
      { path:'dashboard', component:DashboardComponent },
      { path: 'customerpurchaseorder', component:CustomerPurchaseOrderListComponent },
      { path: 'salesorder', component:SalesOrderListComponent },
      { path: 'deliverynotes', component:DeliveryNotesListComponent },
      { path: 'advanceshipmentnotes', component:AdvanceShipmentNotesListComponent },
      { path: 'openinvoices', component:OpenInvoicesListComponent },
      { path: 'customercontacts', component:CustomerContactsListComponent },
      { path: 'customercontracts', component:CustomerContractsListComponent },
      { path: 'vendor', loadChildren: '../vendor/vendor.module#VendorModule' },     
      { path: 'consigninventory', component:ConsignInventoryListComponent },       

      

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
export class PortalHomeRoutingModule { 
  
}
