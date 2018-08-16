import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesQuotationsRoutingModule } from './sales-quotations-routing.module';
import { SalesQuotationsComponent } from './sales-quotations.component';
import { SalesQuotationsListComponent } from './sales-quotations-list/sales-quotations-list.component';
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  imports: [
    CommonModule,
    SalesQuotationsRoutingModule,
    GridModule,
    ExcelModule,
    FormsModule,
    AngularSvgIconModule
  ],
  declarations: [SalesQuotationsComponent, SalesQuotationsListComponent],
  exports:[SalesQuotationsComponent]
})
export class SalesQuotationsModule { }
