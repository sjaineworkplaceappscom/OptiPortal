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
import { data2 } from '../../DemoData/Data2';


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
  
  // UI Section
    @HostListener('window:resize', ['$event'])
    onResize(event) {
      // apply grid height
      this.gridHeight = UIHelper.getMainContentHeight();

      // check mobile device
      this.isMobile = UIHelper.isMobile();
    }
  // End UI Section

  

  constructor(private commonService:Commonservice) { }

  public gridData: any[];

  ngOnInit() {
    // apply grid height
    this.gridHeight = UIHelper.getMainContentHeight();

    // check mobile device
    this.isMobile = UIHelper.isMobile();

    
    this.getSalesQuotationList();
  }

  /**
   * Method to get list of inquries from server.
  */
  public getSalesQuotationList() {
    this.showLoader = true;
    this.gridData = data2;
    setTimeout(()=>{    
      this.showLoader = false;
    }, 1000);
  }

  openSales(){
    let currentsideBarInfo: CurrentSidebarInfo=new CurrentSidebarInfo();
    currentsideBarInfo.ComponentName=ComponentName.UpdateSales;
    currentsideBarInfo.ModuleName=ModuleName.Sales;
    currentsideBarInfo.SideBarStatus=true;    
    
    this.commonService.setCurrentSideBar(currentsideBarInfo);
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

  

}
