import { Component, OnInit, Input } from '@angular/core';
import { CurrentSidebarInfo } from '../models/sidebar/current-sidebar-info';

@Component({
  selector: 'app-purchase-inquiry',
  templateUrl: './purchase-inquiry.component.html',
  styleUrls: ['./purchase-inquiry.component.scss']
})
export class PurchaseInquiryComponent implements OnInit {
  @Input() currentSidebarInfo:CurrentSidebarInfo;
  constructor() { }

  ngOnInit() {
  }

}
