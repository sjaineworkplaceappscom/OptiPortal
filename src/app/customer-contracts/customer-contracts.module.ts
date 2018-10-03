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
    DropDownsModule
  ],
  declarations: [CustomerContractsListComponent]
})
export class CustomerContractsModule { }
