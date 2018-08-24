import { Component, OnInit, Input } from '@angular/core';
import { CurrentSidebarInfo } from '../../models/sidebar/current-sidebar-info';

@Component({
  selector: 'app-sales-order-detail',
  templateUrl: './sales-order-detail.component.html',
  styleUrls: ['./sales-order-detail.component.scss']
})
export class SalesOrderDetailComponent implements OnInit {

  @Input() currentSidebarInfo:CurrentSidebarInfo;

  constructor() { }

  ngOnInit() {
  }

}
