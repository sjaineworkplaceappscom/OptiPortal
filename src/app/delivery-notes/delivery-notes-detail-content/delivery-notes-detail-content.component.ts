import { Component, OnInit, HostListener } from '@angular/core';
import { UIHelper } from '../../helpers/ui.helpers';
import { deliveryNotesContent } from '../../demodata/delivery-notes';
import { GridComponent } from '@progress/kendo-angular-grid';

import { ISubscription } from 'rxjs/Subscription';
import { DeliveryNoteListModel } from '../../tempmodels/delivery-note-list-model';
import { DeliveryNotesService } from '../../services/delivery-notes.service';
import { DateTimeHelper } from '../../helpers/datetime.helper';
import { Configuration } from '../../helpers/Configuration';
import { ConsignedInventoryService } from 'src/app/services/consigned-inventory.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-delivery-notes-detail-content',
  templateUrl: './delivery-notes-detail-content.component.html',
  styleUrls: ['./delivery-notes-detail-content.component.scss']
})
export class DeliveryNotesDetailContentComponent implements OnInit {

  imgPath = Configuration.imagePath;
  pageLimit;
  pagination: boolean;
  popupTitle: string = "Serial/Batch detail"
  isMobile: boolean;
  isColumnFilter: boolean = false;
  isColumnGroup: boolean = false;
  gridHeight: number;

  showLoader: boolean = false;
  public gridData: any[];
  public getDetailsubs: ISubscription;
  deliveryNoteListModel: DeliveryNoteListModel = new DeliveryNoteListModel();
  public srBatchGridData: any[];
  public dialogOpened = false;

  constructor(private deliveryNotesService: DeliveryNotesService, private consignedService: ConsignedInventoryService ,private translate: TranslateService) { 
    
 translate.use(localStorage.getItem('appLanguage'));
 translate.onLangChange.subscribe((event: LangChangeEvent) => {
 });
  }

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
    // apply grid height
    this.gridHeight = UIHelper.getMainContentHeight();
    // check mobile device
    this.isMobile = UIHelper.isMobile();

    this.deliveryNoteListModel = JSON.parse(localStorage.getItem('SelectedDeliveryNote'));
    if (this.deliveryNoteListModel != null && this.deliveryNoteListModel != undefined) {
      let deliveryId: number = this.deliveryNoteListModel.DeliveryId;
      this.getDeliveryNotesContentList(deliveryId);
    }
  }

  /**
   * Method to get list of inquries from server.
  */
  public getDeliveryNotesContentList1() {
    this.showLoader = true;
    this.gridData = deliveryNotesContent;
    setTimeout(() => {
      this.showLoader = false;
    }, 1000);
  }

  onFilterChange(checkBox: any, grid: GridComponent) {
    if (checkBox.checked == false) {
      this.clearFilter(grid);
    }
  }

  public close(component) {
    this[component + 'Opened'] = false;
  }

  public open(component) {
    this[component + 'Opened'] = true;
  }

  public action(status) {
    console.log(`Dialog result: ${status}`);
    this.dialogOpened = false;
  }

  openSerialBatchDetailPopup(e: any, rowIndex: any, request: any) {
    let req: any = {
      Bin: "",
      Item: request.ItemCode,
      ItemType: request.ItemType,
      Type: 3,
      WareHouse: request.WhsCode,
      DocEntry:request.DocEntry,
      LineNum:request.LineNumber
    }
    ///let request = collection[rowIndex];    
    this.consignedService.getConsignedInventoryChildList(req, 2 + "").subscribe(
      data => {
        console.log("SBData", data);
        this.srBatchGridData =JSON.parse(data);
        this.dialogOpened = true;
      }
    )

  }

  clearFilter(grid: GridComponent) {
    //grid.filter.filters=[];
  }

  /** 
  * call api for Sales quotation detail.
  */
  getDeliveryNotesContentList(id: number) {
    this.showLoader = true;

    this.getDetailsubs = this.deliveryNotesService.getDeliveryNotesDetail(id, 2).subscribe(
      data => {

        this.showLoader = false;
        if (data != null && data != undefined) {
          this.gridData = JSON.parse(data);
          this.gridData.forEach(element => {
            //  element.DeliveryDate = DateTimeHelper.ParseDate(element.DeliveryDate);
          });
          this.showLoader = false;
        }

      }, error => {
        this.showLoader = false;
        //alert("Something went wrong");
        console.log("Error: ", error)
      }, () => { }
    );
  }

  ngOnDestroy() {
    if (this.getDetailsubs != undefined)
      this.getDetailsubs.unsubscribe();
  }
}
