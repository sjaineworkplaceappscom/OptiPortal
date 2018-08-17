import { Component, OnInit, Input, HostListener } from '@angular/core';
import { TempPurchaseInquiryItemModel } from '../../tempmodels/temppurchase-inquiry-item';
import { TempPurchaseInquiryModel } from '../../tempmodels/temppurchase-inquiry';
import { CurrentSidebarInfo } from '../../models/sidebar/current-sidebar-info';
import { PurchaseInquiryService } from '../../services/purchase-enquiry.service';
import { UIHelper } from '../../helpers/ui.helpers';

@Component({
  selector: 'app-purchase-inq-item-add',
  templateUrl: './purchase-inq-item-add.component.html',
  styleUrls: ['./purchase-inq-item-add.component.scss']
})
export class PurchaseInqItemAddComponent implements OnInit {

  /**
   * global variable
  */
  isMobile: boolean;
  gridHeight: number;

  /**
   * Item tab Variable
  */
  addItem:boolean = false;
  itemGrid:boolean = true;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // Apply Grid Height
    this.gridHeight = UIHelper.getMainContentHeight();
    // Check Mobile device
    this.isMobile = UIHelper.isMobile();
  }
  
  // store item grid data.
  gridItemsData = [];

  public minValidDate: Date = new Date();
  purchseInqItemAdd = new TempPurchaseInquiryItemModel();
  showLoader:boolean=false;
  
  @Input() currentSidebarInfo: CurrentSidebarInfo;

  constructor(private purchaseInquiryService: PurchaseInquiryService) { }

  ngOnInit() {
    /**
     * Apply Grid Height
    */
    this.gridHeight = UIHelper.getMainContentHeight();
        
    /**
      * Check Mobile device
    */
    this.isMobile = UIHelper.isMobile();
  }

  showItemsGrid(){
    this.addItem = false;
    this.itemGrid = true;
  }

  showItemForm(){
    this.addItem = true;
    this.itemGrid = false;
  }

  showAddItemSection(){
    this.showItemForm();
  }

  AddPurchaseInquiryItem(){
    this.showItemsGrid();
  }

  addItemtagain(){
    this.showItemsGrid();
  }

  closeItemForm(){
    this.showItemsGrid();
  }

  //purchaseItemsModelForUpdate: TempPurchaseInquiryItemModel = new TempPurchaseInquiryItemModel();
  requestDate: Date;
  requiredDate: Date;
  selectedItemId: string = '';
  /**
   * Method will open the edit item window for selected grid item.
   * @param gridItemsData 
   * @param selection 
   * @param status 
   */
  public onItemGridDataSelection(selection, status) {
    
      //fatch and parse row value.
      //let selectedItem = gridItemsData.data.data[selection.index];
      //const selectedData = selection.selectedRows[0].dataItem;
      const selectedData = this.gridItemsData[0];
      
      this.purchseInqItemAdd = JSON.parse(JSON.stringify(selectedData));
      this.requestDate = new Date(this.purchseInqItemAdd.RequestDate);
      this.requiredDate = new Date(this.purchseInqItemAdd.RequiredDate);
      this.selectedItemId = this.purchseInqItemAdd.PurchaseInquiryItemId;
      
  }


   /**
     * Method to get list of inquries from server.
     */
    public getInquiryItemsData(inquiryId: string ){
      console.log("in getInquiryItemList");
      this.showLoader=true;  
      this.purchaseInquiryService.getInquiryItemList(inquiryId).subscribe(
          inquiryItemData=>{        
              this.gridItemsData = JSON.parse(inquiryItemData);
              console.log("grid item data" + JSON.stringify(this.gridItemsData) );
          },
          error => {
              alert("Something went wrong");            
          });
          () =>{
            this.showLoader = false;
          }

  }

}
