import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/helpers/services/toast.service';
import { ConfirmDialog } from 'src/app/helpers/services/dialog.service';
import { Commonservice } from 'src/app/services/commonservice.service';
import { VendorOIService } from 'src/app/services/vendor/vendor-o-i.service';
import { ISubscription } from 'rxjs/Subscription';
import { VendorOIModel } from 'src/app/tempmodels/vendor/vendor-OI-model';
import { VOIContentModel } from 'src/app/tempmodels/vendor/vendor-oi-content-model';
import { DateTimeHelper } from 'src/app/helpers/datetime.helper';
import { AppMessages } from 'src/app/helpers/app-messages';
import { CurrentSidebarInfo } from 'src/app/models/sidebar/current-sidebar-info';

@Component({
  selector: 'app-vendor-p-invoice-content-add',
  templateUrl: './vendor-p-invoice-content-add.component.html',
  styleUrls: ['./vendor-p-invoice-content-add.component.scss']
})
export class VendorPInvoiceContentAddComponent implements OnInit {

  constructor(private vendorOIService: VendorOIService, private commonService: Commonservice, private confirmService: ConfirmDialog, private toast: ToastService) { }
  addContentSub: ISubscription;
  showLoader: boolean = false;
  voiContentModel: VOIContentModel;
  public addSub: ISubscription;

  //addItem: boolean = false; 
  //itemGrid: boolean = true;
  vOIModel: VendorOIModel; 

  ngOnInit() {
    this.voiContentModel = new VOIContentModel();
    let selectedVOI: string = localStorage.getItem("SelectedVOI");
    
    if (selectedVOI != null && selectedVOI != undefined) {
      this.vOIModel = JSON.parse(selectedVOI);
      var id = this.vOIModel.InvoiceId;
    }
    this.setDefaultValues();
  }
  
  setDefaultValues(){
    
    this.voiContentModel.InvoiceId = this.vOIModel.InvoiceId;
    this.voiContentModel.BillToAdress = '';
    this.voiContentModel.Item = '';
    this.voiContentModel.LineNumber = '';
    this.voiContentModel.PORefrenceNumber = '';
    this.voiContentModel.BillToAdress = '';
    this.voiContentModel.Quantity = '';
    this.voiContentModel.ShipmentNumber = '';
    this.voiContentModel.TaxCode = '';
    this.voiContentModel.TotalPrice = '';
    this.voiContentModel.UnitPrice = '';
    this.voiContentModel.UOM = '';
    this.voiContentModel.DeliveryDate = new Date();
  }

  AddContent() {
    
    this.voiContentModel.DeliveryDate = DateTimeHelper.ParseToUTC(this.voiContentModel.DeliveryDate);
    this.showLoader = true;
    this.addSub = this.vendorOIService.AddVendorOIContent(this.voiContentModel).subscribe(
      (data: any) => {
        this.showLoader = false;
        this.toast.showSuccess(AppMessages.VendorInvContent);
        //this.commonService.refreshPIList(true);
        localStorage.setItem("SelectedVOIContent", JSON.stringify(data));


      },
      error => {
        //alert("Something went wrong");
        console.log("Error: ", error)
        this.showLoader = false;
      },
      () => {
        this.showLoader = false;
        // this.closeRightSidebar();
      }

    );
  }

  /** 
  * 
  *@param status close right content section, will pass false
  */
  closeRightSidebar() {
    let currentSidebarInfo: CurrentSidebarInfo = new CurrentSidebarInfo();
    currentSidebarInfo.SideBarStatus = false;
    this.commonService.setCurrentSideBar(currentSidebarInfo);
  }


}
