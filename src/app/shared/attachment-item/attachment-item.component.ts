import { Component, OnInit, HostListener } from '@angular/core';
import { UIHelper } from '../../helpers/ui.helpers';
import { PurchaseInquiryStatus, PurchaseInquiryItemStatus } from '../../enums/enums';

@Component({
  selector: 'app-attachment-item',
  templateUrl: './attachment-item.component.html',
  styleUrls: ['./attachment-item.component.scss']
})
export class AttachmentItemComponent implements OnInit {

    /**
     * global variable
    */
   isMobile: boolean;
   gridHeight: number;
   isCancelStatus:boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
      //Apply Grid Height
      this.gridHeight = UIHelper.getMainContentHeight();

      // Check Mobile device
      this.isMobile = UIHelper.isMobile();
  }

  constructor() { }

  ngOnInit() {
    //Apply Grid Height
    this.gridHeight = UIHelper.getMainContentHeight();


   //get status of selected inquiry for disabling or enabling  forms
   let inquiryItemDetail: string= localStorage.getItem("SelectedPurchaseInquiryItem");
   let inquiryItemData: any = JSON.parse(inquiryItemDetail);
   if(inquiryItemData != null || inquiryItemData != undefined) {
   let inquiryStatus = inquiryItemData.Status;
   if(inquiryStatus == PurchaseInquiryItemStatus.Cancelled){
     this.isCancelStatus = true;
   }
    // Check Mobile device
    this.isMobile = UIHelper.isMobile();
  }
  }
}
