import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorPiListComponent } from './vendor-pi-list/vendor-pi-list.component';
import { VendorPiHeaderComponent } from './vendor-pi-header/vendor-pi-header.component';
import { VendorPiAttchmentsComponent } from './vendor-pi-attchments/vendor-pi-attchments.component';
import { VendorPiNotesComponent } from './vendor-pi-notes/vendor-pi-notes.component';
import { AuthGuard } from '../../guards/auth.guard';
import { RouterModule, Routes } from '../../../../node_modules/@angular/router';
import { VendorPiDetailComponent } from './vendor-pi-detail/vendor-pi-detail.component';

const routes: Routes = [
  {
    path: '',component:VendorPiListComponent,
    children: [      
      { path: 'list', component: VendorPiListComponent }      
    ],
    canActivate:[AuthGuard]
  }
];


@NgModule({
  imports: [CommonModule,RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [VendorPiListComponent, VendorPiHeaderComponent, VendorPiAttchmentsComponent, VendorPiNotesComponent, VendorPiDetailComponent]
})
export class VendorPiModule { }
