import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttachmentComponent } from './attachment/attachment.component';
import { NotesComponent } from './notes/notes.component';
import { AuthGuard } from '../guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    children: [      
      { path: 'attchment', component: AttachmentComponent },
      { path: 'notes', component: NotesComponent },      
    ],
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
