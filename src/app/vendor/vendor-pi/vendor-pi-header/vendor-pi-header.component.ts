import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vendor-pi-header',
  templateUrl: './vendor-pi-header.component.html',
  styleUrls: ['./vendor-pi-header.component.scss']
})
export class VendorPiHeaderComponent implements OnInit {

  
  InquiryID = "V0002";
  InquiryDate = "01/07/2018";
  Vendor = "Samsung";
  Status = "Sent To Vendor";
  Buyer = "Shashank Jain";
  ValidUntil = "01/07/2018";

  constructor() { }

  ngOnInit() {
  }

}
