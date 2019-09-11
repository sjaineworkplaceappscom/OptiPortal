import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesOrderRoutingModule } from './sales-order-routing.module';
import { SalesOrderListComponent } from './sales-order-list/sales-order-list.component';
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SalesOrderDetailComponent } from './sales-order-detail/sales-order-detail.component';
import { SalesOrderDetailHomeComponent } from './sales-order-detail-home/sales-order-detail-home.component';
import { SalesOrderDetailContentComponent } from './sales-order-detail-content/sales-order-detail-content.component';
import { SalesOrderDetailAttachmentComponent } from './sales-order-detail-attachment/sales-order-detail-attachment.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';

import { SharedModule } from '../shared/shared.module';
import { SalesOrderDetailDeliveryNotesComponent } from './sales-order-detail-delivery-notes/sales-order-detail-delivery-notes.component';
import { DeliveryNotesModule } from '../delivery-notes/delivery-notes.module';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';



export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  imports: [
    CommonModule,
    SalesOrderRoutingModule,

    GridModule,
    ExcelModule,
    FormsModule,
    AngularSvgIconModule,
    PerfectScrollbarModule,
    DropDownsModule,
    SharedModule,
    DeliveryNotesModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      },
      isolate: false
    }),
  
  ],
  declarations: [SalesOrderListComponent, SalesOrderDetailComponent, SalesOrderDetailHomeComponent, SalesOrderDetailContentComponent, SalesOrderDetailAttachmentComponent, SalesOrderDetailDeliveryNotesComponent],
  exports:[SalesOrderListComponent, SalesOrderDetailComponent]
})
export class SalesOrderModule { }
