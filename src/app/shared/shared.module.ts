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
import { HttpClientModule } from '@angular/common/http';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

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
  ],
  declarations: [AttachmentComponent,NotesComponent],
  exports:[AttachmentComponent,NotesComponent]
})
export class SharedModule { }