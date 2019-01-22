import { Component, OnInit, HostListener } from '@angular/core';
import { UIHelper } from '../../helpers/ui.helpers';
import { Commonservice } from '../../services/commonservice.service';
import { GridComponent } from '@progress/kendo-angular-grid';
import { consignList } from '../../DemoData/consign';
import { CurrentSidebarInfo } from '../../models/sidebar/current-sidebar-info';
import { ComponentName, ModuleName } from '../../enums/enums';

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

  

  constructor(private commonService:Commonservice) { }

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

    
    this.getConsignList();
  }

  /**
   * Method to get list of inquries from server.
  */
  public getConsignList() {
    this.showLoader = true;
    this.gridData = consignList;
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

  openConsignInventoryDetail(e){
    let currentsideBarInfo: CurrentSidebarInfo=new CurrentSidebarInfo();
    currentsideBarInfo.ComponentName=ComponentName.CIDetail;
    currentsideBarInfo.ModuleName=ModuleName.ConsignInventory;
    currentsideBarInfo.SideBarStatus=true;    
    this.commonService.setCurrentSideBar(currentsideBarInfo);
    alert(e)
  }
 

  openDetailGrid(e:any){
    this.gridData[e.index].ItemsDetail=this.getItems();           
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


}
