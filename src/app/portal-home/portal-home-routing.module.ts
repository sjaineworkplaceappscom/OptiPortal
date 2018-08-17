import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { PortalHomeComponent } from './portal-home.component';
import { AuthGuard } from '../guards/auth.guard';
import { PurchaseInqListComponent } from '../purchase-inquiry/purchase-inq-list/purchase-inq-list.component';
import { PurchaseInqUpdateComponent } from '../purchase-inquiry/purchase-inq-update/purchase-inq-update.component';
import { PurchaseInqDetailComponent } from '../purchase-inquiry/purchase-inq-detail/purchase-inq-detail.component';
import { PurchaseInqAddComponent } from '../purchase-inquiry/purchase-inq-add/purchase-inq-add.component';
import { SalesQuotationsComponent } from '../sales-quotations/sales-quotations.component';
import { SalesQuotationsListComponent } from '../sales-quotations/sales-quotations-list/sales-quotations-list.component';
import { ApproveUsersComponent } from '../account/approve-users/approve-users.component';

const routes: Routes = [
  {
    path: '', component: PortalHomeComponent,
    children: [
      { path: 'purchaseinquiry', loadChildren: '../purchase-inquiry/purchase-inquiry.module#PurchaseInquiryModule' },
      
      { path: 'shared', loadChildren: '../shared/shared.module#SharedModule' },
      { path: 'sales', component:SalesQuotationsListComponent },
      {path:'dashboard',component:DashboardComponent},
      

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
