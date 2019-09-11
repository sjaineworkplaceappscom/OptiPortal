import { Component, OnInit, OnChanges } from '@angular/core';
import { VendorService } from 'src/app/services/vendor/vendor.service';
import { ToastService } from 'src/app/helpers/services/toast.service';
import { VendorASNModel } from 'src/app/tempmodels/vendor/vendor-asn-model';
import { VendorASNContentModel } from 'src/app/tempmodels/vendor/vendor-asn-content-model';
import { ISubscription } from 'rxjs/Subscription';
import { AppMessages } from 'src/app/helpers/app-messages';
import { Commonservice } from 'src/app/services/commonservice.service';
import { CurrentSidebarInfo } from 'src/app/models/sidebar/current-sidebar-info';
import { ModuleName, ComponentName } from 'src/app/enums/enums';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-vasn-content-add',
  templateUrl: './vasn-content-add.component.html',
  styleUrls: ['./vasn-content-add.component.scss']
})
export class VasnContentAddComponent implements OnInit {

  showLoader:boolean=false;
  minValidDate = new Date();
  vendorASNModel: VendorASNModel;
  public addSub:ISubscription;
  vendorASNContentModel: VendorASNContentModel;
  showGridSubs: ISubscription;

  constructor(private commonService: Commonservice, private vendorService: VendorService, private toast: ToastService,private translate: TranslateService) { 
    translate.use(localStorage.getItem('appLanguage'));
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
    });
  }


  ngOnInit() {
    //get status of selected inquiry for disabling or enabling  forms
    let vendorDetail: string = localStorage.getItem("SelectedVASN");
    this.vendorASNModel = JSON.parse(vendorDetail);
    if (this.vendorASNModel != null && this.vendorASNModel != undefined) {
    }
    this.setDefaultData();
  }
 
  /**
  * This method will reset the model and date object for add form.
  */
  private setDefaultData() {
    this.vendorASNContentModel = new VendorASNContentModel();
    this.vendorASNContentModel.ASNContentId = '';//DateTimeHelper.ParseToUTC(new Date());
    this.vendorASNContentModel.ASNContentNumber = '';  //DateTimeHelper.ParseToUTC(new Date());;
    this.vendorASNContentModel.ASNId = this.vendorASNModel.ASNId;
    this.vendorASNContentModel.BillToAddress = undefined;
    this.vendorASNContentModel.CreatedBy = '';
    this.vendorASNContentModel.CreatedDate = new Date();
    this.vendorASNContentModel.DeliveryDate = new Date();
    this.vendorASNContentModel.Item = '';
    this.vendorASNContentModel.LineNumber = '';
    this.vendorASNContentModel.ModifiedBy = '';
    this.vendorASNContentModel.ModifiedDate = new Date();
    this.vendorASNContentModel.Quantity = '';
    this.vendorASNContentModel.ShipToAddress ='';
    this.vendorASNContentModel.TaxCode = '';
    this.vendorASNContentModel.TotalPrice = '';
    this.vendorASNContentModel.UOM = '';
    this.vendorASNContentModel.UnitPrice = '';
  }

  addContentData(){
    this.showLoader = true;
    this.addSub = this.vendorService.AddVendorASNContent(this.vendorASNContentModel).subscribe(
      (data: any) => {
        this.showLoader = false;
        this.toast.showSuccess(AppMessages.VendorInvASNAdd);
        this.commonService.refreshVASNContentList(true);
        localStorage.setItem("SelectedVASNContent", JSON.stringify(data));
      },
      error => {
        console.log("Error: ", error)
        this.showLoader = false;
      },
      () => {
        this.showLoader = false;
      }
    );
  }

  openUpdateSideBar(data: any) {
    let currentSidebarInfo: CurrentSidebarInfo = new CurrentSidebarInfo();
    currentSidebarInfo.SideBarStatus = true,
    currentSidebarInfo.ModuleName = ModuleName.VendorASN;
    currentSidebarInfo.ComponentName = ComponentName.VendorASNUpdate;
    currentSidebarInfo.RequesterData = data
    this.commonService.setCurrentSideBar(currentSidebarInfo);
  }

  back(){
    this.commonService.refreshVASNContentList(false);
  }

   // unsubscribe all subscribers.
   ngOnDestroy() {
    if (this.addSub != undefined){
      this.addSub.unsubscribe();
    }
    if (this.showGridSubs != undefined){
      this.showGridSubs.unsubscribe();
    }
  }
}
