import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vendor-pi-content',
  templateUrl: './vendor-pi-content.component.html',
  styleUrls: ['./vendor-pi-content.component.scss']
})
export class VendorPiContentComponent implements OnInit {

  LineNumber = "V0002";
  RequestedDate = "01/07/2018";
  Item = "Samsung";
  Quantity = 10;
  UOM = "UOM";
  ShipToAddress = "Indore";
  BillToAddress = "Indore"; 

  constructor() { }

  ngOnInit() {
  }

}
