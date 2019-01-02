import { Component, OnInit } from '@angular/core';
import { GlobalResource } from '../../../helpers/global-resource';
import { Commonservice } from 'src/app/services/commonservice.service';
import { VendorOIService } from 'src/app/services/vendor/vendor-o-i.service';
import { ToastService } from 'src/app/helpers/services/toast.service';
import { VendorOpenInvoiceStatus } from 'src/app/enums/enums';
import { VendorOIModel } from 'src/app/tempmodels/vendor/vendor-OI-model';
import { ISubscription } from 'rxjs/Subscription';
import { DateTimeHelper } from 'src/app/helpers/datetime.helper';
import { AppMessages } from 'src/app/helpers/app-messages';
import { CurrentSidebarInfo } from 'src/app/models/sidebar/current-sidebar-info';

@Component({
  selector: 'app-vendor-p-invoice-home-update',
  templateUrl: './vendor-p-invoice-home-update.component.html',
  styleUrls: ['./vendor-p-invoice-home-update.component.scss']
})
export class VendorPInvoiceHomeUpdateComponent implements OnInit {

  public ValidTillDate;
  vendorOIModel:VendorOIModel = new VendorOIModel();
  public updateSub:ISubscription;
  public getSub:ISubscription;
  showLoader:boolean=false;
  public minValidDate: Date = new Date();
  public listItems: Array<{text: string,value: number}> = [
    {text:'Open',value:VendorOpenInvoiceStatus.Open},
    {text:'Close',value:VendorOpenInvoiceStatus.Closed}
  ];

  public sideBarsubs: ISubscription;
  constructor(private commonService: Commonservice, private vendorOpenInvoiceService: VendorOIService,private toast:ToastService) { }

  ngOnInit() {
    this.ValidTillDate = new Date();
     
     // Set sidebar data;
     this.sideBarsubs = this.commonService.currentSidebarInfo.subscribe(
      currentSidebarData => {
        
        if (currentSidebarData != null && currentSidebarData != undefined) {
          this.showLoader = true;
          this.vendorOIModel = currentSidebarData.RequesterData;
          if(this.vendorOIModel!=null){
           this.getPInvoiceDetailAPI(this.vendorOIModel.InvoiceId);
          }else{}
        }
      },error => {
        this.showLoader = false;
        //alert("Something went wrong");
        console.log("Error: ", error)
      }
    );
  }

  ngOnDestroy() {
    if (this.sideBarsubs != undefined)
      this.sideBarsubs.unsubscribe();
    if (this.getSub != undefined)
      this.getSub.unsubscribe();
    if (this.updateSub != undefined)
      this.updateSub.unsubscribe();
  }

  UpdateInvoice(){
    
  this.vendorOIModel.InvoiceDate = DateTimeHelper.ParseToUTC(this.vendorOIModel.InvoiceDate);
  this.vendorOIModel.PaymentDueDate = DateTimeHelper.ParseToUTC(this.vendorOIModel.PaymentDueDate);
  this.showLoader=true;
  
  this.updateSub=this.vendorOpenInvoiceService.UdpateOpenInvoice(this.vendorOIModel).subscribe(
    (data: any) => {  
      this.showLoader=false;
      this.toast.showSuccess(AppMessages.PurchaseInqAddedSuccessMsg);
      this.commonService.refreshVOIList(true);
      localStorage.setItem("SelectedVOI",JSON.stringify(data));         
     // this.openUpdateSideBar(data); 
      
    },
    error => {
      //alert("Something went wrong");
      console.log("Error: ", error)
      this.showLoader=false;
    },
    () => {
      this.showLoader=false;
     // this.closeRightSidebar();
    }
  );
  }
  /** 
    * call api for purchase inquiry detail.
    */
   getPInvoiceDetailAPI(id: string) {
    // console.log("Update:data from LocalStorage:" + JSON.stringify(localStorage.getItem('SelectedPurchaseInquery')));
     this.showLoader = true;
     this.getSub = this.vendorOpenInvoiceService.getVendorOIDetail(id).subscribe(
       data => { 
         this.showLoader = false;
         let dataArray: any[] = JSON.parse(data);
         this.vendorOIModel = dataArray[0];
         this.vendorOIModel.InvoiceDate=DateTimeHelper.ParseToUTC(this.vendorOIModel.InvoiceDate);
         this.vendorOIModel.PaymentDueDate=DateTimeHelper.ParseToUTC(this.vendorOIModel.PaymentDueDate);
      //   this.setModelAndSubscribeData();
           
       }, error => {  
         this.showLoader = false; 
         //alert("Something went wrong");
         console.log("Error: ", error)
       }, () => { }
     );
   }
  valueChange(value:any){    
    GlobalResource.dirty=true;
  }

  /** 
* 
* @param status close right content section, will pass false
*/
closeRightSidebar() {
  GlobalResource.dirty=false;
  let currentSidebarInfo: CurrentSidebarInfo = new CurrentSidebarInfo();
  currentSidebarInfo.SideBarStatus = false;
  this.commonService.setCurrentSideBar(currentSidebarInfo);
}

}
