import { Component, OnInit, Input } from '@angular/core';
import { TempPurchaseInquiryItemModel } from '../../tempmodels/temppurchase-inquiry-item';
import { TempPurchaseInquiryModel } from '../../tempmodels/temppurchase-inquiry';
import { CurrentSidebarInfo } from '../../models/sidebar/current-sidebar-info';
import { PurchaseInquiryService } from '../../services/purchase-enquiry.service';

@Component({
  selector: 'app-purchase-inq-item-add',
  templateUrl: './purchase-inq-item-add.component.html',
  styleUrls: ['./purchase-inq-item-add.component.scss']
})
export class PurchaseInqItemAddComponent implements OnInit {
  gridItemsData = [];
  purchseInqItemModel = new TempPurchaseInquiryItemModel();
  showLoader:boolean=false;
  @Input() currentSidebarInfo: CurrentSidebarInfo;
  
  constructor(private purchaseInquiryService: PurchaseInquiryService) { }

  ngOnInit() {
    
  }

  addItemtagain(){
  }

    //close the item form.
    closeItemForm() {
      
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
      
      this.purchseInqItemModel = JSON.parse(JSON.stringify(selectedData));
      this.requestDate = new Date(this.purchseInqItemModel.RequestDate);
      this.requiredDate = new Date(this.purchseInqItemModel.RequiredDate);
      this.selectedItemId = this.purchseInqItemModel.PurchaseInquiryItemId;
      
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
