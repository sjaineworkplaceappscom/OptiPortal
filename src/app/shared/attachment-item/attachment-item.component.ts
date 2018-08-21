import { Component, OnInit, HostListener } from '@angular/core';
import { UIHelper } from '../../helpers/ui.helpers';
import { PurchaseInquiryStatus } from '../../enums/enums';

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
    let inquiryDetail: string= localStorage.getItem("SelectedPurchaseInquery");
    let inquiryData: any = JSON.parse(inquiryDetail);
    let inquiryStatus = inquiryData.Status;
    if(inquiryStatus == PurchaseInquiryStatus.Canceled){
      this.isCancelStatus = true;
    }
    // Check Mobile device
    this.isMobile = UIHelper.isMobile();
  }

}
