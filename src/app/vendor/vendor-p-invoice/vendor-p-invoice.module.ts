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
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { VendorPInvoiceHomeUpdateComponent } from './vendor-p-invoice-home-update/vendor-p-invoice-home-update.component';
import { FileDropModule } from 'ngx-file-drop';
import { VendorPInvoiceContentAddComponent } from './vendor-p-invoice-content-add/vendor-p-invoice-content-add.component';
import { VendorPInvoiceContentUpdateComponent } from './vendor-p-invoice-content-update/vendor-p-invoice-content-update.component';
import { SharedModule } from '../../shared/shared.module';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const routes: Routes = [
  { path: '',component: VendorPInvoiceListComponent  },
  {path: 'vpinvoicelist', component: VendorPInvoiceListComponent}
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
    DropDownsModule,
    DateInputsModule,
    FileDropModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      },
      isolate: false
    }),

  ],
  declarations: [ VendorPInvoiceListComponent, VendorPInvoiceHomeComponent, VendorPInvoiceContentComponent,  VendorPInvoiceAttachmentComponent, VendorPInvoiceNotesComponent, VendorPInvoiceUpdateComponent, VendorPInvoiceAddComponent, VendorPInvoiceDetailComponent, VendorPInvoiceHomeUpdateComponent,  VendorPInvoiceContentAddComponent, VendorPInvoiceContentUpdateComponent],
  exports:[VendorPInvoiceListComponent, VendorPInvoiceHomeComponent, VendorPInvoiceContentComponent,  VendorPInvoiceAttachmentComponent, VendorPInvoiceNotesComponent, VendorPInvoiceUpdateComponent, VendorPInvoiceAddComponent, VendorPInvoiceDetailComponent]
})
export class VendorPInvoiceModule { }
