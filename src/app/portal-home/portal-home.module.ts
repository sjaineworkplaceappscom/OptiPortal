import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortalHomeRoutingModule } from './portal-home-routing.module';
import { PortalHomeComponent } from './portal-home.component';
import { PortalLeftComponent } from './portal-left/portal-left.component';
import { PortalTopComponent } from './portal-top/portal-top.component';
import { PortalRightComponent } from './portal-right/portal-right.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { UploadModule } from '@progress/kendo-angular-upload';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PurchaseInqAddComponent } from '../purchase-inquiry/purchase-inq-add/purchase-inq-add.component';
import { PurchaseInquiryModule } from '../purchase-inquiry/purchase-inquiry.module';
import { PurchaseInqListComponent } from '../purchase-inquiry/purchase-inq-list/purchase-inq-list.component';
import { PurchaseInqUpdateComponent } from '../purchase-inquiry/purchase-inq-update/purchase-inq-update.component';
import { PurchaseInqDetailComponent } from '../purchase-inquiry/purchase-inq-detail/purchase-inq-detail.component';
import { PurchaseInquiryComponent } from '../purchase-inquiry/purchase-inquiry.component';
import { PurchaseInqItemListComponent } from '../purchase-inquiry/purchase-inq-item-list/purchase-inq-item-list.component';
import { SalesQuotationsModule } from '../sales-quotations/sales-quotations.module';
import { ThemeManagerComponent } from '../common/theme-manager/theme-manager.component';


@NgModule({
  imports: [
    CommonModule,
    PortalHomeRoutingModule,

     // Kendo    
     ButtonsModule,
     DropDownsModule,
     GridModule,
     LayoutModule,
     ExcelModule,
     DateInputsModule,
     UploadModule,
     InputsModule,        
 
     // BS
     AngularSvgIconModule, 
     BsDropdownModule.forRoot(),
     ModalModule.forRoot(),
     TooltipModule.forRoot(),
     PerfectScrollbarModule,
     
     // Angular
     HttpClientModule,         
     FormsModule,
     
    PurchaseInquiryModule,
    SalesQuotationsModule
  ],
  declarations: [
    PortalHomeComponent, PortalLeftComponent, PortalTopComponent, PortalRightComponent, DashboardComponent,ThemeManagerComponent
      // attachment
    
  ],
  providers:[]
})
export class PortalHomeModule { }
