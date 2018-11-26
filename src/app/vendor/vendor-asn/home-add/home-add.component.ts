import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-add',
  templateUrl: './home-add.component.html',
  styleUrls: ['./home-add.component.scss']
})
export class HomeAddComponent implements OnInit {

  ASN;
  PORef;
  Vendor; 
  ShipmentDate;
  DeliveryDate; 
  WayBill1; 
  Tracking;
  Price; 
  Tax; 
  Freight;
  Discount; 
  TotalPrice;

  constructor() { }

  ngOnInit() {
  }

  valueShipmentChange(e){

  }

  valueDeliveryChange(e){

  }

  AddASN(status){

  }

  closeRightSidebar(status){
    
  }

}
