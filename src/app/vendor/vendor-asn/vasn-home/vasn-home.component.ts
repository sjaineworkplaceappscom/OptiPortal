import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vasn-home',
  templateUrl: './vasn-home.component.html',
  styleUrls: ['./vasn-home.component.scss']
})
export class VasnHomeComponent implements OnInit {

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

  UpdateASN(status){

  }

  closeRightSidebar(status){
    
  }

}
