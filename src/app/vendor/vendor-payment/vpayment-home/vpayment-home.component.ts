import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vpayment-home',
  templateUrl: './vpayment-home.component.html',
  styleUrls: ['./vpayment-home.component.scss']
})
export class VpaymentHomeComponent implements OnInit {

  PaymentRef = 1; 
  PaymentMode = 'Cheque'; 
  PaymentType = 'Advance'; 
  PaymentDetails = 'Bank';
  Amount = 5000; 
  PaymentDate = '01/07/2018';
  Status = 'Cancel';

  constructor() { }

  ngOnInit() {
  }

}
