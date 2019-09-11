import { Component, OnInit, HostListener } from '@angular/core';
import { UIHelper } from '../../helpers/ui.helpers';
import { Commonservice } from '../../services/commonservice.service';
import { openInvoicesList } from '../../demodata/open-invoices';
import { GridComponent } from '@progress/kendo-angular-grid';

import { CurrentSidebarInfo } from '../../models/sidebar/current-sidebar-info';
import { ModuleName, ComponentName } from '../../enums/enums';
import * as $ from "jquery";
import { Configuration } from '../../helpers/Configuration';
import { OpenInvoiceService } from '../../services/open-invoice.service';
import { ISubscription } from 'rxjs/Subscription';
import { DateTimeHelper } from '../../helpers/datetime.helper';

@Component({
  selector: 'app-open-invoices-list',
  templateUrl: './open-invoices-list.component.html',
  styleUrls: ['./open-invoices-list.component.scss']
})
export class OpenInvoicesListComponent implements OnInit {
  displayDateformat:string=Configuration.getDisplayDateFormat(true);
  imgPath = Configuration.imagePath;

  pageLimit;
  pagination:boolean;

  isMobile: boolean;
  isColumnFilter: boolean = false;
  isColumnGroup: boolean = false;
  gridHeight: number;
  showLoader: boolean = false;
  searchRequest: string = '';

  getOpenInvoicelistSubs: ISubscription;

  getPaginationAttributes(){
    // pagination add/remove for desktop and mobile
    let paginationAttributesArray = UIHelper.paginationAttributes();
    this.pageLimit = paginationAttributesArray[0];
    this.pagination = paginationAttributesArray[1];
  }
  
  // UI Section
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // apply grid height
    this.gridHeight = UIHelper.getMainContentHeight();

    // check mobile device
    this.isMobile = UIHelper.isMobile();

    this.getPaginationAttributes();
  }
  // End UI Section

  

  constructor(private commonService: Commonservice, private openInvoiceService: OpenInvoiceService) { }

  public gridData: any[];

  ngOnInit() {

    // Apply class on body start
    const element = document.getElementsByTagName("body")[0];
    element.className = "";
    element.classList.add("opti_body-open-invoives");
    element.classList.add("opti_body-main-module");
    // Apply class on body end

    // apply grid height
    this.gridHeight = UIHelper.getMainContentHeight();

    // check mobile device
    this.isMobile = UIHelper.isMobile();

    this.getPaginationAttributes();

   // this.getOpenInvoicesList1(); 
    this.getOpenInvoicesList();
  }

  /**
   * Method to get list of inquries from server.
  */
  public getOpenInvoicesList1() {
    this.showLoader = true;
    this.gridData = openInvoicesList;
    setTimeout(()=>{    
      this.showLoader = false;
    }, 1000);
  }




  openInvoiceDetailOnSelection(selection){
    $('#opti_OpenInvoicesID').click(); 

    let currentsideBarInfo: CurrentSidebarInfo = new CurrentSidebarInfo();
    currentsideBarInfo.ComponentName = ComponentName.OpenInvoices;
    currentsideBarInfo.ModuleName = ModuleName.OpenInvoices;
    currentsideBarInfo.SideBarStatus = true;
    
    // Reset Selection.
    let selectedOpenInvoice = selection.selectedRows[0].dataItem;//this is the correct way to get data from grid on selection.
    // let selectedOpenInvoice = this.gridData[selection.index];
     currentsideBarInfo.RequesterData = selectedOpenInvoice;
     localStorage.setItem("SelectedOpenInvoice", JSON.stringify(selectedOpenInvoice));
     this.commonService.setCurrentSideBar(currentsideBarInfo);
     //this.commonService.setCurrentSideBar(currentsideBarInfo);
     selection.selectedRows=[];  
  }

   /**
  * Method to get list of inquries from server.
  */
 public getOpenInvoicesList() {
  this.showLoader = true; 
  
  this.getOpenInvoicelistSubs = this.openInvoiceService.getOpenInvoiceList().subscribe(
    data => {
      if (data != null && data != undefined) {        
          this.gridData = JSON.parse(data);          
          this.gridData.forEach(element => {
          element.InvoiceDate = DateTimeHelper.ParseDate(element.InvoiceDate);
          element.DueDate = DateTimeHelper.ParseDate(element.DueDate);
        });
        this.showLoader = false;
      }
    },
    error => {
      this.showLoader = false;
      //alert("Something went wrong");
      console.log("Error: ", error);
      let lang = localStorage.getItem('appLanguage');      
      localStorage.clear();
      localStorage.setItem('appLanguage',lang);  
    }
  );
}

ngOnDestroy() {
  if (this.getOpenInvoicelistSubs != undefined)
    this.getOpenInvoicelistSubs.unsubscribe();
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
