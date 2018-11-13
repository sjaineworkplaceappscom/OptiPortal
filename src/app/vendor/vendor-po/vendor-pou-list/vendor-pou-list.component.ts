import { Component, OnInit, HostListener } from '@angular/core';
import { ComponentName, ModuleName } from '../../../enums/enums';
import { CurrentSidebarInfo } from '../../../models/sidebar/current-sidebar-info';
import { GridComponent } from '@progress/kendo-angular-grid';
import { UIHelper } from '../../../helpers/ui.helpers';
import { Commonservice } from '../../../services/commonservice.service';
import { ISubscription } from 'rxjs/Subscription';
import { vpoList } from '../../../DemoData/vendor-data';
import { VendorService } from '../../../services/vendor/vendor.service';
import { DateTimeHelper } from 'src/app/helpers/datetime.helper';

@Component({
  selector: 'app-vendor-pou-list',
  templateUrl: './vendor-pou-list.component.html',
  styleUrls: ['./vendor-pou-list.component.scss']
})
export class VendorPouListComponent implements OnInit {

  isMobile: boolean;
  isColumnFilter: boolean = false;
  isColumnGroup: boolean = false;
  gridHeight: number;
  showLoader: boolean = false;
  searchRequest: string = '';

  // UI Section
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // apply grid height
    this.gridHeight = UIHelper.getMainContentHeight();

    // check mobile device
    this.isMobile = UIHelper.isMobile();
  }
  // End UI Section

  public loginUserType: number;
  public gridData: any[];
  public systemAdmin: any;
  // Subscriber
  getPIlistSubs: ISubscription;
  refreshVPIListSubs: ISubscription;

  constructor(private commonService: Commonservice,private vendorService: VendorService) { }


  ngOnInit() {
    // Apply class on body start
    const element = document.getElementsByTagName("body")[0];
    element.className = "";
    element.classList.add("opti_body-vendor");
    element.classList.add("opti_body-vendor-poulist");
    element.classList.add("opti_body-main-module");
    // Apply class on body end
    // apply grid height
    this.gridHeight = UIHelper.getMainContentHeight();
    // check mobile device
    this.isMobile = UIHelper.isMobile();

    let userDetail: string = localStorage.getItem("LoginUserDetail");
    let userData: any[] = JSON.parse(userDetail);
    this.loginUserType = userData[0].LoginUserType;
    this.gridHeight = UIHelper.getMainContentHeight();
    this.systemAdmin = localStorage.getItem('SystemAdmin');

    this.refreshVPIListSubs = this.commonService.refreshVPIListSubscriber.subscribe(data => {
      if (data != undefined && data != null)
        this.getvpouList();
    });

    this.getvpouList();
  }
  /**
   * Method to get list of inquries from server.
  */
  public getvpouList1() {
    this.showLoader = true;
    this.gridData = vpoList;
    setTimeout(() => {
      this.showLoader = false;
    }, 1000);
  }

  /**
   * Method to get list of inquries from server.
   */
  public getvpouList() {
    
    //this.showLoader = true;
    this.getPIlistSubs = this.vendorService.getVendorPOUpdateList().subscribe(
      orderData => {
        if (orderData != null && orderData != undefined) {
          this.gridData = JSON.parse(orderData);

          this.gridData.forEach(element => {
            element.PODate = DateTimeHelper.ParseDate(element.PODate);
            element.DueDate = DateTimeHelper.ParseDate(element.DueDate);
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

  onFilterChange(checkBox: any, grid: GridComponent) {
    if (checkBox.checked == false) {
      this.clearFilter(grid);
    }
  }

  clearFilter(grid: GridComponent) {
    //grid.filter.filters=[];
  }

  openVPOUDetailOnSelectVPIOrder(selection) {
    let SelectedOrder = this.gridData[selection.index];
    let currentsideBarInfo: CurrentSidebarInfo = new CurrentSidebarInfo();
    currentsideBarInfo.ComponentName = ComponentName.VendorPurchaseOrderDetail;
    currentsideBarInfo.ModuleName = ModuleName.VendorPurchaseOrder;
    currentsideBarInfo.SideBarStatus = true;
    localStorage.setItem("SelectedVPOUpdated", JSON.stringify(SelectedOrder));
    currentsideBarInfo.RequesterData = SelectedOrder;
    this.commonService.setCurrentSideBar(currentsideBarInfo);
    SelectedOrder='';
    selection.selectedRows = [];
  }


}
