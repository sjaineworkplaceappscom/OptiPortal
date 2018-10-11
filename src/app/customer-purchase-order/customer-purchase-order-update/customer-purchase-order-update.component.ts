import { Component, OnInit, Input, HostListener } from '@angular/core';
import { CurrentSidebarInfo } from '../../models/sidebar/current-sidebar-info';
import { UIHelper } from '../../helpers/ui.helpers';
import { ISubscription } from '../../../../node_modules/rxjs/Subscription';
import { Commonservice } from '../../services/commonservice.service';
import { CustomerPurchaseOrderService } from '../../services/customer-purchase-order.service';
import { DateTimeHelper } from '../../helpers/datetime.helper';
import { CustomerPurchaseOrderModel } from '../../tempmodels/customer-purchase-order-model';

@Component({
  selector: 'app-customer-purchase-order-update',
  templateUrl: './customer-purchase-order-update.component.html',
  styleUrls: ['./customer-purchase-order-update.component.scss']
})
export class CustomerPurchaseOrderUpdateComponent implements OnInit {

  public getPIsubs: ISubscription;
  public sideBarsubs: ISubscription;
  public updatePISub: ISubscription;
  public updatePIStatusSub: ISubscription;
  showLoader: boolean = false;
  customerPurchaseOrderModel: CustomerPurchaseOrderModel = new CustomerPurchaseOrderModel();
  constructor(private commonService: Commonservice, private customerPurchaseOrderService: CustomerPurchaseOrderService) { }

  @Input() currentSidebarInfo:CurrentSidebarInfo;

  tabName: string = 'home';

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
     // Set sidebar data;
     debugger;
     this.sideBarsubs = this.commonService.currentSidebarInfo.subscribe(
      currentSidebarData => {
        console.log("current side bar data:"+currentSidebarData)
        if (currentSidebarData != null && currentSidebarData != undefined) {
          this.showLoader = true;
         this.customerPurchaseOrderModel = currentSidebarData.RequesterData;
          if(this.customerPurchaseOrderModel!=null){
          this.callCustomerPurchaseOrderDetailAPI(this.customerPurchaseOrderModel.PurchaseOrderId);
          }else{}
        }
      },
      error => {
        this.showLoader = false;
        alert("Something went wrong");
        console.log("Error: ", error)
      }
    );
  }

  ngOnDestroy() {
    if (this.sideBarsubs != undefined)
      this.sideBarsubs.unsubscribe();
    if (this.updatePISub != undefined)
      this.updatePISub.unsubscribe();
    if (this.getPIsubs != undefined)
      this.getPIsubs.unsubscribe();

    if (this.updatePIStatusSub != undefined)
      this.updatePIStatusSub.unsubscribe();
  }


  /** 
    * call api for purchase inquiry detail.
    */
   callCustomerPurchaseOrderDetailAPI(id: string) {
  
    this.showLoader = true;
    this.getPIsubs = this.customerPurchaseOrderService.getPurchaseOrderDetail(id).subscribe(
      data => { 
        this.showLoader = false;
        let dataArray: any[] = JSON.parse(data);
        this.customerPurchaseOrderModel = dataArray[0];
       
       
        this.customerPurchaseOrderModel.PurchaseOrderDate = DateTimeHelper.ParseToUTC(this.customerPurchaseOrderModel.PurchaseOrderDate);
        localStorage.setItem("SelectedPurchaseInquery",JSON.stringify(this.customerPurchaseOrderModel));
        this.setModelAndSubscribeData();
          
      }, error => {  
        this.showLoader = false; 
        alert("Something went wrong");
        console.log("Error: ", error)
      }, () => { }
    );
  }


  private setModelAndSubscribeData(){
    if (this.customerPurchaseOrderModel != null && this.customerPurchaseOrderModel != undefined) {
      this.customerPurchaseOrderModel.PurchaseOrderDate = new Date(this.customerPurchaseOrderModel.PurchaseOrderDate);
      this.getUserDetails();
   
    }
 }

 public customerName: string;
  public customerCode: string;
  public loggedInUserName: string;
  public loginUserType: number;
 private getUserDetails() {
  //for getting logged in user info from local storage.
  let userDetail: string = localStorage.getItem("LoginUserDetail");
  let userData: any[] = JSON.parse(userDetail);
  this.loggedInUserName = userData[0].LoginUserName;
  this.customerName = userData[0].ParentName;
  this.customerCode = userData[0].ParentCode;
  this.loginUserType = userData[0].LoginUserType;
}


 /**
  * UpdatePurchaseInquiry 
  */
 public UpdatePurchaseInquiry() {

 

   this.showLoader = true;
    this.updatePISub = this.customerPurchaseOrderService.UpdatePurchaseOrder(this.customerPurchaseOrderModel).subscribe(
      data => {
        this.showLoader = false;
        this.commonService.refreshPIList(null);
        
        localStorage.setItem("SelectedPurchaseInquery", JSON.stringify(this.customerPurchaseOrderModel));
      },
      error => {
        alert("Something went wrong");
        console.log("Error: ", error)
        this.showLoader = false;
      },
      () => { this.showLoader = false; }

    );
  }
}

  
