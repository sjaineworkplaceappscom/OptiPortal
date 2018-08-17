import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeliveryNotesRoutingModule } from './delivery-notes-routing.module';
import { DeliveryNotesListComponent } from './delivery-notes-list/delivery-notes-list.component';
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  imports: [
    CommonModule,
    DeliveryNotesRoutingModule,
    GridModule,
    ExcelModule,
    FormsModule,
    AngularSvgIconModule
  ],
  declarations: [DeliveryNotesListComponent],
  exports:[DeliveryNotesListComponent]
})
export class DeliveryNotesModule { }
