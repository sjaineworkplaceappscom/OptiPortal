import { Component, OnInit, Input } from '@angular/core';
import { PurchaseInquiryService } from '../../services/purchase-enquiry.service';

@Component({
  selector: 'app-purchase-inq-item-list',
  templateUrl: './purchase-inq-item-list.component.html',
  styleUrls: ['./purchase-inq-item-list.component.scss']
})
export class PurchaseInqItemListComponent implements OnInit {
  showLoader:boolean=false;
  @Input() id:string;
   //for item grid Data
   public gridItemsData: any[] = [];
  constructor(private purchaseInquiryService: PurchaseInquiryService) { }

  ngOnInit() {
    this.getInquiryItemList(this.id);
  }

  /**
     * Method to get list of inquries from server.
     */
    public getInquiryItemList(inquiryId: string ){
      console.log("in getInquiryItemList");
      
      this.showLoader=true;  
      this.purchaseInquiryService.getInquiryItemList(inquiryId).subscribe(
          inquiryItemData=>{  
            debugger      
              this.gridItemsData = JSON.parse(inquiryItemData);
              console.log("grid item data" + JSON.stringify(this.gridItemsData) );
              this.showLoader=false;
          },
          error => {
              this.showLoader = false;
              // handle error.
          });

  }

}
