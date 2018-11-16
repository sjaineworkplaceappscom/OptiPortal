import { Component, OnInit, HostListener } from '@angular/core';
import { UIHelper } from 'src/app/helpers/ui.helpers';
import { Commonservice } from 'src/app/services/commonservice.service';
import { GridComponent } from '@progress/kendo-angular-grid';
import { vendorInvoiceList } from '../../../DemoData/vendor-data';
import { CurrentSidebarInfo } from 'src/app/models/sidebar/current-sidebar-info';
import { ComponentName, ModuleName } from 'src/app/enums/enums';
import { Configuration } from '../../../helpers/Configuration';

@Component({
  selector: 'app-vendor-p-invoice-list',
  templateUrl: './vendor-p-invoice-list.component.html',
  styleUrls: ['./vendor-p-invoice-list.component.scss']
})
export class VendorPInvoiceListComponent implements OnInit {

  constructor(private commonService:Commonservice) { }
  imgPath = Configuration.imagePath;
  isMobile: boolean;
  isColumnFilter: boolean = false;
  isColumnGroup: boolean = false;
  gridHeight: number;
  showLoader: boolean = false;
  searchRequest: string = '';
  public gridData: any[];
  
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
    this.getInvoiceList();
  }

  /**
   * Method to get list of inquries from server.
  */
  public getInvoiceList() {
    this.showLoader = true;
    this.gridData = vendorInvoiceList;
    setTimeout(()=>{    
      this.showLoader = false;
    }, 1000);
  }

  onFilterChange(checkBox:any,grid:GridComponent) {
    if(checkBox.checked==false){
      this.clearFilter(grid);
    }
  }

  clearFilter(grid:GridComponent){      
    //grid.filter.filters=[];
  }

  openSalesOrderDetailOnSelectSalesOrder(e){
    let currentsideBarInfo: CurrentSidebarInfo=new CurrentSidebarInfo();
    currentsideBarInfo.ComponentName=ComponentName.VendorPaymentDetail;
    currentsideBarInfo.ModuleName=ModuleName.VendorPayments;
    currentsideBarInfo.SideBarStatus=true;    
    this.commonService.setCurrentSideBar(currentsideBarInfo);
  }

}
