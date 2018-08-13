import { Component, OnInit, Input } from '@angular/core';
import { CurrentSidebarInfo } from '../models/sidebar/current-sidebar-info';

@Component({
  selector: 'app-sales-quotations',
  templateUrl: './sales-quotations.component.html',
  styleUrls: ['./sales-quotations.component.scss']
})
export class SalesQuotationsComponent implements OnInit {
  @Input() currentSidebarInfo:CurrentSidebarInfo;
  constructor() { }

  ngOnInit() {
  }

}
