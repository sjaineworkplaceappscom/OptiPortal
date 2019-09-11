import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VpaymentHomeComponent } from './vpayment-home/vpayment-home.component';
import { VpaymentContentComponent } from './vpayment-content/vpayment-content.component';
import { VpaymentAttachmentComponent } from './vpayment-attachment/vpayment-attachment.component';
import { VpaymentNotesComponent } from './vpayment-notes/vpayment-notes.component';
import { Routes, RouterModule } from '../../../../node_modules/@angular/router';
import { VpaymentListComponent } from './vpayment-list/vpayment-list.component';
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { VpaymentDetailComponent } from './vpayment-detail/vpayment-detail.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

const routes: Routes = [
  { path: '',component:VpaymentListComponent  },
  {path: 'vpaymentlist', component: VpaymentListComponent}
];
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

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
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      },
      isolate: false
    }),
  ],
  declarations: [VpaymentListComponent,VpaymentHomeComponent, VpaymentContentComponent, VpaymentAttachmentComponent, VpaymentNotesComponent, VpaymentDetailComponent],
  exports:[VpaymentListComponent,VpaymentHomeComponent, VpaymentContentComponent, VpaymentAttachmentComponent, VpaymentNotesComponent, VpaymentDetailComponent]
})
export class VendorPaymentModule { }
