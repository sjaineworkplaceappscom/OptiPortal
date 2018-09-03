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
import { ISubscription } from '../../../../node_modules/rxjs/Subscription';
import { SalesQuotationService } from '../../services/sales-quotation.service';
import { DateTimeHelper } from '../../helpers/datetime.helper';

@Component({
  selector: 'app-sales-quotations-list',
  templateUrl: './sales-quotations-list.component.html',
  styleUrls: ['./sales-quotations-list.component.scss']
})
export class SalesQuotationsListComponent implements OnInit {

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
    // set salse quotation list data.
    //this.getSalesQuotationList();
    this.getSalseQuotationsList();
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

  clearFilter(grid: GridComponent) {
    //grid.filter.filters=[];
  }

  openSalesQuotationDetailOnSelection(selection) {
    let currentsideBarInfo: CurrentSidebarInfo = new CurrentSidebarInfo();
    currentsideBarInfo.ComponentName = ComponentName.UpdateSales;
    currentsideBarInfo.ModuleName = ModuleName.Sales;
    currentsideBarInfo.SideBarStatus = true;
    // Reset Selection.
    let selectedSalseQuotation = this.gridData[selection.index];
    currentsideBarInfo.RequesterData = selectedSalseQuotation;
    localStorage.setItem("SelectedSalseQuotation", JSON.stringify(selectedSalseQuotation));
    this.commonService.setCurrentSideBar(currentsideBarInfo);
  }

  /**
  * Method to get list of inquries from server.
  */
  public getSalseQuotationsList() {
    this.showLoader = true;
    debugger;
    this.getSaleslistSubs = this.salseQuotationService.getSalesQuotationList().subscribe(
      Data => {
        if (Data != null && Data != undefined) {
          this.gridData = JSON.parse(Data);
          this.gridData.forEach(element => {
            debugger;
            element.QuotationDate = DateTimeHelper.ParseDate(element.QuotationDate);
            element.DocumentDate = DateTimeHelper.ParseDate(element.DocumentDate);
            element.DueDate = DateTimeHelper.ParseDate(element.DueDate);
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
