import { Component, OnInit } from '@angular/core';
import { Commonservice } from 'src/app/services/commonservice.service';
import { ToastService } from 'src/app/helpers/services/toast.service';
import { ISubscription } from 'rxjs/Subscription';
import { VendorASNModel } from 'src/app/tempmodels/vendor/vendor-asn-model';
import { DateTimeHelper } from 'src/app/helpers/datetime.helper';
import { VendorService } from 'src/app/services/vendor/vendor.service';

@Component({
  selector: 'app-vasn-home',
  templateUrl: './vasn-home.component.html',
  styleUrls: ['./vasn-home.component.scss']
})
export class VasnHomeComponent implements OnInit {

  ASN;
  PORef;
  Vendor; 
  ShipmentDate;
  DeliveryDate; 
  WayBill1; 
  Tracking;
  Price; 
  Tax; 
  Freight;
  Discount; 
  TotalPrice;

  public sideBarsubs:ISubscription;
  showLoader:boolean=false;

  
  public getSub: ISubscription;
  vendorASNModel:VendorASNModel;
  constructor(private commonService: Commonservice, private toast:ToastService,private vendorService:VendorService ) { }

  ngOnInit() {
    console.log('vasn update');
    // Set sidebar data;
    this.sideBarsubs = this.commonService.currentSidebarInfo.subscribe(
     currentSidebarData => {
       debugger;
       if (currentSidebarData != null && currentSidebarData != undefined) {
         this.showLoader = true;
         this.vendorASNModel = currentSidebarData.RequesterData;
         if(this.vendorASNModel!=null){
          this.getASNDetailAPI(this.vendorASNModel.ASNId);
         }else{}
       }
     },error => {
       this.showLoader = false;
       //alert("Something went wrong");
       console.log("Error: ", error)
     }
   );
  }

  valueShipmentChange(e){

  }

  valueDeliveryChange(e){

  }

  UpdateASN(status){

  }

  closeRightSidebar(status){
    
  }

   /** 
    * call api for purchase inquiry detail.
    */
   getASNDetailAPI(id: string) {
    debugger;
    this.showLoader = true;
    this.getSub = this.vendorService.getVendorASNDetail(id).subscribe(
      data => { 
        this.showLoader = false;
        let dataArray: any[] = JSON.parse(data);
        this.vendorASNModel = dataArray[0];
        this.vendorASNModel.DeliveryDate=DateTimeHelper.ParseToUTC(this.vendorASNModel.DeliveryDate);
        this.vendorASNModel.ShipmentDate=DateTimeHelper.ParseToUTC(this.vendorASNModel.ShipmentDate);
      }, error => {  
        this.showLoader = false; 
        //alert("Something went wrong");
        console.log("Error: ", error)
      }, () => { }
    );
  }


}
