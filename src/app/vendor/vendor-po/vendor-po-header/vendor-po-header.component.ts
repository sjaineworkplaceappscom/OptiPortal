import { Component, OnInit } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { Commonservice } from 'src/app/services/commonservice.service';
import { VendorService } from 'src/app/services/vendor/vendor.service';
import { VendorPOModel } from 'src/app/tempmodels/vendor/vendor-po-model';
import { DateTimeHelper } from 'src/app/helpers/datetime.helper';
import { VendorPOHeaderModel } from 'src/app/tempmodels/vendor/vendor-po-header-model';
import { AppMessages } from '../../../helpers/app-messages';
import { ToastService } from '../../../helpers/services/toast.service';
import { CurrentSidebarInfo } from '../../../models/sidebar/current-sidebar-info';
import { ComponentName, ModuleName } from '../../../enums/enums';
import { Router } from '../../../../../node_modules/@angular/router';
import * as $ from "jquery";
@Component({
  selector: 'app-vendor-po-header',
  templateUrl: './vendor-po-header.component.html',
  styleUrls: ['./vendor-po-header.component.scss']
})
export class VendorPoHeaderComponent implements OnInit {


  public sideBarsubs: ISubscription;
  public getVPOsubs: ISubscription;
  public sendVPOack: ISubscription;
  showLoader: boolean = false;
  VPOModel: VendorPOModel = new VendorPOModel();
  VPOHeaderModel: VendorPOHeaderModel = new VendorPOHeaderModel();
  IsAck: boolean = false;

  constructor(private commonService: Commonservice, private vendorService: VendorService, private toast: ToastService, private router: Router) { }

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

  acknowledge() {
    debugger;
    this.showLoader = true;
    this.sendVPOack = this.vendorService.SendAck(this.VPOHeaderModel.POId).subscribe(
      data => {
        this.showLoader = false;
        if (data == true) {
          this.toast.showSuccess(AppMessages.VendorPOAck);
          this.IsAck = true;
        }
      }
    )

  }
  createasn(e) {
    this.showLoader = true;
    // $('#VASN').click();


    let currentsideBarInfo: CurrentSidebarInfo = new CurrentSidebarInfo();
    currentsideBarInfo.ComponentName = ComponentName.VendorASNAdd;
    currentsideBarInfo.ModuleName = ModuleName.VendorASN;
    currentsideBarInfo.SideBarStatus = true;
    currentsideBarInfo.RequesterData = this.VPOModel;
    this.commonService.setCurrentSideBar(currentsideBarInfo);

    $('#opti_vpoID').removeClass('active'); 
    this.router.navigate(['home/vendor/vasnlist']);
    this.showLoader = false;
    // $('#vasn').addClass('active');
  }

  ngOnDestroy() {
    if (this.sideBarsubs != undefined)
      this.sideBarsubs.unsubscribe();
    if (this.getVPOsubs != undefined)
      this.getVPOsubs.unsubscribe();
  }

}
