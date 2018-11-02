import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { VendorDashboardComponent } from './vendor-dashboard/vendor-dashboard.component';



const routes: Routes = [
  {
    path: '',component:VendorDashboardComponent,    
    children: [      
      {path: 'vpinquery',loadChildren:"./vendor-pi/vendor-pi.module#VendorPiModule"} ,
      {path: 'vporder',loadChildren:"./vendor-po/vendor-po.module#VendorPoModule"}   
    ],
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorRoutingModule { }
