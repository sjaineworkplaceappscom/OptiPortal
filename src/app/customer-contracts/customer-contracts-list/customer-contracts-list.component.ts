import { Component, OnInit, HostListener } from '@angular/core';
import { UIHelper } from '../../helpers/ui.helpers';
import { Commonservice } from '../../services/commonservice.service';
import { customerContractsList } from '../../demodata/customer-contracts';
import { GridComponent } from '@progress/kendo-angular-grid';

import * as $ from "jquery";
import { Configuration } from '../../helpers/Configuration';
import { CustomerContractListModel } from '../../tempmodels/Customer-Contract-list-model';
import { ISubscription } from 'rxjs/Subscription';
import { CustomerContractService } from '../../services/customer-contract.service';
import { DateTimeHelper } from '../../helpers/datetime.helper';
import { CurrentSidebarInfo } from '../../models/sidebar/current-sidebar-info';
import { ComponentName, ModuleName } from '../../enums/enums';


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

  getContractlistSubs: ISubscription;
  customerContactListModel: CustomerContractListModel = new CustomerContractListModel();
  

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

  

  constructor(private commonService:Commonservice,private customerContractService: CustomerContractService) { }

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
  public getCustomerContractsList1() {
    this.showLoader = true;
    this.gridData = customerContractsList;
    setTimeout(()=>{    
      this.showLoader = false;
    }, 1000);
  }

 /**
  * Method to get list of inquries from server.
  */
 public getCustomerContractsList() {
  this.showLoader = true; 
  this.getContractlistSubs = this.customerContractService.getCustomerContractList().subscribe(
    data => {
      if (data != null && data != undefined) {
          this.gridData = JSON.parse(data);
          this.gridData.forEach(element => {
          element.ContractDate = DateTimeHelper.ParseDate(element.ContractDate);
          element.StartDate = DateTimeHelper.ParseDate(element.StartDate);
          element.EndDate = DateTimeHelper.ParseDate(element.EndDate);
        });
        this.showLoader = false;
      }
    },
    error => {
      this.showLoader = false;
      alert("Something went wrong");
      console.log("Error: ", error);
      let lang = localStorage.getItem('appLanguage');      
        localStorage.clear();
        localStorage.setItem('appLanguage',lang);  
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

  openContractsDetailOnSelection(selection){
    let currentsideBarInfo: CurrentSidebarInfo = new CurrentSidebarInfo();
    currentsideBarInfo.ComponentName = ComponentName.ContractsAttachment;
    currentsideBarInfo.ModuleName = ModuleName.CustomerContracts;

    // set selected contract in local storage
    let SelectedContract = selection.selectedRows[0].dataItem;//this is the correct way to get data from grid on selection.
    //let SelectedContract = this.gridData[selection.index];
    localStorage.setItem("SelectedContract", JSON.stringify(SelectedContract));

    currentsideBarInfo.SideBarStatus = true;
    this.commonService.setCurrentSideBar(currentsideBarInfo);

    selection.selectedRows=[]; 
  }


  openContractsAttchmentOnSelection(index){
    let currentsideBarInfo: CurrentSidebarInfo = new CurrentSidebarInfo();
    currentsideBarInfo.ComponentName = ComponentName.ContractsAttachment;
    currentsideBarInfo.ModuleName = ModuleName.CustomerContracts;

    // set selected contract in local storage
    let SelectedContract = this.gridData[index];
    localStorage.setItem("SelectedContract", JSON.stringify(SelectedContract));

    currentsideBarInfo.SideBarStatus = true;
    this.commonService.setCurrentSideBar(currentsideBarInfo);

    //selection.selectedRows=[]; 
  }
  
  ngOnDestroy() {
    if (this.getContractlistSubs != undefined)
      this.getContractlistSubs.unsubscribe();
  }

}
