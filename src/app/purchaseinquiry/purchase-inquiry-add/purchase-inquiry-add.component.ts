import { Component, OnInit } from '@angular/core';
import { TempPurchaseInquiryModel } from '../../tempmodels/temppurchase-inquiry';

@Component({
  selector: 'app-purchase-inquiry-add',
  templateUrl: './purchase-inquiry-add.component.html',
  styleUrls: ['./purchase-inquiry-add.component.scss']
})
export class PurchaseInquiryAddComponent implements OnInit {

  purchaseInquiryForUpdate: TempPurchaseInquiryModel;
  constructor() { }

  ngOnInit() {
  }

}
