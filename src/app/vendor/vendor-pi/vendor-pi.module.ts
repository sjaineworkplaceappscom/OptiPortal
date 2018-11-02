import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorPiListComponent } from './vendor-pi-list/vendor-pi-list.component';
import { VendorPiHeaderComponent } from './vendor-pi-header/vendor-pi-header.component';
import { VendorPiAttchmentsComponent } from './vendor-pi-attchments/vendor-pi-attchments.component';
import { VendorPiNotesComponent } from './vendor-pi-notes/vendor-pi-notes.component';
import { AuthGuard } from '../../guards/auth.guard';
import { RouterModule, Routes } from '../../../../node_modules/@angular/router';
import { VendorPiDetailComponent } from './vendor-pi-detail/vendor-pi-detail.component';
import { GridModule, ExcelModule } from '../../../../node_modules/@progress/kendo-angular-grid';
import { AngularSvgIconModule } from '../../../../node_modules/angular-svg-icon';
import { FormsModule } from '../../../../node_modules/@angular/forms';
import { PerfectScrollbarModule } from '../../../../node_modules/ngx-perfect-scrollbar';
import { VendorPiContentComponent } from './vendor-pi-content/vendor-pi-content.component';

const routes: Routes = [
  { path: '',component: VendorPiListComponent,canActivate:[AuthGuard]  },
  {path: 'list', component: VendorPiListComponent,canActivate:[AuthGuard]}
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    GridModule,
    ExcelModule,
    FormsModule,
    AngularSvgIconModule,
    PerfectScrollbarModule
  ],
  exports: [RouterModule,VendorPiListComponent,VendorPiDetailComponent],
  declarations: [VendorPiListComponent, VendorPiHeaderComponent, VendorPiAttchmentsComponent, VendorPiNotesComponent, VendorPiDetailComponent, VendorPiContentComponent]
})
export class VendorPiModule { }
