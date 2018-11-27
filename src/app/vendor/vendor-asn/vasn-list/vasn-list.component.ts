import { Component, OnInit, HostListener } from '@angular/core';
import { asnList } from '../../../DemoData/vendor-data';
import { CurrentSidebarInfo } from 'src/app/models/sidebar/current-sidebar-info';
import { ComponentName, ModuleName } from 'src/app/enums/enums';
import { Configuration } from '../../../helpers/Configuration';
import * as $ from "jquery";
import { GridComponent } from '@progress/kendo-angular-grid';
import { UIHelper } from '../../../helpers/ui.helpers';
import { Commonservice } from '../../../services/commonservice.service';

@Component({
  selector: 'app-vasn-list',
  templateUrl: './vasn-list.component.html',
  styleUrls: ['./vasn-list.component.scss']
})
export class VasnListComponent implements OnInit {

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
    this.getInvoiceList();
  }

  /**
   * Method to get list of inquries from server.
  */
  public getInvoiceList() {
    this.showLoader = true;
    this.gridData = asnList;
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

  openASNDetailOnSelectASN(e){
    let currentsideBarInfo: CurrentSidebarInfo=new CurrentSidebarInfo();
    currentsideBarInfo.ComponentName=ComponentName.VendorASNUpdate;
    currentsideBarInfo.ModuleName=ModuleName.VendorASN;
    currentsideBarInfo.SideBarStatus=true;    
    this.commonService.setCurrentSideBar(currentsideBarInfo);
  }

  addASNOnClickAdd(){
    let currentsideBarInfo: CurrentSidebarInfo=new CurrentSidebarInfo();
    currentsideBarInfo.ComponentName=ComponentName.VendorASNAdd;
    currentsideBarInfo.ModuleName=ModuleName.VendorASN;
    currentsideBarInfo.SideBarStatus=true;    
    this.commonService.setCurrentSideBar(currentsideBarInfo);
  }

}
