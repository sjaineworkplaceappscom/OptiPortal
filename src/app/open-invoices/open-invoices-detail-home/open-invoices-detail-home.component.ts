import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-open-invoices-detail-home',
  templateUrl: './open-invoices-detail-home.component.html',
  styleUrls: ['./open-invoices-detail-home.component.scss']
})
export class OpenInvoicesDetailHomeComponent implements OnInit {


  Invoice;
  invoiceDate;
  dueDate;
  Amount;
  Freight;
  Tax;
  discount;
  totalAmount;
  billToaddress;
  contactPerson;
  paymentTerms;
  advancePaidamount;
  balancedue;


  ngOnInit() {
  }

}
