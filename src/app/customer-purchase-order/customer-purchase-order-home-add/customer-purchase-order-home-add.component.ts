import { Component, OnInit } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { UIHelper } from '../../helpers/ui.helpers';
import { CustomerPurchaseOrderService } from '../../services/customer-purchase-order.service';
import { Commonservice } from '../../services/commonservice.service';
import { CustomerPurchaseOrderModel } from '../../tempmodels/customer-purchase-order-model';
import { CPOReferenceType, ModuleName, ComponentName } from '../../enums/enums';
import { DateTimeHelper } from '../../helpers/datetime.helper';
import { CurrentSidebarInfo } from '../../models/sidebar/current-sidebar-info';
import { AppMessages } from '../../helpers/app-messages';
import { ToastService } from '../../helpers/services/toast.service';
import { GlobalResource } from '../../helpers/global-resource';

@Component({
  selector: 'app-customer-purchase-order-home-add',
  templateUrl: './customer-purchase-order-home-add.component.html',
  styleUrls: ['./customer-purchase-order-home-add.component.scss']
})
export class CustomerPurchaseOrderHomeAddComponent implements OnInit {
 

  custmerName;
  custmerCompanyName:string='BizChat';
  podate;
  reference;
  public value: Date = new Date(2000, 2, 10);

  public ReferenceType = [
    { text: "Purchase Order", value: CPOReferenceType.PurchaseOrder },
    { text: "Agreement", value: CPOReferenceType.Agreement }
  ];
  showLoader: boolean = false;
  public selectedItem = [{ text: "Purchase Order", value: CPOReferenceType.PurchaseOrder }];
  public customerName: string;
  public customerCode: string;
  public loggedInUserName: string;
  public loginUserType: number;
  public addSub:ISubscription;
  public customerPurchaseOrderAddModel:CustomerPurchaseOrderModel;
  public systemAdmin;
  public PODate:Date = new Date();;
  public minPODate: Date = new Date();
  
  constructor(private customerPurchaseOrderService: CustomerPurchaseOrderService, private commonService: Commonservice, private toast: ToastService) { }

  ngOnInit() {
    
    this.getUserDetails();
    this.setDefaultData();
  }
  private getUserDetails() {
    //for getting logged in user info from local storage.
    let userDetail: string = localStorage.getItem("LoginUserDetail");   
    let userData: any[] = JSON.parse(userDetail);
    this.loggedInUserName = userData[0].LoginUserName;
    this.customerName = userData[0].ParentName;
    this.customerCode = userData[0].ParentCode;
    this.loginUserType = userData[0].LoginUserType;    
    this.systemAdmin = localStorage.getItem('SystemAdmin');
  }

   /**
* This method will reset the model and date object for add form.
*/
private setDefaultData() {

  this.customerPurchaseOrderAddModel = new CustomerPurchaseOrderModel();
  this.PODate = new Date();
  this.customerPurchaseOrderAddModel.PurchaseOrderDate = this.PODate;
  this.customerPurchaseOrderAddModel.RefrenceType = this.ReferenceType[0].value;
  this.customerPurchaseOrderAddModel.RefrenceNumber = '';
}

valueChange(value:any){    
  GlobalResource.dirty=true;
  console.log('change in datepicker value'); 
}

changeDiv(e) {
  GlobalResource.dirty = true;
}


ngOnDestroy(){
  if(this.addSub!=undefined)
  this.addSub.unsubscribe();
}


public AddCustomerPurchaseOrder() {
  GlobalResource.dirty = false;
  this.customerPurchaseOrderAddModel.PurchaseOrderDate=DateTimeHelper.ParseToUTC(this.customerPurchaseOrderAddModel.PurchaseOrderDate);
  this.showLoader=true;
  this.addSub=this.customerPurchaseOrderService.AddPurchaseOrder(this.customerPurchaseOrderAddModel).subscribe(
    (data: any) => {         
      this.commonService.refreshCPOList(true); 
      //localStorage.setItem("SelectedCustomerPurchaseOrder",data.CustomerPurchaseOrder);      
      localStorage.setItem("SelectedCustomerPurchaseOrder",JSON.stringify(data));         
      this.openUpdateSideBar(data); 
      this.showLoader=false;
      this.toast.showSuccess(AppMessages.PurchaseOrderAddedSuccessMsg); 
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
  currentSidebarInfo.ModuleName=ModuleName.CustomerPurchaseOrder;
  currentSidebarInfo.ComponentName=ComponentName.CPOUpdate;
  data.PurchaseOrderDate=DateTimeHelper.ParseToUTC(data.PurchaseOrderDate);//new Date(data.PurchaseOrderDate);
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
