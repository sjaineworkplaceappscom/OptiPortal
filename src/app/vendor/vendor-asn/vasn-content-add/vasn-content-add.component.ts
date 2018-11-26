import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vasn-content-add',
  templateUrl: './vasn-content-add.component.html',
  styleUrls: ['./vasn-content-add.component.scss']
})
export class VasnContentAddComponent implements OnInit {

  Line; 
  Item; 
  Quantity;
  UnitPrice; 
  UOM;
  TotalPrice;
  TaxCode;
  ShipToAddress;
  BillToAddress; 
  DeliveryDate;

  constructor() { }


  ngOnInit() {
  }

}
