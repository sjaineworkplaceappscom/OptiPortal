import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NotesComponent } from './notes/notes.component';
import { AttachmentComponent } from './attachment/attachment.component';

@NgModule({
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  declarations: [AttachmentComponent,NotesComponent]
})
export class SharedModule { }
