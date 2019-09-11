import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerContractsRoutingModule } from './customer-contracts-routing.module';
import { CustomerContractsListComponent } from './customer-contracts-list/customer-contracts-list.component';
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { FileDropModule } from 'ngx-file-drop';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { CustomerContractsAttachmentComponent } from './customer-contracts-attachment/customer-contracts-attachment.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  imports: [
    CommonModule,
    CustomerContractsRoutingModule,
    GridModule,
    ExcelModule,
    FormsModule,
    AngularSvgIconModule,
    PerfectScrollbarModule,
    FileDropModule,
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
  declarations: [CustomerContractsListComponent, CustomerContractsAttachmentComponent],
  exports:[CustomerContractsListComponent, CustomerContractsAttachmentComponent]
})
export class CustomerContractsModule { }
