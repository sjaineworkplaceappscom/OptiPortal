import { Component, OnInit, HostListener } from '@angular/core';
import { UIHelper } from '../../helpers/ui.helpers';
import { Commonservice } from '../../services/commonservice.service';
import { deliveryNotesList } from '../../demodata/delivery-notes';
import { GridComponent } from '@progress/kendo-angular-grid';

import { CurrentSidebarInfo } from '../../models/sidebar/current-sidebar-info';
import { ModuleName, ComponentName } from '../../enums/enums';
import * as $ from "jquery";
import { DeliveryNotesService } from '../../services/delivery-notes.service';
import { ISubscription } from '../../../../node_modules/rxjs/Subscription';
import { DateTimeHelper } from '../../helpers/datetime.helper';
import { Configuration } from '../../helpers/Configuration';


@Component({
  selector: 'app-delivery-notes-list',
  templateUrl: './delivery-notes-list.component.html',
  styleUrls: ['./delivery-notes-list.component.scss']
})
export class DeliveryNotesListComponent implements OnInit {

  imgPath = Configuration.imagePath;
  pageLimit;
  pagination:boolean;
  isMobile: boolean;
  isColumnFilter: boolean = false;
  isColumnGroup: boolean = false;
  gridHeight: number;
  showLoader: boolean = false;
  searchRequest: string = '';

  getDeliverylistSubs: ISubscription;

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

  

  constructor(private commonService:Commonservice,private deliveryNotesService: DeliveryNotesService) { }

  public gridData: any[];

  ngOnInit() {

    // Apply class on body start
    const element = document.getElementsByTagName("body")[0];
    element.className = "";
    element.classList.add("opti_body-delivery-notes");
    element.classList.add("opti_body-main-module");
    // Apply class on body end
    // apply grid height
    this.gridHeight = UIHelper.getMainContentHeight();
    // check mobile device
    this.isMobile = UIHelper.isMobile();
    this.getPaginationAttributes();

    //call api for delivery note list.
    //this.getDeliveryNotesList1();
    this.getDeliveryNotesList();
  }

  /**
   * Method to get list of inquries from server.
  */
  public getDeliveryNotesList1() {
    this.showLoader = true;
    this.gridData = deliveryNotesList;
    setTimeout(()=>{    
      this.showLoader = false;
    }, 1000);
  }

   /**
  * Method to get list of inquries from server.
  */
 public getDeliveryNotesList() {
  this.showLoader = true; 
  debugger;
  this.getDeliverylistSubs = this.deliveryNotesService.getDeliveryNotesList().subscribe(
    data => {
      if (data != null && data != undefined) {
          this.gridData = JSON.parse(data);
          this.gridData.forEach(element => {
          element.DeliveredDate = DateTimeHelper.ParseDate(element.DeliveredDate);
          element.ShipDate = DateTimeHelper.ParseDate(element.ShipDate);
        });
        this.showLoader = false;
      }
    },
    error => {
      this.showLoader = false;
      alert("Something went wrong");
      console.log("Error: ", error);
      localStorage.clear();
    }
  );
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

  openDeliveryNotesDetailOnSelection(selection){
    $('#opti_HomeTabDeliveryNotesID').click(); 

    let currentsideBarInfo: CurrentSidebarInfo = new CurrentSidebarInfo();
    currentsideBarInfo.ComponentName = ComponentName.DeliveryNotes;
    currentsideBarInfo.ModuleName = ModuleName.DeliveryNotes;
    currentsideBarInfo.SideBarStatus = true;
    this.commonService.setCurrentSideBar(currentsideBarInfo);
    // Reset Selection. 
    let selectedDeliveryNote = this.gridData[selection.index];
    currentsideBarInfo.RequesterData = selectedDeliveryNote;
    localStorage.setItem("SelectedDeliveryNote", JSON.stringify(selectedDeliveryNote));
    this.commonService.setCurrentSideBar(currentsideBarInfo);

    // Reset Selection.
    selection.selectedRows=[]; 
  }

  ngOnDestroy() {
    if (this.getDeliverylistSubs != undefined)
      this.getDeliverylistSubs.unsubscribe();
  }

}