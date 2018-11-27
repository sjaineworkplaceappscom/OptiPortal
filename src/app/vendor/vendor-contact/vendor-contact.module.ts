import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VcontactListComponent } from './vcontact-list/vcontact-list.component';
import { VcontactAddComponent } from './vcontact-add/vcontact-add.component';
import { VcontactUpdateComponent } from './vcontact-update/vcontact-update.component';
import { Routes, RouterModule } from '../../../../node_modules/@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { GridModule, ExcelModule } from '../../../../node_modules/@progress/kendo-angular-grid';
import { FormsModule } from '../../../../node_modules/@angular/forms';
import { PerfectScrollbarModule } from '../../../../node_modules/ngx-perfect-scrollbar';
import { AngularSvgIconModule } from '../../../../node_modules/angular-svg-icon';
import { DropDownsModule } from '../../../../node_modules/@progress/kendo-angular-dropdowns';

const routes: Routes = [
  { path: '',component: VcontactListComponent  },
  {path: 'vcontectlist', component: VcontactListComponent}
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
    DropDownsModule,
    SharedModule
    
  ],
  declarations: [VcontactListComponent, VcontactAddComponent, VcontactUpdateComponent],
  exports:[VcontactAddComponent,VcontactUpdateComponent]
})
export class VendorContactModule { }
