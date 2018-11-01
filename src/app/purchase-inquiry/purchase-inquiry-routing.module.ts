import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PurchaseInqListComponent } from './purchase-inq-list/purchase-inq-list.component';
import { PurchaseInqAddComponent } from './purchase-inq-add/purchase-inq-add.component';
import { PurchaseInqUpdateComponent } from './purchase-inq-update/purchase-inq-update.component';


import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '',component:PurchaseInqListComponent,
    children: [      
      { path: 'list', component: PurchaseInqListComponent },
      { path: 'piadd', component: PurchaseInqAddComponent },
      { path: 'piupdate', component: PurchaseInqUpdateComponent } 
      
    ],
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseInquiryRoutingModule { }
