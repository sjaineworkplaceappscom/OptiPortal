import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vendor-po-content',
  templateUrl: './vendor-po-content.component.html',
  styleUrls: ['./vendor-po-content.component.scss']
})
export class VendorPoContentComponent implements OnInit {

  LineNumber = "V0001";
  Item = "Samsung";
  Quantity = 10;
  UnitPrice = 4000;
  UOM = "UOM";
  TotalPrice = 4000;
  TaxCode = "Code1";
  ShipToAddress = "Indore";
  BillToAddress = "Indore";
  RequestedDate = "01/07/2018";

  constructor() { }

  ngOnInit() {
  }

}
