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
import * as $ from "jquery";
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
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

  constructor(private commonService: Commonservice,private vendorService: VendorService,private translate: TranslateService) {
    translate.use(localStorage.getItem('appLanguage'));
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
    });
   }


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

  
  ngOnDestroy() {
    if (this.getPIlistSubs != undefined)
      this.getPIlistSubs.unsubscribe();
    if (this.refreshVPIListSubs != undefined)
      this.refreshVPIListSubs.unsubscribe();
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
    
    this.showLoader = true;
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


  openVPOUDetailOnSelectVPIOrder(selection) {
    $('#opti_HomeTabVPOID').click(); 
    let SelectedOrder = selection.selectedRows[0].dataItem;//this is the correct way to get data from grid on selection.
   // let SelectedOrder = this.gridData[selection.index];
    let currentsideBarInfo: CurrentSidebarInfo = new CurrentSidebarInfo();
    currentsideBarInfo.ComponentName = ComponentName.VendorPurchaseOrderDetail;
    currentsideBarInfo.ModuleName = ModuleName.VendorPurchaseOrder;
    currentsideBarInfo.SideBarStatus = true;
    localStorage.setItem("SelectedVPO", JSON.stringify(SelectedOrder));
    currentsideBarInfo.RequesterData = SelectedOrder;
    this.commonService.setCurrentSideBar(currentsideBarInfo);
    SelectedOrder='';
    selection.selectedRows = [];
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
