import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpenInvoicesRoutingModule } from './open-invoices-routing.module';
import { OpenInvoicesListComponent } from './open-invoices-list/open-invoices-list.component';
import { OpenInvoicesDetailComponent } from './open-invoices-detail/open-invoices-detail.component';
import { OpenInvoicesDetailHomeComponent } from './open-invoices-detail-home/open-invoices-detail-home.component';
import { OpenInvoicesDetailContentComponent } from './open-invoices-detail-content/open-invoices-detail-content.component';
import { OpenInvoicesDetailAttachmentComponent } from './open-invoices-detail-attachment/open-invoices-detail-attachment.component';
import { OpenInvoicesDetailNotesComponent } from './open-invoices-detail-notes/open-invoices-detail-notes.component';
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { FileDropModule } from 'ngx-file-drop';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { CustomFilterPipe } from '../custom-filter.pipe';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    OpenInvoicesRoutingModule,
    GridModule,
    ExcelModule,
    FormsModule,
    AngularSvgIconModule,
    PerfectScrollbarModule,
    FileDropModule,
    DropDownsModule,
    SharedModule    

  ],
  declarations: [OpenInvoicesListComponent, OpenInvoicesDetailComponent, OpenInvoicesDetailHomeComponent, OpenInvoicesDetailContentComponent, OpenInvoicesDetailAttachmentComponent, OpenInvoicesDetailNotesComponent],
  exports:[OpenInvoicesListComponent, OpenInvoicesDetailComponent]
})
export class OpenInvoicesModule { }
