import { Component, OnInit, HostListener } from '@angular/core';
import { UIHelper } from 'src/app/helpers/ui.helpers';
import { Commonservice } from 'src/app/services/commonservice.service';
import { GridComponent } from '@progress/kendo-angular-grid';
import { paymentsList } from '../../../DemoData/vendor-data';
import { CurrentSidebarInfo } from 'src/app/models/sidebar/current-sidebar-info';
import { ComponentName, ModuleName } from 'src/app/enums/enums';
import * as $ from "jquery";
import { VendorService } from '../../../services/vendor/vendor.service';
import { ConfirmDialog } from '../../../helpers/services/dialog.service';
import { ISubscription } from '../../../../../node_modules/rxjs/Subscription';
import { DateTimeHelper } from '../../../helpers/datetime.helper';

@Component({
  selector: 'app-vpayment-list',
  templateUrl: './vpayment-list.component.html',
  styleUrls: ['./vpayment-list.component.scss']
})
export class VpaymentListComponent implements OnInit {

  constructor(private commonService: Commonservice,private vendorService: VendorService, private confirmService: ConfirmDialog) { }

  isMobile: boolean;
  isColumnFilter: boolean = false;
  isColumnGroup: boolean = false;
  gridHeight: number;
  showLoader: boolean = false;
  searchRequest: string = '';
  public gridData: any[];
  public loginUserType: number;
  public systemAdmin: any;

   // Subscriber
   getlistSubs: ISubscription; 
  
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
    // Apply class on body start
    const element = document.getElementsByTagName("body")[0];
    element.className = "";
    element.classList.add("opti_body-vendor");
    element.classList.add("opti_body-payment-list");
    element.classList.add("opti_body-main-module");
    // Apply class on body end
 
    // apply grid height
    this.gridHeight = UIHelper.getMainContentHeight();
 
    // check mobile device
    this.isMobile = UIHelper.isMobile();
    let userDetail: string = localStorage.getItem("LoginUserDetail");
    let userData: any[] = JSON.parse(userDetail);
    this.loginUserType = userData[0].LoginUserType;
    this.systemAdmin = localStorage.getItem('SystemAdmin');
    this.getPaymentList();
  }

   /**
   * Method to get list of inquries from server.
  */
  public getPaymentList1() {
    this.showLoader = true;
    this.gridData = paymentsList;
    setTimeout(()=>{    
      this.showLoader = false;
    }, 1000);
  }

  
 /**
   * Method to get list of inquries from server.
   */
  public getPaymentList() {
    
    this.showLoader = true;
    this.getlistSubs = this.vendorService.getPaymentList().subscribe(
      papymentData => {
        
        if (papymentData != null && papymentData != undefined) {
          this.gridData = JSON.parse(papymentData);

          this.gridData.forEach(element => {
              element.PaymentDate = DateTimeHelper.ParseDate(element.PaymentDate); 
              element.PaymentNumber=element.PaymentNumber.toString()        
          });
          this.showLoader = false;
        }
      },
      error => {
        this.showLoader = false;
      },
      () => {
        this.showLoader = false;
      }
    );
  }

  

  async openPaymentDetailOnSelectPayment(selection){
    $('opti_HomeTabPaymentDetailID').click();
    let a: boolean = await this.confirmService.leaveUnsavedDataConfirmation();
     
    if (a == false) {
      selection.selectedRows =selection.deselectedRows;
      selection.index=selection.selectedRows[0].index;
      return;
    }
    let SelectedPayment = selection.selectedRows[0].dataItem;
    //let SelectedPayment = this.gridData[selection.index];
    let currentsideBarInfo: CurrentSidebarInfo=new CurrentSidebarInfo();
    currentsideBarInfo.ComponentName=ComponentName.VendorPaymentDetail;
    currentsideBarInfo.ModuleName=ModuleName.VendorPayments;
    currentsideBarInfo.SideBarStatus=true; 
    localStorage.setItem("SelectedPayment", JSON.stringify(SelectedPayment));
    currentsideBarInfo.RequesterData = SelectedPayment;   
    this.commonService.setCurrentSideBar(currentsideBarInfo);
    SelectedPayment='';
    selection.selectedRows = [];
  }

  ngOnDestroy() {
    if (this.getlistSubs != undefined)
      this.getlistSubs.unsubscribe();
  }



    
  onFilterChange(checkBox:any,grid:GridComponent)
  {
    if(checkBox.checked==false){
      this.clearFilter(grid);
    }
  }


  onGroupChange(checkBox: any, grid: GridComponent){
    if (checkBox.checked == false) {
      this.clearGroup(grid);
    }      
  }

  clearGroup(grid:GridComponent){
    grid.data=this.gridData; 
    if(grid!=null)
    grid.group.splice(0,grid.group.length);  
  }

  clearFilter(grid: GridComponent) {
    grid.data=this.gridData; 
    if(grid.filter!=null)
    grid.filter.filters.splice(0,grid.filter.filters.length);
  }

}
