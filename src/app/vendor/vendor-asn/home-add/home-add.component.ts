import { Component, OnInit, Input,OnChanges } from '@angular/core';
import { CurrentSidebarInfo } from '../../../models/sidebar/current-sidebar-info';
import { VendorASNModel } from '../../../tempmodels/vendor/vendor-asn-model';
import { markParentViewsForCheckProjectedViews } from '../../../../../node_modules/@angular/core/src/view/util';
import { DateTimeHelper } from '../../../helpers/datetime.helper';
import { ISubscription } from 'rxjs/Subscription';
import { Commonservice } from 'src/app/services/commonservice.service';
import { VendorOIService } from 'src/app/services/vendor/vendor-o-i.service';
import { ToastService } from 'src/app/helpers/services/toast.service';
import { AppMessages } from 'src/app/helpers/app-messages';
import { ModuleName, ComponentName } from 'src/app/enums/enums';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-home-add',
  templateUrl: './home-add.component.html',
  styleUrls: ['./home-add.component.scss']
})
export class HomeAddComponent implements OnInit {

  showLoader: boolean = false;
  minValidDate = new Date();
  shipmentDate = new Date();
  deleiveryDate = new Date();
  vendorASNModel: VendorASNModel = new VendorASNModel();
  public addSub: ISubscription;
  constructor(private commonService: Commonservice, private vendorOpenInvoiceService: VendorOIService, private toast: ToastService,private translate: TranslateService) {  
    translate.use(localStorage.getItem('appLanguage'));
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
    });  
   }
  @Input() currentSidebarInfo: CurrentSidebarInfo;

  ngOnInit() {
    this.setDefaultData();
    if (this.currentSidebarInfo != undefined){      
      this.mapASN(this.currentSidebarInfo.RequesterData);
    }
  }
  /**
  * This method will reset the model and date object for add form.
  */
  private setDefaultData() {
    this.vendorASNModel = new VendorASNModel();
    this.vendorASNModel.DeliveryDate = DateTimeHelper.ParseToUTC(new Date());
    this.vendorASNModel.ShipmentDate = DateTimeHelper.ParseToUTC(new Date());;
    this.vendorASNModel.Discount = '';
    this.vendorASNModel.ASNId = undefined;
    this.vendorASNModel.Freight = '';
    this.vendorASNModel.POReferenceNumber = '';
    this.vendorASNModel.Price = '';
    this.vendorASNModel.Tax = '';
    this.vendorASNModel.TotalPrice = '';
    this.vendorASNModel.TrackingNumber = '';
    this.vendorASNModel.Vendor = '';
    this.vendorASNModel.WayBillNumber = '';
  }

  mapASN(podata: any) {    
    this.vendorASNModel=new VendorASNModel();
    if(podata!=null && podata != undefined){
    this.vendorASNModel.Vendor=podata.Vendor;    
    this.vendorASNModel.VendorCode=podata.VendorCode;    
    this.vendorASNModel.POReferenceNumber=podata.PONumber;
  }  

  }

  valueShipmentChange(e) {
  }

  valueDeliveryChange(e) {
  }

  closeRightSidebar(status) {
  }

  ngOnChange() {
   
  }

  public AddASN() {
    this.showLoader = true;
    this.vendorASNModel.DeliveryDate=this.deleiveryDate;
    this.vendorASNModel.ShipmentDate=this.shipmentDate;
    this.addSub = this.vendorOpenInvoiceService.AddASN(this.vendorASNModel).subscribe(
      (data: any) => {
        this.showLoader = false;
        this.toast.showSuccess(AppMessages.VendorInvASNContentAdd);
        this.commonService.refreshVASNList(true);
        localStorage.setItem("SelectedVASN", JSON.stringify(data));
        this.openUpdateSideBar(data);
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

  // unsubscribe all subscribers.
  ngOnDestroy() {
    if (this.addSub != undefined)
      this.addSub.unsubscribe();
  }


}
