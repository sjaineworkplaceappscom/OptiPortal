import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VcontactListComponent } from './vcontact-list/vcontact-list.component';
import { VcontactAddComponent } from './vcontact-add/vcontact-add.component';
import { VcontactUpdateComponent } from './vcontact-update/vcontact-update.component';
import { Routes, RouterModule } from '../../../../node_modules/@angular/router';

const routes: Routes = [
  { path: '',component: VcontactListComponent  },
  {path: 'list', component: VcontactListComponent}
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VcontactListComponent, VcontactAddComponent, VcontactUpdateComponent]
})
export class VendorContactModule { }
