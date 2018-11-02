import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorPoHeaderComponent } from './vendor-po-header/vendor-po-header.component';
import { VendorPoAttchmentsComponent } from './vendor-po-attchments/vendor-po-attchments.component';
import { VendorPoListComponent } from './vendor-po-list/vendor-po-list.component';

import { Routes, RouterModule } from '../../../../node_modules/@angular/router';
import { AuthGuard } from '../../guards/auth.guard';
import { VendorPoDetailComponent } from './vendor-po-detail/vendor-po-detail.component';
import { VendorPoContentComponent } from './vendor-po-content/vendor-po-content.component';
import { VendorPoNotesComponent } from './vendor-po-notes/vendor-po-notes.component';
import { GridModule, ExcelModule } from '../../../../node_modules/@progress/kendo-angular-grid';
import { FormsModule } from '../../../../node_modules/@angular/forms';
import { AngularSvgIconModule } from '../../../../node_modules/angular-svg-icon';
import { PerfectScrollbarModule } from '../../../../node_modules/ngx-perfect-scrollbar';
import { DropDownsModule } from '../../../../node_modules/@progress/kendo-angular-dropdowns';

const routes: Routes = [
  { path: '',redirectTo:'list',pathMatch:'full'  },
  {path: 'list', component: VendorPoListComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    GridModule,
    ExcelModule,
    FormsModule,
    AngularSvgIconModule,
    PerfectScrollbarModule,
    DropDownsModule
  ],
  declarations: [ VendorPoHeaderComponent, VendorPoAttchmentsComponent,VendorPoListComponent, VendorPoDetailComponent, VendorPoContentComponent, VendorPoNotesComponent]
})
export class VendorPoModule { }
