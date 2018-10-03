import { Component, OnInit, HostListener } from '@angular/core';
import { UIHelper } from '../../helpers/ui.helpers';
import { Commonservice } from '../../services/commonservice.service';
import { customerContactsList } from '../../demodata/customer-contacts';
import { GridComponent } from '@progress/kendo-angular-grid';
import { Configuration } from '../../../assets/configuration';
import { CurrentSidebarInfo } from '../../models/sidebar/current-sidebar-info';
import { ModuleName, ComponentName } from '../../enums/enums';
import * as $ from "jquery";

@Component({
  selector: 'app-customer-contacts-list',
  templateUrl: './customer-contacts-list.component.html',
  styleUrls: ['./customer-contacts-list.component.scss']
})
export class CustomerContactsListComponent implements OnInit {

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
    element.classList.add("opti_body-customer-contacts");
    element.classList.add("opti_body-main-module");
    // Apply class on body end

    // apply grid height
    this.gridHeight = UIHelper.getMainContentHeight();

    // check mobile device
    this.isMobile = UIHelper.isMobile();

    this.getPaginationAttributes();

    
    this.getCustomerContactsList();
  }

  /**
   * Method to get list of inquries from server.
  */
  public getCustomerContactsList() {
    this.showLoader = true;
    this.gridData = customerContactsList;
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

  openContactsDetailOnSelection(selection){
    let currentsideBarInfo: CurrentSidebarInfo = new CurrentSidebarInfo();
    currentsideBarInfo.ComponentName = ComponentName.UpdateContact;
    currentsideBarInfo.ModuleName = ModuleName.CustomerContacts;
    currentsideBarInfo.SideBarStatus = true;
    this.commonService.setCurrentSideBar(currentsideBarInfo);
  }

  addContactsOnClick(status:boolean){
    let currentsideBarInfo: CurrentSidebarInfo = new CurrentSidebarInfo();
    currentsideBarInfo.ComponentName = ComponentName.AddContact;
    currentsideBarInfo.ModuleName = ModuleName.CustomerContacts;
    currentsideBarInfo.SideBarStatus = status;
    this.commonService.setCurrentSideBar(currentsideBarInfo);
  }

}
