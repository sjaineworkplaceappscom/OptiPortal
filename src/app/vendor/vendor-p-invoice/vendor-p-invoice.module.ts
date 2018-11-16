import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorPInvoiceListComponent } from './vendor-p-invoice-list/vendor-p-invoice-list.component';
import { VendorPInvoiceHomeComponent } from './vendor-p-invoice-home/vendor-p-invoice-home.component';
import { VendorPInvoiceContentComponent } from './vendor-p-invoice-content/vendor-p-invoice-content.component';

import { VendorPInvoiceAttachmentComponent } from './vendor-p-invoice-attachment/vendor-p-invoice-attachment.component';
import { VendorPInvoiceNotesComponent } from './vendor-p-invoice-notes/vendor-p-invoice-notes.component';
import { VendorPInvoiceUpdateComponent } from './vendor-p-invoice-update/vendor-p-invoice-update.component';
import { VendorPInvoiceAddComponent } from './vendor-p-invoice-add/vendor-p-invoice-add.component';
import { VendorPInvoiceDetailComponent } from './vendor-p-invoice-detail/vendor-p-invoice-detail.component';
import { RouterModule, Routes } from '../../../../node_modules/@angular/router';
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '',component: VendorPInvoiceListComponent  },
  {path: 'list', component: VendorPInvoiceListComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    GridModule,
    ExcelModule,
    FormsModule,
    AngularSvgIconModule,
    PerfectScrollbarModule,
    DropDownsModule
  ],
  declarations: [ VendorPInvoiceListComponent, VendorPInvoiceHomeComponent, VendorPInvoiceContentComponent,  VendorPInvoiceAttachmentComponent, VendorPInvoiceNotesComponent, VendorPInvoiceUpdateComponent, VendorPInvoiceAddComponent, VendorPInvoiceDetailComponent]
})
export class VendorPInvoiceModule { }
