import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-purchase-order-home',
  templateUrl: './customer-purchase-order-home.component.html',
  styleUrls: ['./customer-purchase-order-home.component.scss']
})
export class CustomerPurchaseOrderHomeComponent implements OnInit {
  custmerName;
  custmerCompanyName:string='BizChat';
  podate;
  reference;
  public value: Date = new Date(2000, 2, 10);

  public ReferenceType = [
    { text: "Purchase Order", value: 1 },
    { text: "Quotation", value: 2 },
    { text: "Agreement", value: 3 }
  ];
  public selectedItem = [{ text: "Quotation", value: 2 }];

  constructor() { }

  ngOnInit() {
  }

}
