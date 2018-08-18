import { Component, OnInit, Input, HostListener } from '@angular/core';
import { TempPurchaseInquiryItemModel } from '../../tempmodels/temppurchase-inquiry-item';
import { TempPurchaseInquiryModel } from '../../tempmodels/temppurchase-inquiry';
import { CurrentSidebarInfo } from '../../models/sidebar/current-sidebar-info';
import { PurchaseInquiryService } from '../../services/purchase-enquiry.service';
import { UIHelper } from '../../helpers/ui.helpers';
import { DateTimeHelper } from '../../helpers/datetime.helper';

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
  purchaseItemsModel: TempPurchaseInquiryItemModel = new TempPurchaseInquiryItemModel();
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

    this.selectedInquiryId = 'E4F1A5AB-AEFE-4F34-847F-6252FD0C3403';
    this.getInquiryItemsData(this.selectedInquiryId);
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

  // AddPurchaseInquiryItem(){
  //   this.showItemsGrid();
  // }

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
  selectedInquiryId: string = '';
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
      
      this.purchaseItemsModel = JSON.parse(JSON.stringify(selectedData));
      this.requestDate = DateTimeHelper.ParseDate(this.purchaseItemsModel.RequestDate);
      this.requiredDate = DateTimeHelper.ParseDate(this.purchaseItemsModel.RequiredDate);
      this.selectedItemId = this.purchaseItemsModel.PurchaseInquiryItemId;
      
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
              this.gridItemsData.forEach(element => {
                element.RequiredDate=DateTimeHelper.ParseDate(element.RequiredDate);
                element.RequestDate=DateTimeHelper.ParseDate(element.RequestDate);            
              });
              console.log("grid item data" + JSON.stringify(this.gridItemsData) );
          },
          error => {
            this.showLoader=false;
              alert("Something went wrong");  
              console.log("Error: " + error);          
          });
          () =>{
            this.showLoader = false;
          }

  }

    /**
     * When click on save 
     */
    public OnSave() {debugger;

      this.AddPurchaseInquiryItem();
      this.addItem = false;
      this.itemGrid = true;
    }

    /**
     * when click on save and new
     */
    public OnSaveAndNew() {
      this.AddPurchaseInquiryItem();
      this.addItem = true;
      this.itemGrid = false;
    }

     /**
     * AddPurchaseInquiryItem
     */
    public AddPurchaseInquiryItem() {
      this.purchaseItemsModel.PurchaseInquiryId = 'E4F1A5AB-AEFE-4F34-847F-6252FD0C3403';
     this.purchaseInquiryService.AddPurchaseInquiryItem(this.purchaseItemsModel).subscribe(
         data => {
           
           console.log(data)
         },
         error => 
        {
           this.showLoader=false;
           alert('Something went wrong');
           console.log("Error: " + error);
        }
     );
    }

}
