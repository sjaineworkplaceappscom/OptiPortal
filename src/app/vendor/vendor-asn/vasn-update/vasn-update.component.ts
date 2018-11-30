import { Component, OnInit, Input, HostListener } from '@angular/core';
import { CurrentSidebarInfo } from '../../../models/sidebar/current-sidebar-info';
import { UIHelper } from '../../../helpers/ui.helpers';
import { ISubscription } from 'rxjs/Subscription';
import { Commonservice } from 'src/app/services/commonservice.service';
import { VendorASNModel } from 'src/app/tempmodels/vendor/vendor-asn-model';
import { DateTimeHelper } from 'src/app/helpers/datetime.helper';
import { VendorService } from 'src/app/services/vendor/vendor.service';
import { ToastService } from 'src/app/helpers/services/toast.service';

@Component({
  selector: 'app-vasn-update',
  templateUrl: './vasn-update.component.html',
  styleUrls: ['./vasn-update.component.scss']
})
export class VasnUpdateComponent implements OnInit {

  @Input() currentSidebarInfo:CurrentSidebarInfo;

  constructor(private commonService: Commonservice, private vendorService: VendorService, private toast:ToastService) {}
  
  showLoader: boolean = false;
  tabName: string = 'home';
  public sideBarsubs: ISubscription;
  public getSub: ISubscription;
  vendorASNModel:VendorASNModel;
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

   // unsubscribe all subscribers.
  ngOnDestroy() {
    if (this.sideBarsubs != undefined) {
      this.sideBarsubs.unsubscribe();
    }
    if (this.getSub != undefined) {
      this.getSub.unsubscribe();
    }
  }

}
