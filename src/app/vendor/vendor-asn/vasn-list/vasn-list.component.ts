import { Component, OnInit, HostListener } from '@angular/core';
import { asnList } from '../../../DemoData/vendor-data';
import { CurrentSidebarInfo } from 'src/app/models/sidebar/current-sidebar-info';
import { ComponentName, ModuleName } from 'src/app/enums/enums';
import { Configuration } from '../../../helpers/Configuration';
import * as $ from "jquery";
import { GridComponent } from '@progress/kendo-angular-grid';
import { UIHelper } from '../../../helpers/ui.helpers';
import { Commonservice } from '../../../services/commonservice.service';
import { ISubscription } from 'rxjs/Subscription';
import { DateTimeHelper } from 'src/app/helpers/datetime.helper';
import { VendorService } from 'src/app/services/vendor/vendor.service';

@Component({
  selector: 'app-vasn-list',
  templateUrl: './vasn-list.component.html',
  styleUrls: ['./vasn-list.component.scss']
})
export class VasnListComponent implements OnInit {

  constructor(private commonService: Commonservice, private vendorService: VendorService) { }
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
    //$('#VASN').addClass('active');
    // Apply class on body start
    const element = document.getElementsByTagName("body")[0];
    element.className = "";
    element.classList.add("opti_body-vendor");
    element.classList.add("opti_body-asn-list");
    element.classList.add("opti_body-main-module");
    // Apply class on body end
    // apply grid height
    this.gridHeight = UIHelper.getMainContentHeight();
    // check mobile device
    this.isMobile = UIHelper.isMobile();
    this.refreshOIlistSubs = this.commonService.refreshVOIListSubscriber.subscribe(
      data => {
        if (data != undefined && data != null)
          this.getVASNList();
      });

    this.getVASNList();
  }

  /**
   * Method to get list of inquries from server.
  */
  public getInvoiceList() {
    this.showLoader = true;
    this.gridData = asnList;
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

  openASNDetailOnSelectASN(selection) {

    $('#opti_HomeTabASNID').click();

    let currentsideBarInfo: CurrentSidebarInfo = new CurrentSidebarInfo();
    currentsideBarInfo.ComponentName = ComponentName.VendorASNUpdate;
    currentsideBarInfo.ModuleName = ModuleName.VendorASN;
    currentsideBarInfo.SideBarStatus = true;
    let SelectedASN = selection.selectedRows[0].dataItem;//this is the correct way to get data from grid on selection.
    //let SelectedASN = this.gridData[selection.index];
    currentsideBarInfo.RequesterData = SelectedASN;
    localStorage.setItem("SelectedVASN", JSON.stringify(SelectedASN));
    this.commonService.setCurrentSideBar(currentsideBarInfo);
  }

  addASNOnClickAdd() {
    let currentsideBarInfo: CurrentSidebarInfo = new CurrentSidebarInfo();
    currentsideBarInfo.ComponentName = ComponentName.VendorASNAdd;
    currentsideBarInfo.ModuleName = ModuleName.VendorASN;
    currentsideBarInfo.SideBarStatus = true;
    this.commonService.setCurrentSideBar(currentsideBarInfo);
  }


  /**
  * Method to get list of inquries from server.
  */
  public getVASNList() {

    this.showLoader = true;
    this.getOIlistSubs = this.vendorService.getVendorASNList().subscribe(
      ASNData => {
        if (ASNData != null && ASNData != undefined) {
          this.gridData = JSON.parse(ASNData);
          this.gridData.forEach(element => {
            element.DeliveryDate = DateTimeHelper.ParseDate(element.DeliveryDate);
            element.ShipmentDate = DateTimeHelper.ParseDate(element.ShipmentDate);
          });
          this.showLoader = false;
        }
      },
      error => {
        this.showLoader = false;
      },
      () => {
        this.showLoader = false;
      });
  }
  // unsubscribe all subscribers.
  ngOnDestroy() {
    if (this.getOIlistSubs != undefined) {
      this.getOIlistSubs.unsubscribe();
    }
    if (this.refreshOIlistSubs != undefined) {
      this.refreshOIlistSubs.unsubscribe();
    }
  }

}
