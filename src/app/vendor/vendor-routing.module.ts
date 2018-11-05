import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { VendorDashboardComponent } from './vendor-dashboard/vendor-dashboard.component';
import { VendorPoListComponent } from './vendor-po/vendor-po-list/vendor-po-list.component';
import { VendorPiListComponent } from './vendor-pi/vendor-pi-list/vendor-pi-list.component';
import { VendorPiModule } from './vendor-pi/vendor-pi.module';



const routes: Routes = [
  {
<<<<<<< HEAD
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
=======
    path: '',component:VendorPoListComponent,    
    
    children: [      
      {path: 'vpinquery',loadChildren:"./vendor-pi/vendor-pi.module#VendorPiModule"} ,
      {path: 'vporder',loadChildren:"./vendor-po/vendor-po.module#VendorPoModule"}   
    ],
    canActivate:[AuthGuard]
  }
>>>>>>> 6a8703082937c4476fb6ef9446c65b90d7f5d6b1
];

@NgModule({
  imports: [RouterModule.forChild(routes),VendorPiModule],
  exports: [RouterModule]
})
export class VendorRoutingModule { }
