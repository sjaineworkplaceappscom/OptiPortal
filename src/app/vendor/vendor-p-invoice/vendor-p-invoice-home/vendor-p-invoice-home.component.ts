import { Component, OnInit } from '@angular/core';
import { GlobalResource } from '../../../helpers/global-resource';

@Component({
  selector: 'app-vendor-p-invoice-home',
  templateUrl: './vendor-p-invoice-home.component.html',
  styleUrls: ['./vendor-p-invoice-home.component.scss']
})
export class VendorPInvoiceHomeComponent implements OnInit {

  public ValidTillDate;
  Invoice = "1"; 
  PORef = "2"; 
  Vendor = "3"; 
  InvoiceDate = "05/07/2018"; 
  InvoiceAmount = "400"; 
  PaymentDueDate = "05/07/2018"; 
  Status = "true";

  constructor() { }

  ngOnInit() {
    this.ValidTillDate = new Date();
  }

  valueChange(value:any){    
    GlobalResource.dirty=true;
    console.log('change in datepicker value'); 
  }

  public listItems: Array<string> = [
    'Deactivate', 'Activate'
  ];

  public value = [ 'Activate']

}
