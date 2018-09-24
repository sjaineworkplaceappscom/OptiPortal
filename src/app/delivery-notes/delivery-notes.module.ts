import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeliveryNotesRoutingModule } from './delivery-notes-routing.module';
import { DeliveryNotesListComponent } from './delivery-notes-list/delivery-notes-list.component';
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { DeliveryNotesDetailComponent } from './delivery-notes-detail/delivery-notes-detail.component';
import { DeliveryNotesDetailHomeComponent } from './delivery-notes-detail-home/delivery-notes-detail-home.component';
import { DeliveryNotesDetailContentComponent } from './delivery-notes-detail-content/delivery-notes-detail-content.component';
import { DeliveryNotesDetailAttachmentComponent } from './delivery-notes-detail-attachment/delivery-notes-detail-attachment.component';
import { DeliveryNotesDetailNotesComponent } from './delivery-notes-detail-notes/delivery-notes-detail-notes.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { FileDropModule } from 'ngx-file-drop';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';

@NgModule({
  imports: [
    CommonModule,
    DeliveryNotesRoutingModule,
    GridModule,
    ExcelModule,
    FormsModule,
    AngularSvgIconModule,
    PerfectScrollbarModule,
    FileDropModule,
    DropDownsModule,
  ],
  declarations: [DeliveryNotesListComponent, DeliveryNotesDetailComponent, DeliveryNotesDetailHomeComponent, DeliveryNotesDetailContentComponent, DeliveryNotesDetailAttachmentComponent, DeliveryNotesDetailNotesComponent],
  exports:[DeliveryNotesListComponent, DeliveryNotesDetailComponent]
})
export class DeliveryNotesModule { }
