import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeliveryNotesRoutingModule } from './delivery-notes-routing.module';
import { DeliveryNotesListComponent } from './delivery-notes-list/delivery-notes-list.component';

@NgModule({
  imports: [
    CommonModule,
    DeliveryNotesRoutingModule
  ],
  declarations: [DeliveryNotesListComponent],
  exports:[DeliveryNotesListComponent]
})
export class DeliveryNotesModule { }
