import { Component, OnInit, HostListener } from '@angular/core';
import { UIHelper } from '../../helpers/ui.helpers';
import { Commonservice } from '../../services/commonservice.service';
import { customerContactsList } from '../../demodata/customer-contacts';
import { GridComponent } from '@progress/kendo-angular-grid';

import { CurrentSidebarInfo } from '../../models/sidebar/current-sidebar-info';
import { ModuleName, ComponentName } from '../../enums/enums';
import * as $ from "jquery";
import { Configuration } from '../../helpers/Configuration';
import { ContactService } from '../../services/contact.service';
import { ISubscription } from 'rxjs/Subscription';
import { DateTimeHelper } from '../../helpers/datetime.helper';
import { ConfirmDialog } from '../../helpers/services/dialog.service';

@Component({
  selector: 'app-customer-contacts-list',
  templateUrl: './customer-contacts-list.component.html',
  styleUrls: ['./customer-contacts-list.component.scss']
})
export class CustomerContactsListComponent implements OnInit {

  imgPath = Configuration.imagePath;

  pageLimit;
  pagination: boolean;

  isMobile: boolean;
  isColumnFilter: boolean = false;
  isColumnGroup: boolean = false;
  gridHeight: number;
  showLoader: boolean = false;
  searchRequest: string = '';
  getContractlistSubs: ISubscription;
  public addSub: ISubscription;
  getPaginationAttributes() {
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



  constructor(private commonService: Commonservice, private contactService: ContactService, private confirmService: ConfirmDialog) { }

  public gridData: any[];
  refreshContactListSubs: ISubscription;
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

    this.refreshContactListSubs = this.commonService.refreshContactListSubscriber.subscribe(
      data => {
        if (data != undefined && data != null)
          this.getCustomerContactsList();
      });
    this.getCustomerContactsList();
  }

  /**
   * Method to get list of inquries from server.
  */
  public getCustomerContactsList1() {
    this.showLoader = true;
    this.gridData = customerContactsList;
    setTimeout(() => {
      this.showLoader = false;
    }, 1000);
  }

  /**
  * Method to get list of inquries from server.
  */
  public getCustomerContactsList() {
    this.showLoader = true;
    this.getContractlistSubs = this.contactService.getCustomerContactList().subscribe(
      data => {

        if (data != null && data != undefined) {
          this.gridData = JSON.parse(data);
          this.gridData.forEach(element => {
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


  async openContactsDetailOnSelection(selection) {
    $('#opti_HomeTabDeliveryNotesID').click();
    let a: boolean = await this.confirmService.leaveUnsavedDataConfirmation();
    if (a == false) {

      selection.selectedRows =selection.deselectedRows;
      selection.index=selection.selectedRows[0];
      return;

    }

    let currentsideBarInfo: CurrentSidebarInfo = new CurrentSidebarInfo();
    currentsideBarInfo.ComponentName = ComponentName.UpdateContact;
    currentsideBarInfo.ModuleName = ModuleName.CustomerContacts;
    currentsideBarInfo.SideBarStatus = true;
    // Reset Selection.
    let selectedContact = selection.selectedRows[0].dataItem;//this is the correct way to get data from grid on selection.
   // let selectedContact = this.gridData[selection.index];
    currentsideBarInfo.RequesterData = selectedContact;
    localStorage.setItem("SelectedContact", JSON.stringify(selectedContact));
    this.commonService.setCurrentSideBar(currentsideBarInfo);
    // Reset Selection.
    selection.selectedRows = [];
  }


  ngOnDestroy() {
    if (this.getContractlistSubs != undefined)
      this.getContractlistSubs.unsubscribe();
  }


  onFilterChange(checkBox: any, grid: GridComponent) {
    if (checkBox.checked == false) {
      this.clearFilter(grid);
    }
  }

  clearFilter(grid: GridComponent) {
    //grid.filter.filters=[];
  }


  addContactsOnClick(status: boolean) {
    let currentsideBarInfo: CurrentSidebarInfo = new CurrentSidebarInfo();
    currentsideBarInfo.ComponentName = ComponentName.AddContact;
    currentsideBarInfo.ModuleName = ModuleName.CustomerContacts;
    currentsideBarInfo.SideBarStatus = status;
    this.commonService.setCurrentSideBar(currentsideBarInfo);
  }

}
