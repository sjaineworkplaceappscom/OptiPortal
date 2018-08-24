import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sales-quotations-detail-home',
  templateUrl: './sales-quotations-detail-home.component.html',
  styleUrls: ['./sales-quotations-detail-home.component.scss']
})
export class SalesQuotationsDetailHomeComponent implements OnInit {

  
  quotationNumber = 'Cust002';
  Status = 'New';
  validUntil = '02/08/2018';
  documentDate= '02/08/2018';
  salesEmployee = 'Ankur';
  Owner = 'Sameer Sharma';
  Remark = 'Apple';
  placeOfSupply= 'Indore';
  totalBeforeDiscount = '5%';
  discountPercantage = '4%';
  Discount = '52401';
  Freight = '12';
  Tax = '8521';
  Total = '2514556';

  

  constructor() { }

  ngOnInit() {
  }

}
