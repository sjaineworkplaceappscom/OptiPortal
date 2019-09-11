import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NotesComponent } from './notes/notes.component';
import { AttachmentComponent } from './attachment/attachment.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { UploadModule } from '@progress/kendo-angular-upload';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NotesItemComponent } from './notes-item/notes-item.component';
import { AttachmentItemComponent } from './attachment-item/attachment-item.component';
//import { AttachmentUploadComponent } from './attachment-upload/attachment-upload.component';
import { CustomFilterPipe } from '../custom-filter.pipe';
import { SalesQuotationsNotesComponent } from './sales-quotations-notes/sales-quotations-notes.component';
import { SalesOrderNotesComponent } from './sales-order-notes/sales-order-notes.component';
import { FileDropModule } from 'ngx-file-drop';
import { SharedComponent } from './shared.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';



export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    SharedRoutingModule,

    
    
    ButtonsModule,
    DropDownsModule,
    GridModule,
    LayoutModule,
    ExcelModule,
    UploadModule,
    InputsModule,
    DateInputsModule,

    // BS
    AngularSvgIconModule, 
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    PerfectScrollbarModule,
    
     // Angular
     HttpClientModule,         
     FormsModule, 
     FileDropModule,
     TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      },
      isolate: false
    }),
  ],
  declarations: [AttachmentComponent,NotesComponent, NotesItemComponent, AttachmentItemComponent, CustomFilterPipe,SalesQuotationsNotesComponent,SalesOrderNotesComponent,CustomFilterPipe,SharedComponent],
  exports:[AttachmentComponent,NotesComponent,NotesItemComponent,AttachmentItemComponent,SalesQuotationsNotesComponent,SalesOrderNotesComponent,CustomFilterPipe],
  providers:[CustomFilterPipe]
})
export class SharedModule { }
