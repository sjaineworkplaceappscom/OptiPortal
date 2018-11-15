import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VpaymentHomeComponent } from './vpayment-home/vpayment-home.component';
import { VpaymentContentComponent } from './vpayment-content/vpayment-content.component';
import { VpaymentAttachmentComponent } from './vpayment-attachment/vpayment-attachment.component';
import { VpaymentNotesComponent } from './vpayment-notes/vpayment-notes.component';
import { Routes, RouterModule } from '../../../../node_modules/@angular/router';
import { VpaymentListComponent } from './vpayment-list/vpayment-list.component';

const routes: Routes = [
  { path: '',component:VpaymentListComponent  },
  {path: 'list', component: VpaymentListComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VpaymentListComponent,VpaymentHomeComponent, VpaymentContentComponent, VpaymentAttachmentComponent, VpaymentNotesComponent]
})
export class VendorPaymentModule { }
