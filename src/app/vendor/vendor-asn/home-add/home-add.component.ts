import { Component, OnInit, Input } from '@angular/core';
import { CurrentSidebarInfo } from '../../../models/sidebar/current-sidebar-info';

@Component({
  selector: 'app-home-add',
  templateUrl: './home-add.component.html',
  styleUrls: ['./home-add.component.scss']
})
export class HomeAddComponent implements OnInit {
  @Input() currentSidebarInfo:CurrentSidebarInfo;
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
    if(this.currentSidebarInfo!=undefined)
    console.log("POData: "+ this.currentSidebarInfo.RequesterData);
  }

  valueShipmentChange(e){

  }

  valueDeliveryChange(e){

  }

  AddASN(status){

  }

  closeRightSidebar(status){
    
  }

  ngOnChange(){
  
  }

}
