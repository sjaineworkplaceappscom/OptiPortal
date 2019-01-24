import { Component, OnInit, HostListener } from '@angular/core';
import { UIHelper } from '../../helpers/ui.helpers';
import { Commonservice } from '../../services/commonservice.service';
import { GridComponent } from '@progress/kendo-angular-grid';
import { consignList } from '../../DemoData/consign';
import { ConsignedInventoryService } from 'src/app/services/consigned-inventory.service';
import { DateTimeHelper } from 'src/app/helpers/datetime.helper';
import { ISubscription } from 'rxjs/Subscription';
import { data } from 'src/app/DemoData/Data';
import { ComponentName, ModuleName } from 'src/app/enums/enums';
import { CurrentSidebarInfo } from 'src/app/models/sidebar/current-sidebar-info';
import { SalesOrderService } from 'src/app/services/sales-order.service';
import { SalesOrderDetail } from 'src/app/tempmodels/sales-order-detail';
import { Observable } from 'rxjs';
import { DeliveryNotesService } from 'src/app/services/delivery-notes.service';
import { DeliveryNoteHeaderModel } from 'src/app/tempmodels/delivery-note-header-model';

@Component({
  selector: 'app-consign-inventory-list',
  templateUrl: './consign-inventory-list.component.html',
  styleUrls: ['./consign-inventory-list.component.scss']
})
export class ConsignInventoryListComponent implements OnInit {


  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();


  // 
  pageSizeNumber: number = 5;
  isMobile: boolean;
  isColumnFilter: boolean = false;
  isColumnGroup: boolean = false;
  gridHeight: number;
  showLoader: boolean = false;
  showLoader1: boolean = false;
  showLoaderForChild: boolean = false;
  searchRequest: string = '';
  sidebarData: any = null;

  getConsignedInventoryMasterlistSubs: ISubscription;
  getConsignedInventoryChildlistSubs: ISubscription;
  public getSalsesubs: ISubscription;
  public getDeliverysubs: ISubscription;

  salesOrderDetailModel: SalesOrderDetail = new SalesOrderDetail();
  deliveryNoteHeaderModel: DeliveryNoteHeaderModel = new DeliveryNoteHeaderModel();
  incr(num) {
    this.pageSizeNumber = num;
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



  constructor(private commonService: Commonservice, private consignedInventoryService: ConsignedInventoryService, private salseOrderService: SalesOrderService,private deliveryNotesService: DeliveryNotesService) {

    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];

  }

  public gridData: any[];
  public showLoaderChild: boolean[]
  ngOnInit() {
    // Apply class on body start
    const element = document.getElementsByTagName("body")[0];
    element.className = "";
    element.classList.add("opti_body-sales-order");
    element.classList.add("opti_body-main-module");
    // Apply class on body end

    // apply grid height
    this.gridHeight = UIHelper.getMainContentHeight();

    // check mobile device
    this.isMobile = UIHelper.isMobile();

    this.getConsignedItemMasterList();
  }

  /**
   * Method to get list of inquries from server.
  */
  public getConsignedItemMasterList() {

    this.showLoader = true;
    this.getConsignedInventoryMasterlistSubs = this.consignedInventoryService.getConsignedInventoryMasterList().subscribe(
      data => {
        if (data != null && data != undefined) {
          this.gridData = JSON.parse(data);
          this.showLoader = false;
        }
      },
      error => {
        this.showLoader = false;
        console.log("Error: ", error);
        localStorage.clear();
      }
    );
  }


  /**
  * Method to get list of inquries from server.
 */
  public getConsignedItemChildList(item:string,warehouse:string,bin :string, type:string,index:number): any {

    this.showLoader1 = true;
    this.getConsignedInventoryChildlistSubs = this.consignedInventoryService.getConsignedInventoryChildList(item,warehouse,bin,type).subscribe(
      (data: any) => {
        if (data != null && data != undefined) {
          this.gridData[index].ItemsDetail = JSON.parse(data);
          this.gridData[index].ItemsDetail.forEach(element => {
            element.TransactionDate = DateTimeHelper.ParseDate(element.TransactionDate);
          });
          //this.showLoaderForChild[index] = false;
          this.showLoader1 = false;
        }
        return data;
      },
      error => {
        //this.showLoaderForChild[index] = false;
        this.showLoader1 = false;
        //alert("Something went wrong");
        console.log("Error: ", error);
        localStorage.clear();
      }
    );
  }

  // on filter change
  public onFilterChange(checkBox: any, grid: GridComponent) {
    if (checkBox.checked == false) {
      this.clearFilter(grid);
    }
  } 

  clearFilter(grid: GridComponent) {
    grid.filter.filters = [];
  }

  // Open Serial And Batch detail sidebar
  public openSBDetail(e) {
    debugger;
    let currentsideBarInfo: CurrentSidebarInfo = new CurrentSidebarInfo();
    currentsideBarInfo.ComponentName = ComponentName.CISBDetail;
    currentsideBarInfo.ModuleName = ModuleName.ConsignInventory;
    currentsideBarInfo.SideBarStatus = true;
    this.commonService.setCurrentSideBar(currentsideBarInfo);
  }

  public  openDetail(parent, index) {
    debugger;
    let item = parent.ItemsDetail[index];
    if (item != null) {
       let currentsideBarInfo: CurrentSidebarInfo = new CurrentSidebarInfo();
       this.SetComponentTypeAndData(item.TransactionType, currentsideBarInfo, item);
    }
  }

  // Set CurrentSidebar component by transactionType
public  SetComponentTypeAndData(transactionType: number, currentsideBarInfo: CurrentSidebarInfo, requesterData){
    
    switch (transactionType) {
       case 1: {
        currentsideBarInfo.ComponentName = ComponentName.DeliveryNotes;
        currentsideBarInfo.ModuleName = ModuleName.DeliveryNotes;
        this.getSalesOrder(requesterData,currentsideBarInfo);
        currentsideBarInfo.SideBarStatus = true;
        this.commonService.setCurrentSideBar(currentsideBarInfo);
        break;
      }
      case 2: {
        currentsideBarInfo.ComponentName = ComponentName.SalesOrderDetail;
        currentsideBarInfo.ModuleName = ModuleName.SalesOrder;
        this.getSalesOrder(requesterData,currentsideBarInfo);
        currentsideBarInfo.SideBarStatus = true;
        this.commonService.setCurrentSideBar(currentsideBarInfo);
        break;
      }
      case 3: {
        currentsideBarInfo.ComponentName = ComponentName.DeliveryNotes;
        currentsideBarInfo.ModuleName = ModuleName.DeliveryNotes;
        this.getDeliveryNotesDetail(requesterData,currentsideBarInfo);
        currentsideBarInfo.SideBarStatus = true;
        this.commonService.setCurrentSideBar(currentsideBarInfo);
        break;
      }
      case 4: {
        currentsideBarInfo.ComponentName = ComponentName.DeliveryNotes;
        currentsideBarInfo.ModuleName = ModuleName.DeliveryNotes;
        this.getDeliveryNotesDetail(requesterData,currentsideBarInfo);
        currentsideBarInfo.SideBarStatus = true;
        this.commonService.setCurrentSideBar(currentsideBarInfo);
        break;
      }
    }
  }

  private  getSalesOrder(requesterData: any,currentsideBarInfo:CurrentSidebarInfo) {
    let dataitem: any = null;
    
    this.getSalsesubs =   this.salseOrderService.getSalesOrderDetail(requesterData.ItemOptiId, 1).subscribe(
      data => {
        if (data != null) {
          let dataArray: any[] = JSON.parse(data);
          this.salesOrderDetailModel = dataArray[0];
          this.salesOrderDetailModel.DocumentDate = DateTimeHelper.ParseDate(this.salesOrderDetailModel.DocumentDate);
          this.salesOrderDetailModel.DeliveryDate = DateTimeHelper.ParseDate(this.salesOrderDetailModel.DeliveryDate);
          localStorage.setItem("SelectedSalesOrder", JSON.stringify(this.salesOrderDetailModel));
          dataitem = data;
          currentsideBarInfo.RequesterData = this.salesOrderDetailModel;//dataitem;
          currentsideBarInfo.SideBarStatus = true;
          this.commonService.setCurrentSideBar(currentsideBarInfo);
          
          //this.sidebarData=data;
        }
      }, error => {
        this.showLoader = false;
        console.log("Error: ", error);
      }, () => { }
    );
    
    return data;
  }

   /** 
     * call api for Sales quotation detail .
     */
    getDeliveryNotesDetail(requesterData: any,currentsideBarInfo:CurrentSidebarInfo) {
      this.showLoader = true;
      this.getDeliverysubs = this.deliveryNotesService.getDeliveryNotesDetail(requesterData.ItemOptiId,1).subscribe(
        data => {
          this.showLoader = false;
          let dataArray: any[] = JSON.parse(data);
          this.deliveryNoteHeaderModel = dataArray[0];
          this.deliveryNoteHeaderModel.DeliveredDate = DateTimeHelper.ParseDate(this.deliveryNoteHeaderModel.DeliveredDate);
          this.deliveryNoteHeaderModel.ShipDate = DateTimeHelper.ParseDate(this.deliveryNoteHeaderModel.ShipDate);
          currentsideBarInfo.RequesterData = this.deliveryNoteHeaderModel;//dataitem;
          currentsideBarInfo.SideBarStatus = true;
          this.commonService.setCurrentSideBar(currentsideBarInfo);
          localStorage.setItem("SelectedDeliveryNote", JSON.stringify(this.deliveryNoteHeaderModel));
           
        }, error => {
          this.showLoader = false;
          //alert("Something went wrong");
          console.log("Error: ", error)
        }, () => { }
      );
    }



  openDetailGrid(e: any) {
    
    debugger; 
    console.log("detail grid:",e.dataItem);
    let data = this.getConsignedItemChildList(e.dataItem.Item,e.dataItem.WareHouse,e.dataItem.Bin,1,e.index);//type is 1 for child grid.
    if (data != null && data != undefined) {
      this.gridData[e.index].ItemsDetail = JSON.parse(data);
    }
  }

  getItems(): any {
    return [{
      "Item": "childX1",
      "ItemDescription": "Headphone",
      "SerialAndBatch": "Batch",
      "WareHouse": "Main WH",
      "Bin": "1",
      "ToWH": "",
      "ToBin": "",
      "TransectionDate": "8/1/2019",
      "TransactionType": "Delivery",
      "QunatityTransacted": "10",
      "TransactionDocumentNumber": "Delivery # 12",
    },
    {
      "Item": "childX11",
      "ItemDescription": "Headphone",
      "SerialAndBatch": "Batch",
      "WareHouse": "Main WH",
      "Bin": "1",
      "ToWH": "",
      "ToBin": "",
      "TransectionDate": "8/1/2019",
      "TransactionType": "Delivery",
      "QunatityTransacted": "10",
      "TransactionDocumentNumber": "Delivery # 12",
    }]
  }

  ngOnDestroy() {
    if (this.getConsignedInventoryChildlistSubs != undefined)
      this.getConsignedInventoryChildlistSubs.unsubscribe();

    if (this.getConsignedInventoryMasterlistSubs != undefined)
      this.getConsignedInventoryMasterlistSubs.unsubscribe();
  }

}
