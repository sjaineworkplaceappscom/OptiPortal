import { Component, OnInit, HostListener } from '@angular/core';
import { UIHelper } from '../../helpers/ui.helpers';
import { Commonservice } from '../../services/commonservice.service';
import { openInvoicesList } from '../../demodata/open-invoices';
import { GridComponent } from '@progress/kendo-angular-grid';

import { CurrentSidebarInfo } from '../../models/sidebar/current-sidebar-info';
import { ModuleName, ComponentName } from '../../enums/enums';
import * as $ from "jquery";
import { Configuration } from '../../helpers/Configuration';

@Component({
  selector: 'app-open-invoices-list',
  templateUrl: './open-invoices-list.component.html',
  styleUrls: ['./open-invoices-list.component.scss']
})
export class OpenInvoicesListComponent implements OnInit {

  imgPath = Configuration.imagePath;

  pageLimit;
  pagination:boolean;

  isMobile: boolean;
  isColumnFilter: boolean = false;
  isColumnGroup: boolean = false;
  gridHeight: number;
  showLoader: boolean = false;
  searchRequest: string = '';

  getPaginationAttributes(){
    // pagination add/remove for desktop and mobile
    let paginationAttributesArray = UIHelper.paginationAttributes();
    this.pageLimit = paginationAttributesArray[0];
    this.pagination = paginationAttributesArray[1];
  }
  
  // UI Section
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // apply grid height
    this.gridHeight = UIHelper.getMainContentHeight();

    // check mobile device
    this.isMobile = UIHelper.isMobile();

    this.getPaginationAttributes();
  }
  // End UI Section

  

  constructor(private commonService:Commonservice) { }

  public gridData: any[];

  ngOnInit() {

    // Apply class on body start
    const element = document.getElementsByTagName("body")[0];
    element.className = "";
    element.classList.add("opti_body-open-invoives");
    element.classList.add("opti_body-main-module");
    // Apply class on body end

    // apply grid height
    this.gridHeight = UIHelper.getMainContentHeight();

    // check mobile device
    this.isMobile = UIHelper.isMobile();

    this.getPaginationAttributes();

    
    this.getOpenInvoicesList();
  }

  /**
   * Method to get list of inquries from server.
  */
  public getOpenInvoicesList() {
    this.showLoader = true;
    this.gridData = openInvoicesList;
    setTimeout(()=>{    
      this.showLoader = false;
    }, 1000);
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

  openInvoiceDetailOnSelection(selection){
    $('#opti_OpenInvoicesID').click(); 

    let currentsideBarInfo: CurrentSidebarInfo = new CurrentSidebarInfo();
    currentsideBarInfo.ComponentName = ComponentName.OpenInvoices;
    currentsideBarInfo.ModuleName = ModuleName.OpenInvoices;
    currentsideBarInfo.SideBarStatus = true;
    this.commonService.setCurrentSideBar(currentsideBarInfo);

    
    // Reset Selection.
    // let selectedSalesOrder = this.gridData[selection.index];
    // currentsideBarInfo.RequesterData = selectedSalesOrder;
    // localStorage.setItem("SelectedSalesOrder", JSON.stringify(selectedSalesOrder));
    // this.commonService.setCurrentSideBar(currentsideBarInfo);
    // selection.selectedRows=[];  
  }


}
