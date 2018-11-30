import { Component, OnInit } from '@angular/core';
import { Commonservice } from 'src/app/services/commonservice.service';
import { ToastService } from 'src/app/helpers/services/toast.service';
import { ISubscription } from 'rxjs/Subscription';
import { VendorASNModel } from 'src/app/tempmodels/vendor/vendor-asn-model';
import { DateTimeHelper } from 'src/app/helpers/datetime.helper';
import { VendorService } from 'src/app/services/vendor/vendor.service';
import { AppMessages } from 'src/app/helpers/app-messages';

@Component({
  selector: 'app-vasn-home',
  templateUrl: './vasn-home.component.html',
  styleUrls: ['./vasn-home.component.scss']
})
export class VasnHomeComponent implements OnInit {

 
  public sideBarsubs:ISubscription;
  public updateSubs:ISubscription;


  showLoader:boolean=false;
  public minValidDate: Date = new Date();
  public getSub: ISubscription;
  vendorASNModel:VendorASNModel;
  constructor(private commonService: Commonservice, private toast:ToastService,private vendorService:VendorService ) { }

  ngOnInit() {
    
    // Set sidebar data;
    this.sideBarsubs = this.commonService.currentSidebarInfo.subscribe(
     currentSidebarData => {
       
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

 

  closeRightSidebar(){
    
  }

   /** 
    * call api for purchase inquiry detail.
    */
   getASNDetailAPI(id: string) {
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

  
  public UpdateASN() {
     
    this.showLoader=true;  
    this.updateSubs=this.vendorService.UpdateVASN(this.vendorASNModel).subscribe(
      (data: any) => {  
        this.showLoader=false;
        this.toast.showSuccess(AppMessages.VendorInvASNUpdate);
        this.commonService.refreshVASNList(true);
        localStorage.setItem("SelectedVASN",JSON.stringify(data));         
    },
      error => {
        console.log("Error: ", error)
        this.showLoader=false;
      },
      () => {
        this.showLoader=false;
      }
    );
  }


  // unsubscribe all subscribers.
  ngOnDestroy() {
    if (this.getSub != undefined){
      this.getSub.unsubscribe();
    }
    if (this.sideBarsubs != undefined){
      this.sideBarsubs.unsubscribe();
    }
    if (this.updateSubs != undefined){
      this.updateSubs.unsubscribe();
    }
  }

  

}
