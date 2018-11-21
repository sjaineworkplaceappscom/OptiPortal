import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vpayment-content',
  templateUrl: './vpayment-content.component.html',
  styleUrls: ['./vpayment-content.component.scss']
})
export class VpaymentContentComponent implements OnInit {

  Line = 1; 
  PORef = 2; 
  Invoice = 3;
  InvoiceLine = 4;
  Item = "item1"; 
  Quantity = "10";
  UnitPrice = "1500"; 
  UOM = "UOM"; 
  TotalPrice = "5000";
  TaxCode = "Tax1"; 
  ShipToAddress = "Indore"; 
  BillToAddress = "Indore";
  Shipment = 1;
  DeliveryDate = "05/07/2018";

  constructor() { }

  ngOnInit() {
  }

}
