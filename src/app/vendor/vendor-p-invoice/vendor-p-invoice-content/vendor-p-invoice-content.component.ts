import { Component, OnInit, HostListener } from '@angular/core';
import { invoiceContent } from '../../../DemoData/vendor-data';
import { GridComponent } from '@progress/kendo-angular-grid';
import { UIHelper } from '../../../helpers/ui.helpers';
import { Configuration } from '../../../helpers/Configuration';

@Component({
  selector: 'app-vendor-p-invoice-content',
  templateUrl: './vendor-p-invoice-content.component.html',
  styleUrls: ['./vendor-p-invoice-content.component.scss']
})
export class VendorPInvoiceContentComponent implements OnInit {

  // Add form property
  Line:number;
  PORef;
  Item;
  Quantity:number;
  UnitPrice;
  UOM;
  TotalPrice:number;
  TaxCode;
  ShipToAddress;
  BillToAddress;
  Shipment;
  DeliveryDate;
  // end form property 

  showGrid:boolean=true;
  addContent:boolean = false;
  editContent:boolean = false;

  imgPath = Configuration.imagePath;
  pageLimit;
  pagination:boolean;

  isMobile: boolean;
  isColumnFilterContentGrid: boolean = false;
  isColumnGroup: boolean = false;
  gridHeight: number;
  showLoader: boolean = false;

  public gridData: any[];

  constructor() { }

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

    this.getContentList();
  }

   /**
   * Method to get list of inquries from server.
  */
  public getContentList(){
    this.showLoader = true;
    this.gridData = invoiceContent;
    setTimeout(()=>{    
      this.showLoader = false;
    }, 1000);
  }

  onFilterChange(checkBox:any,grid:GridComponent){
    if(checkBox.checked==false){
      this.clearFilter(grid);
    }
  }

  clearFilter(grid:GridComponent){      
    //grid.filter.filters=[];
  }

  back() {
    this.addContent = false;
    this.editContent = false;
    this.showGrid = true;
  }

  showContentForm(){
    this.showGrid = false;
    this.editContent = false;
    this.addContent = true;
  }

  edit(e){
    this.showGrid = false;
    this.addContent = false;
    this.editContent = true;
  }


}
