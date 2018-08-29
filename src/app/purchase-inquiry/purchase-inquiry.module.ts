import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { PurchaseInquiryRoutingModule } from './purchase-inquiry-routing.module';
import { PurchaseInqListComponent } from './purchase-inq-list/purchase-inq-list.component';
import { PurchaseInqAddComponent } from './purchase-inq-add/purchase-inq-add.component';
import { PurchaseInqUpdateComponent } from './purchase-inq-update/purchase-inq-update.component';

import { PurchaseInquiryComponent } from './purchase-inquiry.component';
import { PurchaseInqItemListComponent } from './purchase-inq-item-list/purchase-inq-item-list.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { UploadModule } from '@progress/kendo-angular-upload';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { PurchaseInqItemAddComponent } from './purchase-inq-item-add/purchase-inq-item-add.component';
import { SharedModule } from '../shared/shared.module';
import { CustomPipeItemPipe } from '../custom-pipe-item.pipe';
import { ApproveUsersComponent } from 'src/app/account/approve-users/approve-users.component';
// import { CustomFilterPipe } from '../custom-filter.pipe';
// import { CustomPipeItemPipe } from '../custom-pipe-item.pipe';



@NgModule({
  imports: [
    CommonModule,
    PurchaseInquiryRoutingModule,
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

     SharedModule
  ],
  declarations: [
    PurchaseInqListComponent,
    PurchaseInqAddComponent,
    PurchaseInqUpdateComponent,
    
    PurchaseInquiryComponent, 
    
    PurchaseInqItemListComponent, PurchaseInqItemAddComponent,
    CustomPipeItemPipe,
    //Custom Pipes

    ApproveUsersComponent
    ],
    exports:[
      PurchaseInqListComponent,
      PurchaseInqAddComponent,
      PurchaseInqUpdateComponent,      
      PurchaseInquiryComponent, 
      PurchaseInqItemListComponent,
      ApproveUsersComponent],
    providers:[CustomPipeItemPipe]
})
export class PurchaseInquiryModule { }
