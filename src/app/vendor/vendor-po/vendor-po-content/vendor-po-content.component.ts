import { Component, OnInit, HostListener } from '@angular/core';
import { VendorService } from 'src/app/services/vendor/vendor.service';
import { VendorPOModel } from 'src/app/tempmodels/vendor/vendor-po-model';
import { ISubscription } from 'rxjs/Subscription';
import { VendorPOContentModel } from 'src/app/tempmodels/vendor/vendor-po-content-model';
import { DateTimeHelper } from 'src/app/helpers/datetime.helper';
import { UIHelper } from 'src/app/helpers/ui.helpers';
import { Configuration } from 'src/app/helpers/Configuration';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-vendor-po-content',
  templateUrl: './vendor-po-content.component.html',
  styleUrls: ['./vendor-po-content.component.scss']
})
export class VendorPoContentComponent implements OnInit {

  imgPath = Configuration.imagePath;

  gridData: any;
  VPOModel: VendorPOModel = new VendorPOModel();
  VPOContentModel: VendorPOContentModel = new VendorPOContentModel();
  showLoader: boolean = false;
  public getVPIsubs: ISubscription;
  constructor(private vendorService: VendorService,private translate: TranslateService) { 
    translate.use(localStorage.getItem('appLanguage'));
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
    });
  }


  isMobile: boolean;
  isColumnFilterVPO: boolean = false;
  gridHeight: number;

  // UI Section
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // apply grid height
    this.gridHeight = UIHelper.getMainContentHeight();

    // check mobile device
    this.isMobile = UIHelper.isMobile();
  }
  // End UI Section

  ngOnInit() {
    // apply grid height
    this.gridHeight = UIHelper.getMainContentHeight();

    // check mobile device
    this.isMobile = UIHelper.isMobile();

    //get status of selected order for disabling or enabling  forms
    let VPI: string = localStorage.getItem("SelectedVPO");
    let vpiData: any = JSON.parse(VPI);
    this.VPOModel = vpiData;

    if (this.VPOModel != null && this.VPOModel != undefined) {
      this.callVendorPurchaseOrderDetailAPI(this.VPOModel.POId + "");
    }
  }

  ngOnDestroy() {
    if (this.getVPIsubs != undefined)
      this.getVPIsubs.unsubscribe();
  }

  /** 
   * call api for purchase inquiry detail.
   */
  callVendorPurchaseOrderDetailAPI(id: string) {

    // console.log("Update:data from LocalStorage:" + JSON.stringify(localStorage.getItem('SelectedPurchaseInquery')));
    this.showLoader = true;
    this.getVPIsubs = this.vendorService.getVendorPODetailById(id, 2 + "").subscribe(
      data => {

        this.showLoader = false;
        if (data != null && data != undefined && data != "") {
          let dataArray: any[] = JSON.parse(data);

          this.gridData = JSON.parse(data);
          this.gridData.forEach(element => {
            element.RequestedDate = DateTimeHelper.ParseDate(element.RequestedDate);
          });
          console.log(this.gridData);
          this.VPOContentModel = dataArray[0];
          this.VPOContentModel.RequestedDate = DateTimeHelper.ParseToUTC(this.VPOContentModel.RequestedDate);


        }
        else {
        }
      }, error => {
        this.showLoader = false;
        console.log("Error: ", error)
      }, () => { }
    );
  }

}
