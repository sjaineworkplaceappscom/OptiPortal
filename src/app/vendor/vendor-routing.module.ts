import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

import { VendorPiDetailComponent } from './vendor-pi/vendor-pi-detail/vendor-pi-detail.component';
import { VendorPiModule } from './vendor-pi/vendor-pi.module';

const routes: Routes = [
  {
    path: '',component:VendorPiDetailComponent,    
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
