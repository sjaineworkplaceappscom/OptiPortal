import { Component, OnInit } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { Commonservice } from 'src/app/services/commonservice.service';
import { VendorService } from 'src/app/services/vendor/vendor.service';
import { VendorPOModel } from 'src/app/tempmodels/vendor/vendor-po-model';
import { DateTimeHelper } from 'src/app/helpers/datetime.helper';
import { VendorPOHeaderModel } from 'src/app/tempmodels/vendor/vendor-po-header-model';

@Component({
  selector: 'app-vendor-po-header',
  templateUrl: './vendor-po-header.component.html',
  styleUrls: ['./vendor-po-header.component.scss']
})
export class VendorPoHeaderComponent implements OnInit {


  public sideBarsubs: ISubscription;
  public getVPOsubs: ISubscription;
  showLoader: boolean = false;
  VPOModel: VendorPOModel = new VendorPOModel();
  VPOHeaderModel: VendorPOHeaderModel = new VendorPOHeaderModel();

  constructor(private commonService: Commonservice, private vendorService: VendorService) { }

  ngOnInit() {

    this.sideBarsubs = this.commonService.currentSidebarInfo.subscribe(
      currentSidebarData => {
        
        console.log('vpou subs');
        if (currentSidebarData != null && currentSidebarData != undefined) {
          this.showLoader = true;
          this.VPOModel = currentSidebarData.RequesterData;
          if (this.VPOModel != null) {
            this.callVendorPurchaseOrderDetailAPI(this.VPOModel.POId + "");
          } else { }
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
  callVendorPurchaseOrderDetailAPI(id: string) {

    // console.log("Update:data from LocalStorage:" + JSON.stringify(localStorage.getItem('SelectedPurchaseInquery')));
    this.showLoader = true;
    this.getVPOsubs = this.vendorService.getVendorPODetailById(id, 1 + "").subscribe(
      data => {

        this.showLoader = false;
        let dataArray: any[] = JSON.parse(data);
        this.VPOHeaderModel = dataArray[0];
        this.VPOHeaderModel.DueDate = DateTimeHelper.ParseToUTC(this.VPOHeaderModel.DueDate);
        this.VPOHeaderModel.PODate = DateTimeHelper.ParseToUTC(this.VPOHeaderModel.PODate);


      }, error => {
        this.showLoader = false;
        //alert("Something went wrong");
        console.log("Error: ", error)
      }, () => { }
    );
  }

  acknowledge(e) {

  }
  createasn(e) {

  }

  ngOnDestroy() {
    if (this.sideBarsubs != undefined)
      this.sideBarsubs.unsubscribe();
    if (this.getVPOsubs != undefined)
      this.getVPOsubs.unsubscribe();
  }

}
