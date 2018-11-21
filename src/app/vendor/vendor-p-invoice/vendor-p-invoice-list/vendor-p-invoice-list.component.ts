import { Component, OnInit, HostListener } from '@angular/core';
import { UIHelper } from 'src/app/helpers/ui.helpers';
import { Commonservice } from 'src/app/services/commonservice.service';
import { GridComponent } from '@progress/kendo-angular-grid';
import { vendorInvoiceList } from '../../../DemoData/vendor-data';
import { CurrentSidebarInfo } from 'src/app/models/sidebar/current-sidebar-info';
import { ComponentName, ModuleName } from 'src/app/enums/enums';
import { Configuration } from '../../../helpers/Configuration';
import * as $ from "jquery";
import { VendorOIService } from 'src/app/services/vendor/vendor-o-i.service';
import { ISubscription } from 'rxjs/Subscription';
import { DateTimeHelper } from 'src/app/helpers/datetime.helper';

@Component({
  selector: 'app-vendor-p-invoice-list',
  templateUrl: './vendor-p-invoice-list.component.html',
  styleUrls: ['./vendor-p-invoice-list.component.scss']
})
export class VendorPInvoiceListComponent implements OnInit {

  constructor(private commonService: Commonservice, private vendorOIService: VendorOIService) { }
  imgPath = Configuration.imagePath;
  isMobile: boolean;
  isColumnFilter: boolean = false;
  isColumnGroup: boolean = false;
  gridHeight: number;
  showLoader: boolean = false;
  searchRequest: string = '';
  public gridData: any[];
  getOIlistSubs: ISubscription;
  refreshOIlistSubs: ISubscription;

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
    // Apply class on body start
    const element = document.getElementsByTagName("body")[0];
    element.className = "";
    element.classList.add("opti_body-vendor");
    element.classList.add("opti_body-invoice-list");
    element.classList.add("opti_body-main-module");
    // Apply class on body end
    // apply grid height
    this.gridHeight = UIHelper.getMainContentHeight();

    // check mobile device
    this.isMobile = UIHelper.isMobile();

    this.refreshOIlistSubs = this.commonService.refreshVOIListSubscriber.subscribe(
      data => {
        if (data != undefined && data != null)
          this.getOpenInvoiceList();
      });

    this.getOpenInvoiceList();
    //this.getInvoiceList1();
  }

  /**
   * Method to get list of inquries from server.
  */
  public getInvoiceList1() {
    this.showLoader = true;
    this.gridData = vendorInvoiceList;
    setTimeout(() => {
      this.showLoader = false;
    }, 1000);
  }

  onFilterChange(checkBox: any, grid: GridComponent) {
    if (checkBox.checked == false) {
      this.clearFilter(grid);
    }
  }

  clearFilter(grid: GridComponent) {
    //grid.filter.filters=[];
  }

  addInvoiceOnClickAdd() {
    let currentsideBarInfo: CurrentSidebarInfo = new CurrentSidebarInfo();
    currentsideBarInfo.ComponentName = ComponentName.VendorInvoiceAdd;
    currentsideBarInfo.ModuleName = ModuleName.VendorInvoice;
    currentsideBarInfo.SideBarStatus = true;
    this.commonService.setCurrentSideBar(currentsideBarInfo);
  }
 
  openInvoiceDetailOnSelectInvoiceOrder(selection) {
    $('#opti_HomeTabInvoiceID').click();
    let currentsideBarInfo: CurrentSidebarInfo = new CurrentSidebarInfo();
    currentsideBarInfo.ComponentName = ComponentName.VendorInvoiceUpdate;
    currentsideBarInfo.ModuleName = ModuleName.VendorInvoice;
    currentsideBarInfo.SideBarStatus = true;
    let selectedIinquiry = this.gridData[selection.index];
    currentsideBarInfo.RequesterData = selectedIinquiry;
    this.commonService.setCurrentSideBar(currentsideBarInfo);
    console.log(currentsideBarInfo.ComponentName);
  }

  /**
  * Method to get list of inquries from server.
  */
  public getOpenInvoiceList() {
    this.showLoader = true;
    this.getOIlistSubs = this.vendorOIService.getVendorOIList().subscribe(
      OIData => {
        if (OIData != null && OIData != undefined) {
          this.gridData = JSON.parse(OIData);
          this.gridData.forEach(element => {
            element.InvoiceDate = DateTimeHelper.ParseDate(element.InvoiceDate);
            element.PaymentDueDate = DateTimeHelper.ParseDate(element.PaymentDueDate);
          });
          this.showLoader = false;
        }
      },
      error => {
        this.showLoader = false;
      },
      () => {
        this.showLoader = false;
      }
    );
  }

}
