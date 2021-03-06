import { Component, OnInit, HostListener } from '@angular/core';
import { UIHelper } from '../../helpers/ui.helpers';
import { Commonservice } from '../../services/commonservice.service';
import { GridComponent } from '@progress/kendo-angular-grid';
import { CurrentSidebarInfo } from '../../models/sidebar/current-sidebar-info';
import { ModuleName, ComponentName } from '../../enums/enums';
import { salesOrderList } from '../../DemoData/sales-order';
import { SalesOrderService } from '../../services/sales-order.service';
import { DateTimeHelper } from '../../helpers/datetime.helper';
import { ISubscription } from 'rxjs/Subscription';
import * as $ from "jquery";
import { Configuration } from '../../helpers/Configuration';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';


@Component({
  selector: 'app-sales-order-list',
  templateUrl: './sales-order-list.component.html',
  styleUrls: ['./sales-order-list.component.scss']
})
export class SalesOrderListComponent implements OnInit {
  imgPath = Configuration.imagePath;
  isMobile: boolean;
  isColumnFilter: boolean = false;
  isColumnGroup: boolean = false;
  gridHeight: number;
  showLoader: boolean = false;
  searchRequest: string = '';

  getSaleslistSubs: ISubscription;

  // pagination variable
  pageLimit;
  pagination:boolean;

  // UI Section

  getPaginationAttributes(){
    // pagination add/remove for desktop and mobile
    let paginationAttributesArray = UIHelper.paginationAttributes();
    this.pageLimit = paginationAttributesArray[0];
    this.pagination = paginationAttributesArray[1];
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // apply grid height
    this.gridHeight = UIHelper.getMainContentHeight();

    // check mobile device
    this.isMobile = UIHelper.isMobile();

    this.getPaginationAttributes();
  }
  // End UI Section



  constructor(private commonService: Commonservice, private salseOrderService: SalesOrderService,private translate: TranslateService) {
    translate.use(localStorage.getItem('appLanguage'));
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
    });
   }

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

    this.getPaginationAttributes();

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

  
  openSalesOrderDetailOnSelection(selection) {
    $('#opti_HomeTabSalesOrderID').click(); 
    let currentsideBarInfo: CurrentSidebarInfo = new CurrentSidebarInfo();
    currentsideBarInfo.ComponentName = ComponentName.SalesOrderDetail;
    currentsideBarInfo.ModuleName = ModuleName.SalesOrder;
    currentsideBarInfo.SideBarStatus = true;
    // Reset Selection.
    let selectedSalesOrder = selection.selectedRows[0].dataItem;//this is the correct way to get data from grid on selection.
    //let selectedSalesOrder = this.gridData[selection.index];
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
        //alert("Something went wrong");
        console.log("Error: ", error);
        let lang = localStorage.getItem('appLanguage');      
        localStorage.clear();
        localStorage.setItem('appLanguage',lang);  
      }
    );
  }

  ngOnDestroy() {
    if (this.getSaleslistSubs != undefined)
      this.getSaleslistSubs.unsubscribe();
  }

}
