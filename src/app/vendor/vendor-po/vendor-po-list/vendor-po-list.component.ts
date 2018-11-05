import { Component, OnInit, HostListener } from '@angular/core';
import { ComponentName, ModuleName } from '../../../enums/enums';
import { CurrentSidebarInfo } from '../../../models/sidebar/current-sidebar-info';
import { GridComponent } from '@progress/kendo-angular-grid';
import { UIHelper } from '../../../helpers/ui.helpers';
import { Commonservice } from '../../../services/commonservice.service';
import { ISubscription } from 'rxjs/Subscription';
import { vpoList } from '../../../DemoData/vendor-data';
import { VendorService } from '../../../services/vendor/vendor.service';

@Component({
  selector: 'app-vendor-po-list',
  templateUrl: './vendor-po-list.component.html',
  styleUrls: ['./vendor-po-list.component.scss']
})
export class VendorPoListComponent implements OnInit {

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
    element.classList.add("opti_body-vendor-pilist");
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
        this.getvpoList();
    });

    this.getvpoList();
  }
  /**
   * Method to get list of inquries from server.
  */
  public getvpoList() {
    this.showLoader = true;
    this.gridData = vpoList;
    setTimeout(() => {
      this.showLoader = false;
    }, 1000);
  }


 /**
   * Method to get list of inquries from server.
   */
  public getInquiryList() {
    this.showLoader = true;
    // this.getPIlistSubs = this.purchaseInquiryService.getInquiryList().subscribe(
    //   inquiryData => {
    //     if (inquiryData != null && inquiryData != undefined) {
    //       this.gridData = JSON.parse(inquiryData);

    //       this.gridData.forEach(element => {
    //         element.CreatedDate = DateTimeHelper.ParseDate(element.CreatedDate);
    //         element.ValidTillDate = DateTimeHelper.ParseDate(element.ValidTillDate);
    //       });
    //       this.showLoader = false;
    //     }
    //   },
    //   error => {
    //     this.showLoader = false;
    //   },
    //   () => {
    //     this.showLoader = false;
    //   }
    // );
  }

  onFilterChange(checkBox: any, grid: GridComponent) {
    if (checkBox.checked == false) {
      this.clearFilter(grid);
    }
  }

  clearFilter(grid: GridComponent) {
    //grid.filter.filters=[];
  }

  openVPIDetailOnSelectVPIOrder(e) {
    let currentsideBarInfo: CurrentSidebarInfo = new CurrentSidebarInfo();
    currentsideBarInfo.ComponentName = ComponentName.VendorPurchaseOrderDetail;
    currentsideBarInfo.ModuleName = ModuleName.VendorPurchaseOrder;
    currentsideBarInfo.SideBarStatus = true;
    this.commonService.setCurrentSideBar(currentsideBarInfo);
  }


}
