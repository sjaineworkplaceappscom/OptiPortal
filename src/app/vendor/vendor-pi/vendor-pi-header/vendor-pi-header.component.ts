import { Component, OnInit } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { Commonservice } from '../../../services/commonservice.service';
import { VendorPIModel } from '../../../tempmodels/vendor/vendor-pi-model';

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

  constructor(private commonService: Commonservice) { }

  ngOnInit() {

    this.sideBarsubs = this.commonService.currentSidebarInfo.subscribe(
      currentSidebarData => {
        console.log('piu subs');
        
        if (currentSidebarData != null && currentSidebarData != undefined) {
          this.showLoader = true;
          this.VPIModel = currentSidebarData.RequesterData;
          if(this.VPIModel!=null){
          this.callPurchaseInquiryDetailAPI(this.VPIModel.);
          }else{}
       
        }
      },
      error => {
        this.showLoader = false;
        //alert("Something went wrong");
        console.log("Error: ", error)
      }
  }
}
}
