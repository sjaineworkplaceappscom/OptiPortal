import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { PortalHomeComponent } from './portal-home.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '', component: PortalHomeComponent,
    children: [
      { path: 'purchaseinquiry', loadChildren: '../purchase-inquiry/purchase-inquiry.module#PurchaseInquiryModule' },
      { path: 'shared', loadChildren: '../shared/shared.module#SharedModule' },
      {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalHomeRoutingModule { }
