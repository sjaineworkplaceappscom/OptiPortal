import { Component, OnInit, HostListener } from '@angular/core';
import { UIHelper } from 'src/app/helpers/ui.helpers';
import { DeliveryNotesService } from 'src/app/services/delivery-notes.service';
import { Commonservice } from 'src/app/services/commonservice.service';
import { ISubscription } from 'rxjs/Subscription';
import { DeliveryNoteListModel } from 'src/app/tempmodels/delivery-note-list-model';
import { GlobalResource } from 'src/app/helpers/global-resource';
import { DateTimeHelper } from 'src/app/helpers/datetime.helper';
import { Configuration } from 'src/app/helpers/Configuration';
import { CurrentSidebarInfo } from 'src/app/models/sidebar/current-sidebar-info';
import { ComponentName, ModuleName } from 'src/app/enums/enums';
import * as $ from "jquery";

@Component({
  selector: 'app-sales-order-detail-delivery-notes',
  templateUrl: './sales-order-detail-delivery-notes.component.html',
  styleUrls: ['./sales-order-detail-delivery-notes.component.scss']
})
export class SalesOrderDetailDeliveryNotesComponent implements OnInit {

  gridData = [];
  imgPath = Configuration.imagePath;
  isMobile: boolean;
  isColumnFilterDelivery: boolean = false;
  gridHeight: number;

  // UI Section
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // apply grid height
    this.gridHeight = UIHelper.getMainContentHeight();

    // check mobile device
    this.isMobile = UIHelper.isMobile();
  }
  // End UI Section
  getDeliverylistSubs: ISubscription;
  deliveryNoteListModel: DeliveryNoteListModel = new DeliveryNoteListModel();

  pageLimit;
  pagination:boolean;
  showLoader: boolean = false;
  constructor(private commonService:Commonservice,private deliveryNotesService: DeliveryNotesService) { }

  ngOnInit() {

    GlobalResource.NavigateFromAdvanseShipmentNotes = false;

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
    
    this.getDeliveryNotesList();
  }
  getPaginationAttributes(){
    // pagination add/remove for desktop and mobile
    let paginationAttributesArray = UIHelper.paginationAttributes();
    this.pageLimit = paginationAttributesArray[0];
    this.pagination = paginationAttributesArray[1];
  }

   /**
  * Method to get list of inquries from server.
  */
 public getDeliveryNotesList() {
  this.showLoader = true; 
  
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
      //alert("Something went wrong");
      console.log("Error: ", error);
      localStorage.clear();
    }
  );
}


openDeliveryNotesDetailOnSelection(selection){ 
  $('#opti_HomeTabDeliveryNotesID').click(); 
  console.log('soddn selection');

  let currentsideBarInfo: CurrentSidebarInfo = new CurrentSidebarInfo();
  currentsideBarInfo.ComponentName = ComponentName.DeliveryNotes;
  currentsideBarInfo.ModuleName = ModuleName.DeliveryNotes;
  currentsideBarInfo.SideBarStatus = true;
  // Reset Selection.
  let selectedDeliveryNote = selection.selectedRows[0].dataItem;//this is the correct way to get data from grid on selection.
//  let selectedDeliveryNote = this.gridData[selection.index];
  currentsideBarInfo.RequesterData = selectedDeliveryNote;
  localStorage.setItem("SelectedDeliveryNote", JSON.stringify(selectedDeliveryNote));
  this.commonService.setCurrentSideBar(currentsideBarInfo);

  // Reset Selection.
  selection.selectedRows=[]; 
}

}
