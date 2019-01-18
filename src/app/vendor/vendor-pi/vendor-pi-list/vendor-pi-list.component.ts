import { Component, OnInit, HostListener } from '@angular/core';
import { UIHelper } from '../../../helpers/ui.helpers';
import { Commonservice } from '../../../services/commonservice.service';
import { GridComponent } from '@progress/kendo-angular-grid';
import { CurrentSidebarInfo } from '../../../models/sidebar/current-sidebar-info';
import { ModuleName, ComponentName } from '../../../enums/enums';
import { vpiList } from '../../../DemoData/vendor-data';
import { ISubscription } from 'rxjs/Subscription';
import { VendorService } from '../../../services/vendor/vendor.service';
import { DateTimeHelper } from '../../../helpers/datetime.helper';
import { ConfirmDialog } from 'src/app/helpers/services/dialog.service';
import * as $ from "jquery";

@Component({
  selector: 'app-vendor-pi-list',
  templateUrl: './vendor-pi-list.component.html',
  styleUrls: ['./vendor-pi-list.component.scss']
})
export class VendorPiListComponent implements OnInit {

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

  constructor(private commonService: Commonservice,private vendorService: VendorService, private confirmService: ConfirmDialog) { }


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
        this.getVpiList();
    });

    this.getVpiList();
  }

 /**
   * Method to get list of inquries from server.
   */
  public getVpiList() {
    
    this.showLoader = true;
    this.getPIlistSubs = this.vendorService.getVendorInquiryList().subscribe(
      inquiryData => {
        if (inquiryData != null && inquiryData != undefined) {
          this.gridData = JSON.parse(inquiryData);

          this.gridData.forEach(element => {
            element.InquiryDate = DateTimeHelper.ParseDate(element.InquiryDate);
          });

          console.log('vpi',this.gridData);
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


  async  openVPIDetailOnSelectVPIOrder(selection) {
    let selectedIinquiry = selection.selectedRows[0].dataItem;//this is the correct way to get data from grid on selection.
   // let selectedIinquiry = this.gridData[selection.index];
    let a: boolean = await this.confirmService.leaveUnsavedDataConfirmation();
    
    if (a == false) {

      selection.selectedRows =selection.deselectedRows;
      selection.index = selection.selectedRows[0].index;
      return;

    }

    $('#opti_HomeTabVPIID').click(); 
    let SelectedInquiry = this.gridData[selection.index];
    let currentsideBarInfo: CurrentSidebarInfo = new CurrentSidebarInfo();
    currentsideBarInfo.ComponentName = ComponentName.VendorPurchaseInqueryDetail;
    currentsideBarInfo.ModuleName = ModuleName.VendorPurchaseInquery;
    currentsideBarInfo.SideBarStatus = true;
    localStorage.setItem("SelectedVPI", JSON.stringify(SelectedInquiry));
    currentsideBarInfo.RequesterData = SelectedInquiry;
    this.commonService.setCurrentSideBar(currentsideBarInfo);
    SelectedInquiry='';
    selection.selectedRows = [];
  }

  ngOnDestroy() {
    if (this.refreshVPIListSubs != undefined)
      this.refreshVPIListSubs.unsubscribe();
    if (this.getPIlistSubs != undefined)
      this.getPIlistSubs.unsubscribe();
   
  }


  
  
  onFilterChange(checkBox:any,grid:GridComponent)
  {
    if(checkBox.checked==false){
      this.clearFilter(grid);
    }
  }


  onGroupChange(checkBox: any, grid: GridComponent){
    if (checkBox.checked == false) {
      this.clearGroup(grid);
    }      
  }

  clearGroup(grid:GridComponent){
    grid.data=this.gridData; 
    if(grid!=null)
    grid.group.splice(0,grid.group.length);  
  }

  clearFilter(grid: GridComponent) {
    grid.data=this.gridData; 
    if(grid.filter!=null)
    grid.filter.filters.splice(0,grid.filter.filters.length);
  }


}
 