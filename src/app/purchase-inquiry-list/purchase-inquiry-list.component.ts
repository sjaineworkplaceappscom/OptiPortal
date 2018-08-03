import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchase-inquiry-list',
  templateUrl: './purchase-inquiry-list.component.html',
  styleUrls: ['./purchase-inquiry-list.component.scss']
})
export class PurchaseInquiryListComponent implements OnInit {
  systemAdmin: string;
  constructor() { }

  ngOnInit() {
    this.systemAdmin = localStorage.getItem('SystemAdmin');
  }

}
