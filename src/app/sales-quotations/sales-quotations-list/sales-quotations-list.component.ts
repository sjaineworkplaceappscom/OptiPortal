import { Component, OnInit, HostListener } from '@angular/core';
import { CurrentSidebarInfo } from '../../models/sidebar/current-sidebar-info';
import { ModuleName, ComponentName } from '../../enums/enums';
import { Commonservice } from '../../services/commonservice.service';
import { DatePipe } from '@angular/common'


import {
  GridComponent,
  GridDataResult,
  DataStateChangeEvent
} from '@progress/kendo-angular-grid';

import { UIHelper } from '../../helpers/ui.helpers';

import { salesQuotations } from '../../DemoData/sales-quotations';
import { ISubscription } from 'rxjs/Subscription';
import { SalesQuotationService } from '../../services/sales-quotation.service';
import { DateTimeHelper } from '../../helpers/datetime.helper';
import * as $ from "jquery";
import { Configuration } from '../../helpers/Configuration';

@Component({
  selector: 'app-sales-quotations-list',
  templateUrl: './sales-quotations-list.component.html',
  styleUrls: ['./sales-quotations-list.component.scss']
})
export class SalesQuotationsListComponent implements OnInit {
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

  constructor(private commonService: Commonservice, private salseQuotationService: SalesQuotationService) { }

  public gridData: any[];

  ngOnInit() {
    // Apply class on body start
    const element = document.getElementsByTagName("body")[0];
    element.className = "";
    element.classList.add("opti_body-sales-quotations");
    element.classList.add("opti_body-main-module");
    // Apply class on body end
    // apply grid height
    this.gridHeight = UIHelper.getMainContentHeight();
    // check mobile device
    this.isMobile = UIHelper.isMobile();

    this.getPaginationAttributes();

    // set salse quotation list data.
    this.getSalesQuotationsList();
  }

  /**
   * Method to get list of inquries from server.
  */
  public getSalesQuotationList1() {
    this.showLoader = true;
    this.gridData = salesQuotations;
    setTimeout(() => {
      this.showLoader = false;
    }, 1000);
  }

  onFilterChange(checkBox: any, grid: GridComponent) {
    if (checkBox.checked == false) {
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

  openSalesQuotationDetailOnSelection(selection) {
    $('#opti_HomeTabSalesQuotationID').click(); 
    
    let currentsideBarInfo: CurrentSidebarInfo = new CurrentSidebarInfo();
    currentsideBarInfo.ComponentName = ComponentName.UpdateSales;
    currentsideBarInfo.ModuleName = ModuleName.Sales;
    currentsideBarInfo.SideBarStatus = true;
    // Reset Selection.
    let selectedSalesQuotation = selection.selectedRows[0].dataItem;//this is the correct way to get data from grid on selection.
    //let selectedSalesQuotation = this.gridData[selection.index];
    currentsideBarInfo.RequesterData = selectedSalesQuotation;
    localStorage.setItem("SelectedSalesQuotation", JSON.stringify(selectedSalesQuotation));
    this.commonService.setCurrentSideBar(currentsideBarInfo);

    // Reset Selection.
    selection.selectedRows=[];  
  }

  /**
  * Method to get list of inquries from server.
  */
  public getSalesQuotationsList() {
    this.showLoader = true; 
    this.getSaleslistSubs = this.salseQuotationService.getSalesQuotationList().subscribe(
      data => {
        if (data != null && data != undefined) {
            this.gridData = JSON.parse(data);
            this.gridData.forEach(element => {
            element.QuotationDate = DateTimeHelper.ParseDate(element.QuotationDate);
          element.DocumentDate = DateTimeHelper.ParseDate(element.DocumentDate);
            element.Duedate = DateTimeHelper.ParseDate(element.Duedate);
          });
          this.showLoader = false;
        }
      },
      error => {
        this.showLoader = false;
        //alert("Something went wrong");
        console.log("Error: ", error);
        localStorage.clear();
      }
    );
  }

  ngOnDestroy() {
    if (this.getSaleslistSubs != undefined)
      this.getSaleslistSubs.unsubscribe();
  }

}
