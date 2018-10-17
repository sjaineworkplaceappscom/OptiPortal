import { Component, OnInit, HostListener, TemplateRef, ViewChild } from '@angular/core';

import {
  GridComponent,
  GridDataResult,
  DataStateChangeEvent
} from '@progress/kendo-angular-grid';

import { UIHelper } from '../../helpers/ui.helpers';
import { opticonstants } from '../../constants';
import { PurchaseInquiryService } from '../../services/purchase-enquiry.service';
import { Commonservice } from '../../services/commonservice.service';
import { CurrentSidebarInfo } from '../../models/sidebar/current-sidebar-info';
import { ComponentName, ModuleName, OperationType } from '../../enums/enums';
import { DatePipe } from '@angular/common'

import { DateTimeHelper } from '../../helpers/datetime.helper';
import { ISubscription } from 'rxjs/Subscription';


import * as $ from "jquery";
import { Router } from '@angular/router';
import { GlobalResource } from 'src/app/helpers/global-resource';
import { ConfirmDialog } from 'src/app/helpers/services/dialog.service';
import { Configuration } from '../../helpers/Configuration';

@Component({
  selector: 'app-purchase-inq-list',
  templateUrl: './purchase-inq-list.component.html',
  styleUrls: ['./purchase-inq-list.component.scss']
})
export class PurchaseInqListComponent implements OnInit {
  displayDateformat:string=Configuration.getDisplayDateFormat(true);
  dateformat:string=Configuration.getDisplayDateFormat();
  imgPath = Configuration.imagePath;

  isMobile: boolean;
  isColumnFilter: boolean = false;
  isColumnGroup: boolean = false;
  isFixedRightSection: boolean;
  selectedThemeColor: string = opticonstants.DEFAULTTHEMECOLOR;
  gridHeight: number;
  showLoader: boolean = false;
  searchRequest: string = '';

  //for inquiry grid Data
  public gridData: any[] = [];
  public systemAdmin: any;
  public loginUserType: number;
  public prevSelectedData:any;

  // Subscriber
  getPIlistSubs: ISubscription;
  refreshPIListSubs: ISubscription;

  // pagination variable
  pageLimit;
  pagination: boolean;

  @ViewChild('optirightfixedsection') optirightfixedsection;
  constructor(private purchaseInquiryService: PurchaseInquiryService, private commonService: Commonservice, public datepipe: DatePipe, private router: Router, private confirmService: ConfirmDialog) {
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

  getPaginationAttributes() {
    // pagination add/remove for desktop and mobile
    let paginationAttributesArray = UIHelper.paginationAttributes();
    this.pageLimit = paginationAttributesArray[0];
    this.pagination = paginationAttributesArray[1];
  }

  ngOnInit() {

    GlobalResource.dirty = false;
    // Apply class on body start
    const element = document.getElementsByTagName("body")[0];
    element.className = "";
    element.classList.add("opti_body-purchase-inquiries");
    element.classList.add("opti_body-main-module");
    // Apply class on body end

    let userDetail: string = localStorage.getItem("LoginUserDetail");
    let userData: any[] = JSON.parse(userDetail);
    this.loginUserType = userData[0].LoginUserType;
    this.gridHeight = UIHelper.getMainContentHeight();
    this.systemAdmin = localStorage.getItem('SystemAdmin');

    this.getPaginationAttributes();


    this.refreshPIListSubs = this.commonService.refreshPIListSubscriber.subscribe(data => {
      if(data!=undefined && data!=null)
      this.getInquiryList();
    });
    // },
    //   error => {
    //     this.showLoader = false;
    //     //alert("Something went wrong");

    //     console.log("Error: ", error)
    //   });

    //call method to get all inquiry data.
    this.getInquiryList();

  }

  ngOnDestroy() {
    if (this.refreshPIListSubs != undefined)
      this.refreshPIListSubs.unsubscribe();

    if (this.getPIlistSubs != undefined)
      this.getPIlistSubs.unsubscribe();
  }

  /**
   * Method to get list of inquries from server.
   */
  public getInquiryList() {
    this.showLoader = true;
    this.getPIlistSubs = this.purchaseInquiryService.getInquiryList().subscribe(
      inquiryData => {
        if (inquiryData != null && inquiryData != undefined) {
          this.gridData = JSON.parse(inquiryData);

          this.gridData.forEach(element => {
            element.CreatedDate = DateTimeHelper.ParseDate(element.CreatedDate);
            element.ValidTillDate = DateTimeHelper.ParseDate(element.ValidTillDate);
          });
          this.showLoader = false;
        }
      },
      error => {
        this.showLoader = false;
        ////alert("Something went wrong");
       // console.log("Error: ", error);
        //localStorage.clear();
        // this.router.navigate(['landing']);

      },
      () => {
        this.showLoader = false;
      }
    );
  }

  /**
   * 
   * @param status show and hide right content section
  */
  addInqueryOnClickAdd(status: boolean) {
    localStorage.setItem("OperationType", OperationType.add.toString());
    let currentsideBarInfo: CurrentSidebarInfo = new CurrentSidebarInfo();
    currentsideBarInfo.ComponentName = ComponentName.AddInquery;
    currentsideBarInfo.ModuleName = ModuleName.Purchase;
    currentsideBarInfo.SideBarStatus = true;
    this.commonService.setCurrentSideBar(currentsideBarInfo);
  }


  /**
   * Method will open the edit item window for selected grid item.
   * @param gridItem 
   * @param selection 
   * @param status  
   */
  public async openInqueryDetailOnSelectInquery(selection) {
    let selectedIinquiry = this.gridData[selection.index];
    console.log('b4 leave dialog');

     let a: boolean = await this.confirmService.leaveUnsavedDataConfirmation();
     console.log('after leave dialog boolean:'+a);
     console.log('selected Inq:'+JSON.stringify(selectedIinquiry));
     
     if (a == false) {
       console.log('a== false condition and return');
       selection.selectedRows =selection.deselectedRows;
       selection.index=selection.selectedRows[0].index;
       return;
 
     }
     console.log('after dialog code complete');
     
     //console.log('selected Inq:'+selectedIinquiry.toString());
    this.openPIDetail(selection,selectedIinquiry);
   
  }

   openPIDetail(selection,selectedInq) {
    console.log('in openPIDetail');
     // Check for dirty confirmation from
    
 
    // Set home tab active on click on any record
    $('#opti_HomeTabPurchaseInquiry').click();

    let currentsideBarInfo: CurrentSidebarInfo = new CurrentSidebarInfo();
    currentsideBarInfo.ComponentName = ComponentName.UpdateInquery;
    currentsideBarInfo.ModuleName = ModuleName.Purchase;
    currentsideBarInfo.SideBarStatus = true;

    // Selected Item Data
    let selectedIinquiry =  selectedInq //this.gridData[selection.index];
    //const selectedData = selection.selectedRows[0].dataItem;

    localStorage.setItem("PurchaseinqueryId", selectedIinquiry.PurchaseInquiryId);
    localStorage.setItem("SelectedPurchaseInquery", JSON.stringify(selectedIinquiry));
    localStorage.setItem("OperationType", OperationType.Update.toString());
    currentsideBarInfo.RequesterData = selectedIinquiry;
    this.commonService.setCurrentSideBar(currentsideBarInfo);
    console.log('b4 reset selection');
    // Reset Selection.
    selection.selectedRows = [];
    console.log('after reset selection');
  }

  onFilterChange(checkBox: any, grid: GridComponent) {
    if (checkBox.checked == false) {
      this.clearFilter(grid);
    }
  }

  clearFilter(grid: GridComponent) {
    //grid.filter.filters=[];
    //this.gridData=process(this.gridData,null);
  }
}
