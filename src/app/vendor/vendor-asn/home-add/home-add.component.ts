import { Component, OnInit } from '@angular/core';
import { VendorASNModel } from 'src/app/tempmodels/vendor/vendor-asn-model';

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

  vendorASNModel:VendorASNModel;
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
