import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerPurchaseOrderRoutingModule } from './customer-purchase-order-routing.module';
import { CustomerPurchaseOrderListComponent } from './customer-purchase-order-list/customer-purchase-order-list.component';
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { FileDropModule } from 'ngx-file-drop';
import { CustomerPurchaseOrderHomeComponent } from './customer-purchase-order-home/customer-purchase-order-home.component';
import { CustomerPurchaseOrderNotesComponent } from './customer-purchase-order-notes/customer-purchase-order-notes.component';
import { CustomerPurchaseOrderAttachmentComponent } from './customer-purchase-order-attachment/customer-purchase-order-attachment.component';
import { CustomerPurchaseOrderUpdateComponent } from './customer-purchase-order-update/customer-purchase-order-update.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { CustomerPurchaseOrderAddComponent } from './customer-purchase-order-add/customer-purchase-order-add.component';
import { CustomerPurchaseOrderHomeAddComponent } from './customer-purchase-order-home-add/customer-purchase-order-home-add.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  imports: [
    CommonModule,
    CustomerPurchaseOrderRoutingModule,
    GridModule,
    ExcelModule,
    FormsModule,
    AngularSvgIconModule,
    FileDropModule,
    PerfectScrollbarModule,
    DropDownsModule,
    DateInputsModule,
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
  declarations: [CustomerPurchaseOrderListComponent, CustomerPurchaseOrderHomeComponent, CustomerPurchaseOrderNotesComponent, CustomerPurchaseOrderAttachmentComponent, CustomerPurchaseOrderUpdateComponent, CustomerPurchaseOrderAddComponent, CustomerPurchaseOrderHomeAddComponent],
  exports:[CustomerPurchaseOrderListComponent, CustomerPurchaseOrderUpdateComponent, CustomerPurchaseOrderAddComponent]
})
export class CustomerPurchaseOrderModule { }
