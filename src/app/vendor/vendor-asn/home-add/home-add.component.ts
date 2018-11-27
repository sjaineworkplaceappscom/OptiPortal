import { Component, OnInit, Input } from '@angular/core';
import { CurrentSidebarInfo } from '../../../models/sidebar/current-sidebar-info';
import { VendorASNModel } from '../../../tempmodels/vendor/vendor-asn-model';
import { markParentViewsForCheckProjectedViews } from '../../../../../node_modules/@angular/core/src/view/util';
import { DateTimeHelper } from '../../../helpers/datetime.helper';

@Component({
  selector: 'app-home-add',
  templateUrl: './home-add.component.html',
  styleUrls: ['./home-add.component.scss']
})
export class HomeAddComponent implements OnInit {
  @Input() currentSidebarInfo: CurrentSidebarInfo;
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

  vendorASNModel: VendorASNModel=new VendorASNModel();
  constructor() { }

  ngOnInit() {
    if (this.currentSidebarInfo != undefined){      
      this.mapASN(this.currentSidebarInfo.RequesterData);
    }

  }

  mapASN(podata: any) {    
    this.vendorASNModel=new VendorASNModel();
    
    this.vendorASNModel.DeliveryDate = DateTimeHelper.ParseDate(Date.now());
    this.vendorASNModel.ShipmentDate = DateTimeHelper.ParseDate(Date.now());    
    this.vendorASNModel.Vendor=podata.Vendor;    
    this.vendorASNModel.VendorCode=podata.VendorCode;    
    
    
    this.vendorASNModel.PORefrenceNumber=podata.PONumber;
    

  }

  valueShipmentChange(e) {

  }

  valueDeliveryChange(e) {

  }

  AddASN(status) {

  }

  closeRightSidebar(status) {

  }

  ngOnChange() {

  }

}
