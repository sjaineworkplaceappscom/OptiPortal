import { Component, OnInit, HostListener } from '@angular/core';
import { GridComponent } from '@progress/kendo-angular-grid';
import { UIHelper } from '../../../helpers/ui.helpers';
import { Configuration } from '../../../helpers/Configuration';
import { invoiceContent } from '../../../DemoData/vendor-data';

@Component({
  selector: 'app-vasn-content',
  templateUrl: './vasn-content.component.html',
  styleUrls: ['./vasn-content.component.scss']
})
export class VasnContentComponent implements OnInit {

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


  Line; 
  Item; 
  Quantity;
  UnitPrice; 
  UOM;
  TotalPrice;
  TaxCode;
  ShipToAddress;
  BillToAddress; 
  DeliveryDate;

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
  
    // this.getContentList(id);
    this.getContentList1()
  }

   /**
   * Method to get list of inquries from server.
  */
  public getContentList1(){
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
  
  openContentDetailOnSelection(selection) {
    this.showGrid = false;
    this.addContent = false;
    this.editContent = true;
    // Reset Selection.
    selection.selectedRows=[];  
  }

}
