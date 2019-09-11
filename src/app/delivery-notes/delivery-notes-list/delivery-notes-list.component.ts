import { Component, OnInit, HostListener } from '@angular/core';
import { UIHelper } from '../../helpers/ui.helpers';
import { Commonservice } from '../../services/commonservice.service';
import { deliveryNotesList } from '../../demodata/delivery-notes';
import { GridComponent } from '@progress/kendo-angular-grid';

import { CurrentSidebarInfo } from '../../models/sidebar/current-sidebar-info';
import { ModuleName, ComponentName } from '../../enums/enums';
import * as $ from "jquery";
import { DeliveryNotesService } from '../../services/delivery-notes.service';
import { ISubscription } from 'rxjs/Subscription';
import { DateTimeHelper } from '../../helpers/datetime.helper';
import { DeliveryNoteListModel } from '../../tempmodels/delivery-note-list-model';
import { Configuration } from '../../helpers/Configuration';
import { GlobalResource } from '../../helpers/global-resource';
import { Router } from '@angular/router';
import { SalesOrder } from 'src/app/tempmodels/sales-order';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';


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
  deliveryNoteListModel: DeliveryNoteListModel = new DeliveryNoteListModel();
  

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
    if(this.selectedItem=='salesorder'){ //when user opens it form sales order
      this.gridHeight = UIHelper.getMainContentHeight()-67;
    }else{
      this.gridHeight = UIHelper.getMainContentHeight();
    }
    // check mobile device
    this.isMobile = UIHelper.isMobile();
    this.getPaginationAttributes();
  }
  // End UI Section

  

  constructor(private router: Router,private commonService:Commonservice,private deliveryNotesService: DeliveryNotesService,private translate: TranslateService) {
    translate.use(localStorage.getItem('appLanguage'));
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
    });
   }
  salesOrderModel: SalesOrder = new SalesOrder();
  public gridData: any[];
  selectedItem;

  ngOnInit() {

    GlobalResource.NavigateFromAdvanseShipmentNotes = false;

    // Apply class on body start

    let partsOfUrl = this.router.url.split('/');
    this.selectedItem = partsOfUrl[partsOfUrl.length - 1];
    console.log(this.selectedItem);

    if(this.selectedItem!='salesorder'){
      const element = document.getElementsByTagName("body")[0];
      element.className = "";
      element.classList.add("opti_body-delivery-notes");
      element.classList.add("opti_body-main-module");
    }

    
    // Apply class on body end
    // apply grid height
    if(this.selectedItem=='salesorder'){
      this.gridHeight = UIHelper.getMainContentHeight()-67;
    }else{
      this.gridHeight = UIHelper.getMainContentHeight();
    }
    debugger
    // check mobile device
    this.isMobile = UIHelper.isMobile();
    this.getPaginationAttributes();
    //call api for delivery note list.
    //this.getDeliveryNotesList1();
    
    if(this.selectedItem=='salesorder' || this.selectedItem=='consigninventory'){
      this.salesOrderModel = JSON.parse(localStorage.getItem('SelectedSalesOrder'))
    let orderNumber: string = this.salesOrderModel.OrderNumber.toString();
    let orderId: number = this.salesOrderModel.OrderId;
      this.getDeliveryNotesListBySO(orderNumber,orderId);
    }else{
      this.getDeliveryNotesList();
    }
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
      let lang = localStorage.getItem('appLanguage');      
      localStorage.clear();
      localStorage.setItem('appLanguage',lang);  
    }
  );
}

 /**
  * Method to get list of inquries from server.
  */
 public getDeliveryNotesListBySO(soNumber:string,soId: number) {
  this.showLoader = true; 
  
  this.getDeliverylistSubs = this.deliveryNotesService.getDeliveryNotesListBySO(soNumber,soId).subscribe(
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
      let lang = localStorage.getItem('appLanguage');      
        localStorage.clear();
        localStorage.setItem('appLanguage',lang);  
    }
  );
}



  openDeliveryNotesDetailOnSelection(selection){ 

    if(this.selectedItem=='salesorder'){
     // alert('hello');$('#VASN').addClass('active');
     $('#VASN').addClass('active');
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
      $('#opti_vpoID').removeClass('active');
      this.commonService.setSelectedItem('deliverynotes');
    this.router.navigate(['../deliverynotes']);
      // Reset Selection.
      selection.selectedRows=[]; 
    }else{
      $('#opti_HomeTabDeliveryNotesID').click(); 

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

  ngOnDestroy() {
    if (this.getDeliverylistSubs != undefined)
      this.getDeliverylistSubs.unsubscribe();
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