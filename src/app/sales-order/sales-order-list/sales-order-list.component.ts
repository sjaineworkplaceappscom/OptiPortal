import { Component, OnInit, HostListener } from '@angular/core';
import { UIHelper } from '../../helpers/ui.helpers';
import { Commonservice } from '../../services/commonservice.service';
import { GridComponent } from '@progress/kendo-angular-grid';
import { CurrentSidebarInfo } from '../../models/sidebar/current-sidebar-info';
import { ModuleName, ComponentName } from '../../enums/enums';
import { salesOrderList } from '../../DemoData/sales-order';
import { SalesOrderService } from '../../services/sales-order.service';
import { DateTimeHelper } from '../../helpers/datetime.helper';
import { ISubscription } from '../../../../node_modules/rxjs/Subscription';
import * as $ from "jquery";

@Component({
  selector: 'app-sales-order-list',
  templateUrl: './sales-order-list.component.html',
  styleUrls: ['./sales-order-list.component.scss']
})
export class SalesOrderListComponent implements OnInit {

  isMobile: boolean;
  isColumnFilter: boolean = false;
  isColumnGroup: boolean = false;
  gridHeight: number;
  showLoader: boolean = false;
  searchRequest: string = '';

  getSaleslistSubs: ISubscription;

  // UI Section
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // apply grid height
    this.gridHeight = UIHelper.getMainContentHeight();

    // check mobile device
    this.isMobile = UIHelper.isMobile();
  }
  // End UI Section



  constructor(private commonService: Commonservice, private salseOrderService: SalesOrderService) { }

  public gridData: any[];

  ngOnInit() {
    // Apply class on body start
    const element = document.getElementsByTagName("body")[0];
    element.className = "";
    element.classList.add("opti_body-sales-order");
    element.classList.add("opti_body-main-module");
    // Apply class on body end

    // apply grid height
    this.gridHeight = UIHelper.getMainContentHeight();

    // check mobile device
    this.isMobile = UIHelper.isMobile();

    //this.getOrderList1();
   this.getSalesOrderList();
  }

  /**
   * Method to get list of inquries from server.
  */
  public getOrderList1() {
    this.showLoader = true;
    this.gridData = salesOrderList;
    setTimeout(() => {
      this.showLoader = false;
    }, 1000);
  }



  onFilterChange(checkBox: any, grid: GridComponent) {
    if (checkBox.checked == false) {
      this.clearFilter(grid);
    }
  }

  clearFilter(grid: GridComponent) {
    //grid.filter.filters=[];
  }
 
  openSalesOrderDetailOnSelection(selection) {
    $('#opti_HomeTabSalesOrderID').click(); 
    let currentsideBarInfo: CurrentSidebarInfo = new CurrentSidebarInfo();
    currentsideBarInfo.ComponentName = ComponentName.SalesOrderDetail;
    currentsideBarInfo.ModuleName = ModuleName.SalesOrder;
    currentsideBarInfo.SideBarStatus = true;
    // Reset Selection.
    let selectedSalesOrder = this.gridData[selection.index];
    currentsideBarInfo.RequesterData = selectedSalesOrder;
    localStorage.setItem("SelectedSalesOrder", JSON.stringify(selectedSalesOrder));
    this.commonService.setCurrentSideBar(currentsideBarInfo);
    selection.selectedRows=[];  
  }


  /**
  * Method to get list of inquries from server.
  */
  public getSalesOrderList() {
    this.showLoader = true;
    this.getSaleslistSubs = this.salseOrderService.getSalesOrderList().subscribe(
      data => {
       // console.log("orderlist:"+data);
        if (data != null && data != undefined) {
          this.gridData = JSON.parse(data);
          this.gridData.forEach(element => {
            element.OrderDate = DateTimeHelper.ParseDate(element.OrderDate);
            element.DeliveryDate = DateTimeHelper.ParseDate(element.DeliveryDate);
            element.DocumentDate = DateTimeHelper.ParseDate(element.DocumentDate);
          });
          this.showLoader = false;
        }
      },
      error => {
        this.showLoader = false;
        alert("Something went wrong");
        console.log("Error: ", error);
        localStorage.clear();
      }
    );
  }

}
