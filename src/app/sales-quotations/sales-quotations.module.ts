import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesQuotationsRoutingModule } from './sales-quotations-routing.module';
import { SalesQuotationsComponent } from './sales-quotations.component';
import { SalesQuotationsListComponent } from './sales-quotations-list/sales-quotations-list.component';

@NgModule({
  imports: [
    CommonModule,
    SalesQuotationsRoutingModule
  ],
  declarations: [SalesQuotationsComponent, SalesQuotationsListComponent],
  exports:[SalesQuotationsComponent]
})
export class SalesQuotationsModule { }
