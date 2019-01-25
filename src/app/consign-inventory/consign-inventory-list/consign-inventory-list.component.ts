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

@Component({
  selector: 'app-consign-inventory-list',
  templateUrl: './consign-inventory-list.component.html',
  styleUrls: ['./consign-inventory-list.component.scss']
})
export class ConsignInventoryListComponent implements OnInit {

  pageSizeNumber:number = 5;
  public listItems: Array<string> = [ "5", "10", "15" ];
  public selectedValue: string = "5";

  isMobile: boolean;
  isColumnFilter: boolean = false;
  isColumnGroup: boolean = false;
  gridHeight: number;
  showLoader: boolean = false;
  searchRequest: string = '';
  getSaleslistSubs: ISubscription;
  incr(num){
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

  
  
  constructor(private commonService:Commonservice,private consignedInventoryService: ConsignedInventoryService) { }

  public gridData: any[];

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
    // this.showLoader = true;
    // this.gridData = consignList;
    // setTimeout(()=>{    
    //   this.showLoader = false;
    // }, 1000);


      
    this.showLoader = true;
    this.getSaleslistSubs = this.consignedInventoryService.getConsignedInventoryMasterList().subscribe(
      data => {debugger;
       // console.log("orderlist:"+data);
        if (data != null && data != undefined) {
          this.gridData = JSON.parse(data);
          this.gridData.forEach(element => {
          //  element.OrderDate = DateTimeHelper.ParseDate(element.OrderDate);
          //  element.DeliveryDate = DateTimeHelper.ParseDate(element.DeliveryDate);
          //  element.DocumentDate = DateTimeHelper.ParseDate(element.DocumentDate);
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


   /**
   * Method to get list of inquries from server.
  */
 public getConsignedItemChildList(index: number): any {
  // this.showLoader = true;
  // this.gridData = consignList;
  // setTimeout(()=>{    
  //   this.showLoader = false;
  // }, 1000); 
 // this.showLoader = true;
  this.getSaleslistSubs = this.consignedInventoryService.getConsignedInventoryChildList().subscribe(
    (data: any) => {
     // console.log("orderlist:"+data);
      if (data != null && data != undefined) {
        this.gridData[index].ItemsDetail = JSON.parse(data);
        this.gridData[index].ItemsDetail.forEach(element => {
        //  element.OrderDate = DateTimeHelper.ParseDate(element.OrderDate);
        //  element.DeliveryDate = DateTimeHelper.ParseDate(element.DeliveryDate);
        //  element.DocumentDate = DateTimeHelper.ParseDate(element.DocumentDate);
        });
       // this.showLoader = false;
      }
      return data;
    },
    error => {
    //  this.showLoader = false;
      //alert("Something went wrong");
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

  openSBDetail(e){
    let currentsideBarInfo: CurrentSidebarInfo=new CurrentSidebarInfo();
    currentsideBarInfo.ComponentName=ComponentName.CISBDetail;
    currentsideBarInfo.ModuleName=ModuleName.ConsignInventory;
    currentsideBarInfo.SideBarStatus=true;        
    this.commonService.setCurrentSideBar(currentsideBarInfo);
  }
 

  openDetail(e){
    let currentsideBarInfo: CurrentSidebarInfo=new CurrentSidebarInfo();
    currentsideBarInfo.ComponentName=ComponentName.CIDetail;
    currentsideBarInfo.ModuleName=ModuleName.ConsignInventory;
    currentsideBarInfo.SideBarStatus=true;        
    this.commonService.setCurrentSideBar(currentsideBarInfo);
  }


  openDetailGrid(e:any){
     
    let data =  this.getConsignedItemChildList(e.index); //JSON.parse();            
    console.log("Mdata",data)
    if(data!=null && data!=undefined){    
      this.gridData[e.index].ItemsDetail= JSON.parse(data);
    }
    
  }

  getItems():any{
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
    if (this.getSaleslistSubs != undefined)
      this.getSaleslistSubs.unsubscribe();
  }

}
