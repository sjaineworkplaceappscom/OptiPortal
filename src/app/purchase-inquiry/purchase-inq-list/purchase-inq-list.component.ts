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
import { ComponentName, ModuleName } from '../../enums/enums';
import { DatePipe } from '@angular/common'
import { Configuration } from '../../../assets/configuration';

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
  searchRequest:string='';
  //date: Date;
  public dateFormat: string = Configuration.dateFormat;

  //for inquiry grid Data
  public gridData: any[] = [];


  @ViewChild('optirightfixedsection') optirightfixedsection;
  constructor(private purchaseInquiryService: PurchaseInquiryService, private commonService: Commonservice, public datepipe: DatePipe) {
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

    this.commonService.refreshPIListSubscriber.subscribe(data => {
      this.getInquiryList();
    });

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
        if (inquiryData != null && inquiryData != undefined) {
          this.gridData = JSON.parse(inquiryData);

          this.gridData.forEach(element => {
            element.CreatedDate = new Date(this.datepipe.transform(element.CreatedDate, Configuration.dateFormat));
            element.ValidTillDate = new Date(this.datepipe.transform(element.ValidTillDate, Configuration.dateFormat));
          });

          this.showLoader = false;
        }
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
