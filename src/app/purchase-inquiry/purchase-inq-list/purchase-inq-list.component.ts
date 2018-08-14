import { Component, OnInit, HostListener, TemplateRef, ViewChild } from '@angular/core';



import { process, State } from '@progress/kendo-data-query';
import {
  GridComponent,
  GridDataResult,
  DataStateChangeEvent
} from '@progress/kendo-angular-grid';
import { UIHelper } from '../../helpers/ui.helpers';
import { opticonstants } from '../../constants';
import { stringify } from '@angular/core/src/util';
import { TempPurchaseInquiryModel } from '../../tempmodels/temppurchase-inquiry';
import { TempPurchaseInquiryItemModel } from '../../tempmodels/temppurchase-inquiry-item';

import { PurchaseInquiryItemModel } from '../../models/purchaserequest/purchase-inquiry-item';
import { PurchaseInquiryModel } from '../../models/purchaserequest/purchase-inquiry';
import { attachment } from '../../DemoData/Attachment';
import { SelectEvent } from '@progress/kendo-angular-layout';
import { PurchaseInquiryService } from '../../services/purchase-enquiry.service';
import { FileInfo } from '@progress/kendo-angular-upload';
import { debug } from 'util';
import { invokeQuery } from '@angular/animations/browser/src/render/shared';

import { Commonservice } from '../../services/commonservice.service';
import { CurrentSidebarInfo } from '../../models/sidebar/current-sidebar-info';
import { ComponentName, ModuleName } from '../../enums/enums';


@Component({
  selector: 'app-purchase-inq-list',
  templateUrl: './purchase-inq-list.component.html',
  styleUrls: ['./purchase-inq-list.component.scss']
})
export class PurchaseInqListComponent implements OnInit {
  isMobile: boolean;
  isColumnFilter: boolean = false;
  isColumnGroup: boolean = false;
  isFixedRightSection: boolean;
  selectedThemeColor: string = opticonstants.DEFAULTTHEMECOLOR;
  gridHeight: number;
  showLoader: boolean = false;

  date: Date;
  //for inquiry grid Data
  public gridData: any[] = [];  


  @ViewChild('optirightfixedsection') optirightfixedsection;
  constructor(private purchaseInquiryService: PurchaseInquiryService, private commonService: Commonservice) {
  }

  // UI Section
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // apply grid height
    this.gridHeight = UIHelper.getMainContentHeight();

    // check mobile device
    this.isMobile = UIHelper.isMobile();
  }
  // End UI Section

  ngOnInit() {
    this.gridHeight = UIHelper.getMainContentHeight();
    
    this.commonService.refreshPIListSubscriber.subscribe(data=>{      
      this.getInquiryList();      
    } );

    //call method to get all inquiry data.
    this.getInquiryList();
  }


  /**
   * Method to get list of inquries from server.
   */
  public getInquiryList() {
    this.showLoader = true;
    this.purchaseInquiryService.getInquiryList().subscribe(
      inquiryData => {
        
        this.gridData = JSON.parse(inquiryData);        
        this.showLoader = false;
      });
  }

  /**
   * 
   * @param status show and hide right content section
  */
  addInqueryOnClickAdd(status: boolean) {

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
  public openInqueryDetailOnSelectInquery(gridItem, selection, status) {
    let currentsideBarInfo: CurrentSidebarInfo = new CurrentSidebarInfo();
    currentsideBarInfo.ComponentName = ComponentName.UpdateInquery;
    currentsideBarInfo.ModuleName = ModuleName.Purchase;    
    currentsideBarInfo.SideBarStatus = true;

    // Selected Item Data
    let selectedIinquiry = this.gridData[selection.index];
    const selectedData = selection.selectedRows[0].dataItem;

    currentsideBarInfo.RequesterData = selectedData;    
    this.commonService.setCurrentSideBar(currentsideBarInfo);
  }
}
