import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vendor-po-header',
  templateUrl: './vendor-po-header.component.html',
  styleUrls: ['./vendor-po-header.component.scss']
})
export class VendorPoHeaderComponent implements OnInit {

  POID = "V0001";
  Vendor = "Samsung";
  PODate = "01/07/2018";
  DUEDate = "01/07/2018";
  Status = "New";
  Ack = "Yes";
  Buyer = "Shashank Jain";
  Price = 4000;
  Tax = 10;
  Freight = 10;
  Discount = 400;
  TotalPrice = 3600;

  constructor() { }

  ngOnInit() {
  }

}
