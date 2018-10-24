import { Component, OnInit, HostListener } from '@angular/core';
import { UIHelper } from '../../helpers/ui.helpers';
import { Commonservice } from '../../services/commonservice.service';
import { customerPurchaseOrderList } from '../../demodata/customer-purchase-order';
import { GridComponent } from '@progress/kendo-angular-grid';

import { CurrentSidebarInfo } from '../../models/sidebar/current-sidebar-info';
import { ComponentName, ModuleName } from 'src/app/enums/enums';
import * as $ from "jquery";
import { Configuration } from '../../helpers/Configuration';
import { ISubscription } from '../../../../node_modules/rxjs/Subscription';
import { DateTimeHelper } from '../../helpers/datetime.helper';
import { CustomerPurchaseOrderService } from '../../services/customer-purchase-order.service';
import { DatePipe } from '../../../../node_modules/@angular/common';
import { Router } from '../../../../node_modules/@angular/router';
import { ConfirmDialog } from '../../helpers/services/dialog.service';



@Component({
  selector: 'app-customer-purchase-order-list',
  templateUrl: './customer-purchase-order-list.component.html',
  styleUrls: ['./customer-purchase-order-list.component.scss']
})
export class CustomerPurchaseOrderListComponent implements OnInit {

  imgPath = Configuration.imagePath;

  isMobile: boolean;
  isColumnFilter: boolean = false;
  isColumnGroup: boolean = false;
  gridHeight: number;
  showLoader: boolean = false;
  searchRequest: string = '';

//for inquiry grid Data
public gridData: any[] = [];
public systemAdmin: any;
public loginUserType: number;

// Subscriber
getCPOlistSubs: ISubscription;
refreshCPOListSubs: ISubscription;

  pageLimit:string;
  pagination:boolean;
  
  // UI Section
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // show/hide pagintaion
    this.paginationAttributes();
    // apply grid height
    this.gridHeight = UIHelper.getMainContentHeight();
    // check mobile device
    this.isMobile = UIHelper.isMobile();
  }
  // End UI Section

  

  constructor(private customerPurchaseOrderService: CustomerPurchaseOrderService, private commonService: Commonservice, public datepipe: DatePipe, private router: Router, private confirmService: ConfirmDialog) {
  
  }


  public paginationAttributes(){
    this.isMobile = UIHelper.isMobile();
    if(this.isMobile==true){
      this.pageLimit = '';
      this.pagination = false;
    }else{
      this.pageLimit = '50';
      this.pagination = true;
    }
  }

  ngOnInit() {

    // Apply class on body start
    const element = document.getElementsByTagName("body")[0];
    element.className = "";
    element.classList.add("opti_body-customer-purchase-order");
    element.classList.add("opti_body-main-module");
    // Apply class on body end
    // show/hide pagintaion
    this.paginationAttributes();
    // apply grid height
    this.gridHeight = UIHelper.getMainContentHeight();
    // check mobile device
    this.isMobile = UIHelper.isMobile();
    // user detail.
    let userDetail: string = localStorage.getItem("LoginUserDetail");
    let userData: any[] = JSON.parse(userDetail);
    this.loginUserType = userData[0].LoginUserType;
    this.gridHeight = UIHelper.getMainContentHeight();
    this.systemAdmin = localStorage.getItem('SystemAdmin');

    this.refreshCPOListSubs = this.commonService.refreshCPOListSubscriber.subscribe(data => {
      if(data!=null && data !=undefined)
      this.getCustomerPurchaseOrderList();
    },
      error => {
        this.showLoader = false;
        //alert("Something went wrong");
        console.log("Error: ", error)
      });

    //call method to get all inquiry data.
    this.getCustomerPurchaseOrderList();
  }

  /**
   * Method to get list of inquries from server.
  */
  public getCustomerPurchaseOrderList1() {
    this.showLoader = true;
    this.gridData = customerPurchaseOrderList;
    setTimeout(()=>{    
      this.showLoader = false;
    }, 1000);
  }



  /**
   * Method to get list of inquries from server.
   */
  public getCustomerPurchaseOrderList() {
    this.showLoader = true;
    this.getCPOlistSubs = this.customerPurchaseOrderService.getCustomerPurchaseOrderList().subscribe(
      customerPurchaseData => {
        if (customerPurchaseData != null && customerPurchaseData != undefined) {
          this.gridData = JSON.parse(customerPurchaseData);
          this.gridData.forEach(element => {
            element.PurchaseOrderDate = DateTimeHelper.ParseDate(element.PurchaseOrderDate);
          });
          this.showLoader = false;
        }
      },
      error => {
        this.showLoader = false;
        //alert("Something went wrong");
        console.log("Error: ", error);
        //localStorage.clear();
        // this.router.navigate(['landing']);
      },
      () => {
        this.showLoader = false;
      }
    );
  }
  onFilterChange(checkBox:any,grid:GridComponent)
  {
    if(checkBox.checked==false){
      this.clearFilter(grid);
    }
  }

  clearFilter(grid:GridComponent){      
    //grid.filter.filters=[];
  }

 async openInqueryDetailOnSelectInquery(selection){
    let a: boolean = await this.confirmService.leaveUnsavedDataConfirmation();
     
    if (a == false) {

      selection.selectedRows =selection.deselectedRows;
      selection.index=selection.selectedRows[0].index;
      return;

    }

    $('#opti_HomeTabCustomerPurchaseOrderID').click();
    let currentsideBarInfo: CurrentSidebarInfo = new CurrentSidebarInfo();
    currentsideBarInfo.ComponentName = ComponentName.CPOUpdate;
    currentsideBarInfo.ModuleName = ModuleName.CustomerPurchaseOrder;
    currentsideBarInfo.SideBarStatus = true;
    this.commonService.setCurrentSideBar(currentsideBarInfo);

    let selectedCustomerPurchaseOrder = this.gridData[selection.index];
    
    localStorage.setItem("SelectedCustomerPurchaseOrder", JSON.stringify(selectedCustomerPurchaseOrder));
    currentsideBarInfo.RequesterData = selectedCustomerPurchaseOrder;
    this.commonService.setCurrentSideBar(currentsideBarInfo);
    console.log('b4 reset selection');
    // Reset Selection.
    selection.selectedRows = [];

  }
  
  AddCustomerPurchaseOrder(){
    let currentsideBarInfo: CurrentSidebarInfo = new CurrentSidebarInfo();
    currentsideBarInfo.ComponentName = ComponentName.CPOAdd;
    currentsideBarInfo.ModuleName = ModuleName.CustomerPurchaseOrder;
    currentsideBarInfo.SideBarStatus = true;
    this.commonService.setCurrentSideBar(currentsideBarInfo);
  }

  ngOnDestroy() {
    if (this.refreshCPOListSubs != undefined)
      this.refreshCPOListSubs.unsubscribe();

    if (this.getCPOlistSubs != undefined)
      this.getCPOlistSubs.unsubscribe();
  }


}
