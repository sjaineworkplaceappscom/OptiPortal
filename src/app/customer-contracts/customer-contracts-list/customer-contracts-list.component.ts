import { Component, OnInit, HostListener } from '@angular/core';
import { UIHelper } from '../../helpers/ui.helpers';
import { Commonservice } from '../../services/commonservice.service';
import { customerContractsList } from '../../demodata/customer-contracts';
import { GridComponent } from '@progress/kendo-angular-grid';

import * as $ from "jquery";
import { Configuration } from '../../helpers/Configuration';


@Component({
  selector: 'app-customer-contracts-list',
  templateUrl: './customer-contracts-list.component.html',
  styleUrls: ['./customer-contracts-list.component.scss']
})
export class CustomerContractsListComponent implements OnInit {

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
    element.classList.add("opti_body-customer-contracts");
    element.classList.add("opti_body-main-module");
    // Apply class on body end

    // apply grid height
    this.gridHeight = UIHelper.getMainContentHeight();

    // check mobile device
    this.isMobile = UIHelper.isMobile();

    this.getPaginationAttributes();

    
    this.getCustomerContractsList();
  }

  /**
   * Method to get list of inquries from server.
  */
  public getCustomerContractsList() {
    this.showLoader = true;
    this.gridData = customerContractsList;
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

  openContractsDetailOnSelection(selection){
    //$('#opti_OpenInvoicesID').click(); 

    // let currentsideBarInfo: CurrentSidebarInfo = new CurrentSidebarInfo();
    // currentsideBarInfo.ComponentName = ComponentName.OpenInvoices;
    // currentsideBarInfo.ModuleName = ModuleName.OpenInvoices;
    // currentsideBarInfo.SideBarStatus = true;
    // this.commonService.setCurrentSideBar(currentsideBarInfo);

    
    
  }

}