import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { VendorDashboardComponent } from './vendor-dashboard/vendor-dashboard.component';
import { VendorPoListComponent } from './vendor-po/vendor-po-list/vendor-po-list.component';
import { VendorPiListComponent } from './vendor-pi/vendor-pi-list/vendor-pi-list.component';
import { VendorPiModule } from './vendor-pi/vendor-pi.module';



const routes: Routes = [
  {
    path: '',component:VendorDashboardComponent  ,
    //  children: [      
    //    {path: 'vpinquery',component: VendorPiListComponent},//,loadChildren:"./vendor-pi/vendor-pi.module#VendorPiModule"} ,
    //    {path: 'vporder',component: VendorPoListComponent}//,loadChildren:"./vendor-po/vendor-po.module#VendorPoModule"}   
    //  ],
    //  canActivate:[AuthGuard]
  },
  {path: 'dashboard',component:VendorDashboardComponent } ,
  {path: 'vpinquery',loadChildren:"./vendor-pi/vendor-pi.module#VendorPiModule"} ,
  {path: 'vporder',loadChildren:"./vendor-po/vendor-po.module#VendorPoModule"}   
];

@NgModule({
  imports: [RouterModule.forChild(routes),VendorPiModule],
  exports: [RouterModule]
})
export class VendorRoutingModule { }
