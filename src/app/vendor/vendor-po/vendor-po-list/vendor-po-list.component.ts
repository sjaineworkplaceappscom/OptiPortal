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
  getPOlistSubs: ISubscription; 
  refreshVPIListSubs: ISubscription;

  constructor(private commonService: Commonservice,private vendorService: VendorService) { }


  ngOnInit() {
    debugger;
    // Apply class on body start
    const element = document.getElementsByTagName("body")[0];
    element.className = "";
    element.classList.add("opti_body-vendor");
    element.classList.add("opti_body-vendor-polist");
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

    // this.refreshVPIListSubs = this.commonService.refreshVPIListSubscriber.subscribe(data => {
    //   if (data != undefined && data != null)
    //     this.getVpoList();
    // });

    this.getVpoList();
  }
  /**
   * Method to get list of inquries from server.
  */
  public getvpoList1() {
    this.showLoader = true;
    this.gridData = vpoList;
    setTimeout(() => {
      this.showLoader = false;
    }, 1000);
  }


 /**
   * Method to get list of inquries from server.
   */
  public getVpoList() {
    debugger;
    this.showLoader = true;
    this.getPOlistSubs = this.vendorService.getVendorPOList().subscribe(
      poData => {
        debugger;
        if (poData != null && poData != undefined) {
          this.gridData = JSON.parse(poData);

          this.gridData.forEach(element => {
            element.InquiryDate = DateTimeHelper.ParseDate(element.InquiryDate);
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

  openVPIDetailOnSelectVPOrder(selection) {
   
    let SelectedInquiry = this.gridData[selection.index];
    let currentsideBarInfo: CurrentSidebarInfo = new CurrentSidebarInfo();
    currentsideBarInfo.ComponentName = ComponentName.VendorPurchaseOrderDetail;
    currentsideBarInfo.ModuleName = ModuleName.VendorPurchaseOrder;
    currentsideBarInfo.SideBarStatus = true;
    localStorage.setItem("SelectedVPO", JSON.stringify(SelectedInquiry));
    currentsideBarInfo.RequesterData = SelectedInquiry;
    this.commonService.setCurrentSideBar(currentsideBarInfo);
    SelectedInquiry='';
    selection.selectedRows = [];
  }

  ngOnDestroy() {
    if (this.getPOlistSubs != undefined)
      this.getPOlistSubs.unsubscribe();
  }


}
