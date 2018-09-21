import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delivery-notes-detail-home',
  templateUrl: './delivery-notes-detail-home.component.html',
  styleUrls: ['./delivery-notes-detail-home.component.scss']
})
export class DeliveryNotesDetailHomeComponent implements OnInit {

  constructor() { }

  delivery;
  shipdate;
  deliveredDate;
  customerName;
  wayBill;
  tracking;
  packingSlip;
  modeOfShipment;
  shippingMethod;
  shipToLocation;
  totalPrice;
  freight;
  tax;
  discAmt;

  ngOnInit() {
  }

}
