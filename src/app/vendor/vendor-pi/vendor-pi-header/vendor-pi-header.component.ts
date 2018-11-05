import { Component, OnInit } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { Commonservice } from '../../../services/commonservice.service';
import { VendorPIModel } from '../../../tempmodels/vendor/vendor-pi-model';
import { VendorService } from '../../../services/vendor/vendor.service';
import { DateTimeHelper } from '../../../helpers/datetime.helper';

@Component({
  selector: 'app-vendor-pi-header',
  templateUrl: './vendor-pi-header.component.html',
  styleUrls: ['./vendor-pi-header.component.scss']
})
export class VendorPiHeaderComponent implements OnInit {

  
  InquiryID = "V0002";
  InquiryDate = "01/07/2018";
  Vendor = "Samsung";
  Status = "Sent To Vendor";
  Buyer = "Shashank Jain";
  ValidUntil = "01/07/2018";
  public sideBarsubs: ISubscription;
  VPIModel: VendorPIModel = new VendorPIModel
  showLoader: boolean = false;
  public getVPIsubs: ISubscription;
  constructor(private commonService: Commonservice, private vendorService:VendorService) { }

  ngOnInit() {
     console.log("vendor pi header init");
    this.sideBarsubs = this.commonService.currentSidebarInfo.subscribe(
      currentSidebarData => {
        
        console.log('vpiu subs');
        if (currentSidebarData != null && currentSidebarData != undefined) {
          this.showLoader = true;
          this.VPIModel = currentSidebarData.RequesterData;
        if(this.VPIModel!=null){
          this.callVendorPurchaseInquiryDetailAPI(this.VPIModel.VendorId+"");
          }else{}
       
        }
      },
      error => {
        this.showLoader = false;
        //alert("Something went wrong");
        console.log("Error: ", error)
      }
  
    );
  }


  
  /** 
    * call api for purchase inquiry detail.
    */
   callVendorPurchaseInquiryDetailAPI(id: string) {
     debugger; 
    // console.log("Update:data from LocalStorage:" + JSON.stringify(localStorage.getItem('SelectedPurchaseInquery')));
     this.showLoader = true;
     this.getVPIsubs = this.vendorService.getVendorDetailById(id).subscribe(
       data => { 
         debugger;
         this.showLoader = false;
         let dataArray: any[] = JSON.parse(data);
         this.VPIModel = dataArray[0];
        // this.purchaseInquiryDetail.ValidTillDate=DateTimeHelper.ParseToUTC(this.purchaseInquiryDetail.ValidTillDate);
        // localStorage.setItem("SelectedPurchaseInquery",JSON.stringify(this.purchaseInquiryDetail));
        //this.setModelAndSubscribeData();
           
       }, error => {  
         this.showLoader = false; 
         //alert("Something went wrong");
         console.log("Error: ", error)
       }, () => { }
     );
   }
}
