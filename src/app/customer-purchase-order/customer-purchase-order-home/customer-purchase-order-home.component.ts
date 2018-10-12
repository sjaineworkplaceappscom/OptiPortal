import { Component, OnInit } from '@angular/core';
import { ISubscription } from '../../../../node_modules/rxjs/Subscription';
import { CustomerPurchaseOrderModel } from '../../tempmodels/customer-purchase-order-model';
import { Commonservice } from '../../services/commonservice.service';
import { CustomerPurchaseOrderService } from '../../services/customer-purchase-order.service';
import { UIHelper } from '../../helpers/ui.helpers';
import { DateTimeHelper } from '../../helpers/datetime.helper';
import { CurrentSidebarInfo } from '../../models/sidebar/current-sidebar-info';
import { CPOReferenceType, CustomerEntityType } from '../../enums/enums';
import { NotesModel } from '../../models/purchaserequest/notes';

@Component({
  selector: 'app-customer-purchase-order-home',
  templateUrl: './customer-purchase-order-home.component.html',
  styleUrls: ['./customer-purchase-order-home.component.scss']
})
export class CustomerPurchaseOrderHomeComponent implements OnInit {
  custmerName;
  custmerCompanyName: string = 'BizChat';
  podate;
  reference;
  public value: Date = new Date(2000, 2, 10);
  public minPODate: Date = new Date();
  public ReferenceType = [
    { text: "Purchase Order", value: CPOReferenceType.PurchaseOrder },
    { text: "Agreement", value: CPOReferenceType.Agreement }
  ];

  public getPIsubs: ISubscription;
  public sideBarsubs: ISubscription;
  public updatePISub: ISubscription;
  public updatePIStatusSub: ISubscription;
  showLoader: boolean = false;
  customerPurchaseOrderModel: CustomerPurchaseOrderModel = new CustomerPurchaseOrderModel();
  public customerName: string;
  public customerCode: string;
  public loggedInUserName: string;
  public loginUserType: number;
  notesMasterData: NotesModel = new NotesModel();

  constructor(private commonService: Commonservice, private customerPurchaseOrderService: CustomerPurchaseOrderService) { }

  public selectedItem = [ {text: "Purchase Order", value: CPOReferenceType.PurchaseOrder }];


  ngOnInit() {
    // apply width on opti_TabID
    this.getUserDetails();
    UIHelper.getWidthOfOuterTab();
    console.log("on init cpoh");
    // Set sidebar data;
    this.sideBarsubs = this.commonService.currentSidebarInfo.subscribe(
      currentSidebarData => {
        console.log("current side bar data:" + currentSidebarData)
        if (currentSidebarData != null && currentSidebarData != undefined) {
          this.showLoader = true;
          this.customerPurchaseOrderModel = currentSidebarData.RequesterData;
          console.log('ngOnInit'+currentSidebarData.RequesterData);
          if (this.customerPurchaseOrderModel != null) {
            this.callCustomerPurchaseOrderDetailAPI(this.customerPurchaseOrderModel.PurchaseOrderId);
          } else { }
        }
      },
      error => {
        this.showLoader = false;
        alert("Something went wrong");
        console.log("Error: ", error)
      }
    );
  }

  private getUserDetails() { 
    //for getting logged in user info from local storage.
    let userDetail: string = localStorage.getItem("LoginUserDetail");   
    let userData: any[] = JSON.parse(userDetail);
    this.loggedInUserName = userData[0].LoginUserName;
    this.customerName = userData[0].ParentName;
    this.customerCode = userData[0].ParentCode;
    this.loginUserType = userData[0].LoginUserType;    
    console.log("customer name"+this.customerName);
    console.log("customer code"+this.customerCode);
    console.log("customer detail :"+userDetail);
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
        localStorage.setItem("SelectedPurchaseInquery", JSON.stringify(this.customerPurchaseOrderModel));
        this.setModelAndSubscribeData();

      }, error => {
        this.showLoader = false;
        alert("Something went wrong");
        console.log("Error: ", error)
      }, () => { }
    );
  }


  private setModelAndSubscribeData() {
    if (this.customerPurchaseOrderModel != null && this.customerPurchaseOrderModel != undefined) {
      this.customerPurchaseOrderModel.PurchaseOrderDate = new Date(this.customerPurchaseOrderModel.PurchaseOrderDate);
      this.getUserDetails();

      // Set notes data for inquiry
      this.notesMasterData.ParentId = this.customerPurchaseOrderModel.PurchaseOrderId;
      this.notesMasterData.ParentType = CustomerEntityType.CustomerPurchaseOrder;
      this.notesMasterData.GrantParentId = this.customerPurchaseOrderModel.PurchaseOrderId;
      this.notesMasterData.GrandParentType = CustomerEntityType.CustomerPurchaseOrder;
      this.commonService.setNotesData(this.notesMasterData);
    }
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
  * UpdatePurchaseInquiry 
  */
  public UpdateCustomerPurchaseOrder() {
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
    /**   
* 
* @param status close right content section, will pass false
*/
closeRightSidebar() {
  //GlobalResource.dirty=false;
  let currentSidebarInfo: CurrentSidebarInfo = new CurrentSidebarInfo();
  currentSidebarInfo.SideBarStatus = false;
  this.commonService.setCurrentSideBar(currentSidebarInfo);
}
valueChange(value:any){    
  // GlobalResource.dirty=true;
   console.log('change in datepicker value'); 
 }
}
