import { Component, OnInit } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { Commonservice } from '../../../services/commonservice.service';

import { VendorService } from '../../../services/vendor/vendor.service';
import { DateTimeHelper } from '../../../helpers/datetime.helper';

import { VendorPurchaseInquiryModel } from 'src/app/tempmodels/vendor/vendor-purchase-inquiry-model';

@Component({
  selector: 'app-vendor-pi-header',
  templateUrl: './vendor-pi-header.component.html',
  styleUrls: ['./vendor-pi-header.component.scss']
})
export class VendorPiHeaderComponent implements OnInit {

  
  // InquiryID = "V0002";
  // InquiryDate = "01/07/2018";
  // Vendor = "Samsung";
  // Status = "Sent To Vendor";
  // Buyer = "Shashank Jain";
  // ValidUntil = "01/07/2018";
  public sideBarsubs: ISubscription;
  public getVPIsubs: ISubscription;
  VPIModel: VendorPurchaseInquiryModel = new VendorPurchaseInquiryModel();
  showLoader: boolean = false;
  
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
          this.callVendorPurchaseInquiryDetailAPI(this.VPIModel.InquiryId+"");
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
     
    // console.log("Update:data from LocalStorage:" + JSON.stringify(localStorage.getItem('SelectedPurchaseInquery')));
     this.showLoader = true;
     this.getVPIsubs = this.vendorService.getVendorDetailById(id,1+"").subscribe(
       data => { 
         
         this.showLoader = false;
         let dataArray: any[] = JSON.parse(data);
         this.VPIModel = dataArray[0];
         this.VPIModel.ValidUntil = DateTimeHelper.ParseToUTC(this.VPIModel.ValidUntil);
         this.VPIModel.InquiryDate = DateTimeHelper.ParseToUTC(this.VPIModel.InquiryDate);
    
           
       }, error => {  
         this.showLoader = false; 
         //alert("Something went wrong");
         console.log("Error: ", error)
       }, () => { }
     );
   }

   ngOnDestroy() {
    if (this.sideBarsubs != undefined)
      this.sideBarsubs.unsubscribe();
    if (this.getVPIsubs != undefined)
      this.getVPIsubs.unsubscribe();
  }

}
