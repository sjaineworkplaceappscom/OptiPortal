import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { VendorPiListComponent } from './vendor-pi/vendor-pi-list/vendor-pi-list.component';

const routes: Routes = [
  {
    path: '',component:VendorPiListComponent,    
    children: [      
      {path: 'vpi',loadChildren:"./vendor-pi/vendor-pi.module#VendorPiModule"}
    ],
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorRoutingModule { }
