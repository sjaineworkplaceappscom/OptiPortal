import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesQuotationsRoutingModule } from './sales-quotations-routing.module';
import { SalesQuotationsComponent } from './sales-quotations.component';
import { SalesQuotationsListComponent } from './sales-quotations-list/sales-quotations-list.component';
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SalesQuotationsDetailComponent } from './sales-quotations-detail/sales-quotations-detail.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { SalesQuotationsDetailHomeComponent } from './sales-quotations-detail-home/sales-quotations-detail-home.component';
import { SalesQuotationsDetailContentComponent } from './sales-quotations-detail-content/sales-quotations-detail-content.component';
import { SalesQuotationsDetailAttchmentComponent } from './sales-quotations-detail-attchment/sales-quotations-detail-attchment.component';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';

// Please check shashank sir

import { SharedModule } from '../shared/shared.module';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';



export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  imports: [
    CommonModule,
    SalesQuotationsRoutingModule,
    GridModule,
    ExcelModule,
    FormsModule,
    AngularSvgIconModule,
    PerfectScrollbarModule,
    DropDownsModule,
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
  declarations: [SalesQuotationsComponent, SalesQuotationsListComponent, SalesQuotationsDetailComponent, SalesQuotationsDetailHomeComponent, SalesQuotationsDetailContentComponent, SalesQuotationsDetailAttchmentComponent],
  exports:[SalesQuotationsComponent, SalesQuotationsDetailComponent]
})
export class SalesQuotationsModule { }
