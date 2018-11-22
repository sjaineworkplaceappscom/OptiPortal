import { Component, OnInit, Input, HostListener } from '@angular/core';
import { CurrentSidebarInfo } from '../../../models/sidebar/current-sidebar-info';
import { UIHelper } from '../../../helpers/ui.helpers';
import { VendorOIService } from 'src/app/services/vendor/vendor-o-i.service';
import { Commonservice } from 'src/app/services/commonservice.service';
import { ConfirmDialog } from 'src/app/helpers/services/dialog.service';
import { ToastService } from 'src/app/helpers/services/toast.service';
import { VendorOIModel } from 'src/app/tempmodels/vendor/vendor-OI-model';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-vendor-p-invoice-add',
  templateUrl: './vendor-p-invoice-add.component.html',
  styleUrls: ['./vendor-p-invoice-add.component.scss']
})
export class VendorPInvoiceAddComponent implements OnInit {

  @Input() currentSidebarInfo:CurrentSidebarInfo;
  constructor(private vendorOIService: VendorOIService, private commonService: Commonservice, private confirmService: ConfirmDialog,private toast:ToastService) { 


  }
  addContentSub: ISubscription;
  showLoader: boolean = false;
  tabName: string = 'home';
  // tab function
  openTab(evt, tabName) {
    this.tabName = tabName;
    UIHelper.customOpenTab(evt, tabName, 'horizontal');
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // apply width on opti_TabID
    UIHelper.getWidthOfOuterTab();
  }

  ngOnInit() {
    // apply width on opti_TabID
    UIHelper.getWidthOfOuterTab();

     //get status of selected inquiry for disabling or enabling  forms
     let selectedVOI: string = localStorage.getItem("SelectedVOI");
    //  this.salesOrderModel = JSON.parse(localStorage.getItem('SelectedSalesOrder'))
    //  let orderNumber: number = this.salesOrderModel.OrderId;

     if (selectedVOI != null && selectedVOI != undefined) {
      let vOIData: VendorOIModel = JSON.parse(selectedVOI);
       var id = vOIData.InvoiceId;
     }
  }
 }
