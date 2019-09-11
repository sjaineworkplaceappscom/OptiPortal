import { Component, OnInit, HostListener } from '@angular/core';
import { UIHelper } from '../../helpers/ui.helpers';
import { Commonservice } from '../../services/commonservice.service';
import { advanceShipmentNotesList } from '../../demodata/delivery-notes';
import { GridComponent } from '@progress/kendo-angular-grid';

import { CurrentSidebarInfo } from '../../models/sidebar/current-sidebar-info';
import { ModuleName, ComponentName } from '../../enums/enums';
import * as $ from "jquery";
import { AdvanceShipmentNoteService } from '../../services/advance-shipment-note.service';
import { DateTimeHelper } from '../../helpers/datetime.helper';
import { ISubscription } from 'rxjs/Subscription';
import { Configuration } from '../../helpers/Configuration';
import { GlobalResource } from '../../helpers/global-resource';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-advance-shipment-notes-list',
  templateUrl: './advance-shipment-notes-list.component.html',
  styleUrls: ['./advance-shipment-notes-list.component.scss']
})
export class AdvanceShipmentNotesListComponent implements OnInit {

  imgPath = Configuration.imagePath;

  pageLimit;
  pagination: boolean;
  isMobile: boolean;
  isColumnFilter: boolean = false;
  isColumnGroup: boolean = false;
  gridHeight: number;
  showLoader: boolean = false;
  searchRequest: string = '';

  getASNlistSubs: ISubscription;

  getPaginationAttributes() {
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

  constructor(private commonService: Commonservice, private advanceShipmentNoteService: AdvanceShipmentNoteService,private translate: TranslateService) { 
    translate.use(localStorage.getItem('appLanguage'));
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
    });
  }

  public gridData: any[];

  ngOnInit() {

    GlobalResource.NavigateFromAdvanseShipmentNotes = true;

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
    this.getASNList();
    //this.getAdvanceShipmentNotesList();
  }

  /**
   * Method to get list of inquries from server.
  */
  public getAdvanceShipmentNotesList() {
    this.showLoader = true;
    this.gridData = advanceShipmentNotesList;
    setTimeout(() => {
      this.showLoader = false;
    }, 1000);
  }

  /**
   * Method to get list of inquries from server.
   */
  public getASNList() {
    this.showLoader = true;
    this.getASNlistSubs = this.advanceShipmentNoteService.getAdvanceShipmentNotesList().subscribe(
      data => {
        if (data != null && data != undefined) { 
          this.gridData = JSON.parse(data);
          this.gridData.forEach(element => {
            element.ShipDate = DateTimeHelper.ParseDate(element.ShipDate);
            element.ExpectedDeliveryDate = DateTimeHelper.ParseDate(element.ExpectedDeliveryDate);
          });
          this.showLoader = false;
        }
      },
      error => {
        this.showLoader = false;
        alert("Something went wrong");
        console.log("Error: ", error);
        let lang = localStorage.getItem('appLanguage');      
        localStorage.clear();
        localStorage.setItem('appLanguage',lang);  
      }
    );
  }


  openAdvanceShipmentNotesDetailOnSelection(selection) {
    $('#opti_HomeTabDeliveryNotesID').click();

    let currentsideBarInfo: CurrentSidebarInfo = new CurrentSidebarInfo();
    currentsideBarInfo.ComponentName = ComponentName.DeliveryNotes;
    currentsideBarInfo.ModuleName = ModuleName.DeliveryNotes;
    currentsideBarInfo.SideBarStatus = true;
    this.commonService.setCurrentSideBar(currentsideBarInfo);
    //Reset Selection.
    let selectedDN = selection.selectedRows[0].dataItem;//this is the correct way to get data from grid on selection.
    //let selectedDN = this.gridData[selection.index];
    currentsideBarInfo.RequesterData = selectedDN;
    //we will put in delivery note local storage for ASN because it will show same record of DN in respect to ASN.
    localStorage.setItem("SelectedDeliveryNote", JSON.stringify(selectedDN));
    this.commonService.setCurrentSideBar(currentsideBarInfo);
    selection.selectedRows=[];  
  }

  ngOnDestroy() {
    if (this.getASNlistSubs != undefined)
      this.getASNlistSubs.unsubscribe();
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
