import { Component, OnInit, HostListener } from '@angular/core';
import { Commonservice } from '../../../services/commonservice.service';
import { ContactService } from '../../../services/contact.service';
import { ISubscription } from '../../../../../node_modules/rxjs/Subscription';
import { UIHelper } from '../../../helpers/ui.helpers';
import { Configuration } from '../../../helpers/Configuration';
import { ConfirmDialog } from '../../../helpers/services/dialog.service';
import { customerContactsList } from '../../../demodata/customer-contacts';
import { CurrentSidebarInfo } from '../../../models/sidebar/current-sidebar-info';
import { ComponentName, ModuleName } from '../../../enums/enums';
import { GridComponent } from '../../../../../node_modules/@progress/kendo-angular-grid';


@Component({
  selector: 'app-vcontact-list',
  templateUrl: './vcontact-list.component.html',
  styleUrls: ['./vcontact-list.component.scss']
})
export class VcontactListComponent implements OnInit {



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
    console.log('list on init');
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
    console.log('get cust list');
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

      selection.selectedRows = selection.deselectedRows;
      selection.index = selection.selectedRows[0];
      return;

    }

    let currentsideBarInfo: CurrentSidebarInfo = new CurrentSidebarInfo();
    currentsideBarInfo.ComponentName = ComponentName.VendorContactUpdate;
    currentsideBarInfo.ModuleName = ModuleName.VendorContact;
    currentsideBarInfo.SideBarStatus = true;
    // Reset Selection.

    let selectedContact = this.gridData[selection.index];
    currentsideBarInfo.RequesterData = selectedContact;
    localStorage.setItem("SelectedContact", JSON.stringify(selectedContact));
    this.commonService.setCurrentSideBar(currentsideBarInfo);
    // Reset Selection.
    selection.selectedRows = [];
  }


  ngOnDestroy() {
    if (this.getContractlistSubs != undefined) {
      this.getContractlistSubs.unsubscribe();
    }
    if (this.addSub != undefined) {
      this.addSub.unsubscribe();
    }
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
    currentsideBarInfo.ComponentName = ComponentName.VendorContactAdd;
    currentsideBarInfo.ModuleName = ModuleName.VendorContact;
    currentsideBarInfo.SideBarStatus = status;
    this.commonService.setCurrentSideBar(currentsideBarInfo);
  }

}
