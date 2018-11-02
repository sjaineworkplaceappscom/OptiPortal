import { Component, OnInit, HostListener } from '@angular/core';
import { UIHelper } from '../../../helpers/ui.helpers';
import { Commonservice } from '../../../services/commonservice.service';
import { GridComponent } from '@progress/kendo-angular-grid';
import { CurrentSidebarInfo } from '../../../models/sidebar/current-sidebar-info';
import { ModuleName, ComponentName } from '../../../enums/enums';
import { vpiList } from '../../../DemoData/vendor-data';

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

  

  constructor(private commonService:Commonservice) { }

  public gridData: any[];

  ngOnInit() {

    // Apply class on body start
    const element = document.getElementsByTagName("body")[0];
    element.className = "";
    element.classList.add("opti_body-vendor-pilist");
    element.classList.add("opti_body-main-module");
    // Apply class on body end

    // apply grid height
    this.gridHeight = UIHelper.getMainContentHeight();

    // check mobile device
    this.isMobile = UIHelper.isMobile();

    
    this.vpiList();
  }

  /**
   * Method to get list of inquries from server.
  */
  public vpiList() {
    this.showLoader = true;
    this.gridData = vpiList;
    setTimeout(()=>{    
      this.showLoader = false;
    }, 1000);
  }



  onFilterChange(checkBox:any,grid:GridComponent)
  {
    if(checkBox.checked==false){
      this.clearFilter(grid);
    }
  }

  clearFilter(grid:GridComponent){      
    //grid.filter.filters=[];
  }

  openVPIDetailOnSelectVPIOrder(e){
    let currentsideBarInfo: CurrentSidebarInfo=new CurrentSidebarInfo();
    currentsideBarInfo.ComponentName=ComponentName.VendorPurchaseInqueryDetail;
    currentsideBarInfo.ModuleName=ModuleName.VendorPurchaseInquery;
    currentsideBarInfo.SideBarStatus=true;    
    this.commonService.setCurrentSideBar(currentsideBarInfo);
  }

}
