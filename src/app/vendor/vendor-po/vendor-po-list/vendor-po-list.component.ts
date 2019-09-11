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
import { Configuration } from 'src/app/helpers/Configuration';
import { ConfirmDialog } from 'src/app/helpers/services/dialog.service';
import * as $ from "jquery";
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
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

  displayDateformat:string=Configuration.getDisplayDateFormat(true);
  constructor(private commonService: Commonservice,private vendorService: VendorService, private confirmService: ConfirmDialog,private translate: TranslateService) { 
    translate.use(localStorage.getItem('appLanguage'));
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
    });
  }


  ngOnInit() {
    
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

    this.getVpoList();
  }
  


 /**
   * Method to get list of inquries from server.
   */
  public getVpoList() {
    
    this.showLoader = true;
    this.getPOlistSubs = this.vendorService.getVendorPOList().subscribe(
      poData => {
        
        if (poData != null && poData != undefined) {
          this.gridData = JSON.parse(poData);

          this.gridData.forEach(element => {
              element.PODate = DateTimeHelper.ParseDate(element.PODate);
              element.DueDate = DateTimeHelper.ParseDate(element.DueDate);   
              element.PONumber=element.PONumber.toString()        
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



 async openVPIDetailOnSelectVPOrder(selection) {
  $('#opti_HomeTabVPOID').click(); 
    let a: boolean = await this.confirmService.leaveUnsavedDataConfirmation();
     
    if (a == false) {
      selection.selectedRows =selection.deselectedRows;
      selection.index=selection.selectedRows[0].index;
      return;
    }
    let SelectedInquiry = selection.selectedRows[0].dataItem;//this is the correct way to get data from grid on selection.
    //let SelectedInquiry = this.gridData[selection.index];
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
