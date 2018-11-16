import { Component, OnInit, HostListener } from '@angular/core';
import { UIHelper } from 'src/app/helpers/ui.helpers';
import { Commonservice } from 'src/app/services/commonservice.service';
import { GridComponent } from '@progress/kendo-angular-grid';
import { paymentsList } from '../../../DemoData/vendor-data';
import { CurrentSidebarInfo } from 'src/app/models/sidebar/current-sidebar-info';
import { ComponentName, ModuleName } from 'src/app/enums/enums';

@Component({
  selector: 'app-vpayment-list',
  templateUrl: './vpayment-list.component.html',
  styleUrls: ['./vpayment-list.component.scss']
})
export class VpaymentListComponent implements OnInit {

  constructor(private commonService:Commonservice) { }

  isMobile: boolean;
  isColumnFilter: boolean = false;
  isColumnGroup: boolean = false;
  gridHeight: number;
  showLoader: boolean = false;
  searchRequest: string = '';
  public gridData: any[];
  
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
    this.getPaymentList();
  }

   /**
   * Method to get list of inquries from server.
  */
  public getPaymentList() {
    this.showLoader = true;
    this.gridData = paymentsList;
    setTimeout(()=>{    
      this.showLoader = false;
    }, 1000);
  }

  onFilterChange(checkBox:any,grid:GridComponent) {
    if(checkBox.checked==false){
      this.clearFilter(grid);
    }
  }

  clearFilter(grid:GridComponent){      
    //grid.filter.filters=[];
  }

  openSalesOrderDetailOnSelectSalesOrder(e){
    let currentsideBarInfo: CurrentSidebarInfo=new CurrentSidebarInfo();
    currentsideBarInfo.ComponentName=ComponentName.VendorPaymentDetail;
    currentsideBarInfo.ModuleName=ModuleName.VendorPayments;
    currentsideBarInfo.SideBarStatus=true;    
    this.commonService.setCurrentSideBar(currentsideBarInfo);
  }

}
