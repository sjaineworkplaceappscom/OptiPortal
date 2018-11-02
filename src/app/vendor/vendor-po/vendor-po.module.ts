import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorPoHeaderComponent } from './vendor-po-header/vendor-po-header.component';
import { VendorPoAttchmentsComponent } from './vendor-po-attchments/vendor-po-attchments.component';
import { VendorPoListComponent } from './vendor-po-list/vendor-po-list.component';

import { Routes, RouterModule } from '../../../../node_modules/@angular/router';
import { AuthGuard } from '../../guards/auth.guard';

const routes: Routes = [
  { path: '',redirectTo:'list',pathMatch:'full'  },
  {path: 'list', component: VendorPoListComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ VendorPoHeaderComponent, VendorPoAttchmentsComponent,VendorPoListComponent]
})
export class VendorPoModule { }
