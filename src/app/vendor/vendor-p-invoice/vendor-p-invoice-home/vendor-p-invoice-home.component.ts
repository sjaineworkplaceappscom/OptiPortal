import { Component, OnInit } from '@angular/core';
import { GlobalResource } from '../../../helpers/global-resource';
import { VendorOIModel } from 'src/app/tempmodels/vendor/vendor-OI-model';
import { ISubscription } from 'rxjs/Subscription';
import { VendorOpenInvoiceStatus, ModuleName, ComponentName } from 'src/app/enums/enums';
import { DateTimeHelper } from 'src/app/helpers/datetime.helper';
import { VendorService } from 'src/app/services/vendor/vendor.service';
import { VendorOIService } from 'src/app/services/vendor/vendor-o-i.service';
import { ToastService } from 'src/app/helpers/services/toast.service';
import { AppMessages } from 'src/app/helpers/app-messages';
import { CurrentSidebarInfo } from 'src/app/models/sidebar/current-sidebar-info';
import { Commonservice } from 'src/app/services/commonservice.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-vendor-p-invoice-home',
  templateUrl: './vendor-p-invoice-home.component.html',
  styleUrls: ['./vendor-p-invoice-home.component.scss']
})
export class VendorPInvoiceHomeComponent implements OnInit {

  public ValidTillDate;
  public minValidDate: Date = new Date();
  public defaultStatus: Array<{ text: string, value: number }> = [{ text: "Open", value: VendorOpenInvoiceStatus.Open }];
  vendorOIModel:VendorOIModel = new VendorOIModel();
  public addSub:ISubscription;
  showLoader:boolean=false;
  constructor(private commonService: Commonservice, private vendorOpenInvoiceService: VendorOIService,private toast:ToastService ,private translate: TranslateService) {
    translate.use(localStorage.getItem('appLanguage'));
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
    });
   }

  ngOnInit() {
    this.setDefaultData();
  }

  ngOnDestroy() {
    if (this.addSub != undefined)
      this.addSub.unsubscribe();
  }

  valueChange(value:any){    
    GlobalResource.dirty=true;
    
  }
  
  public listItems: Array<{text: string,value: number}> = [
    {text:'Open',value:VendorOpenInvoiceStatus.Open}
  ];

  //public value = [ 'Activate']

/**
* This method will reset the model and date object for add form.
*/
private setDefaultData() {
  this.vendorOIModel = new VendorOIModel();
  this.vendorOIModel.InvoiceDate = new Date();//DateTimeHelper.ParseToUTC(new Date());
  this.vendorOIModel.PaymentDueDate = new Date();  //DateTimeHelper.ParseToUTC(new Date());;
  this.vendorOIModel.InvoiceAmount ='';
  this.vendorOIModel.InvoiceId= undefined;
  this.vendorOIModel.POReferenceNumber = '';
  this.vendorOIModel.Status = this.listItems[0].value;
  this.vendorOIModel.Vendor = '';
}

public AddOpenInvoice() {

 // this.vendorOIModel.InvoiceDate = DateTimeHelper.ParseToUTC(this.vendorOIModel.InvoiceDate);
 // this.vendorOIModel.PaymentDueDate = DateTimeHelper.ParseToUTC(this.vendorOIModel.PaymentDueDate);
  this.showLoader=true;  
  this.addSub=this.vendorOpenInvoiceService.AddOpenInvoice(this.vendorOIModel).subscribe(
    (data: any) => {  
      this.showLoader=false;
      this.toast.showSuccess(AppMessages.PurchaseInqAddedSuccessMsg);
      this.commonService.refreshVOIList(true);
      localStorage.setItem("SelectedVOI",JSON.stringify(data));         
      this.openUpdateSideBar(data); 
      
    },
    error => {
      //alert("Something went wrong");
      console.log("Error: ", error)
      this.showLoader=false;
    },
    () => {
      this.showLoader=false;
     // this.closeRightSidebar();
    }
  );
}

openUpdateSideBar(data: any){
  let currentSidebarInfo: CurrentSidebarInfo = new CurrentSidebarInfo();
  currentSidebarInfo.SideBarStatus = true,
  currentSidebarInfo.ModuleName = ModuleName.VendorInvoice;
  currentSidebarInfo.ComponentName=ComponentName.VendorInvoiceUpdate;
  currentSidebarInfo.RequesterData=data
  this.commonService.setCurrentSideBar(currentSidebarInfo);
}

/** 
* 
* @param status close right content section, will pass false
*/
closeRightSidebar() {

  let currentSidebarInfo: CurrentSidebarInfo = new CurrentSidebarInfo();
  currentSidebarInfo.SideBarStatus = false;
  this.commonService.setCurrentSideBar(currentSidebarInfo);
}



}
