import { Component, OnInit, Input } from '@angular/core';
import { CurrentSidebarInfo } from 'src/app/models/sidebar/current-sidebar-info';

@Component({
  selector: 'app-consign-inventory-detail',
  templateUrl: './consign-inventory-detail.component.html',
  styleUrls: ['./consign-inventory-detail.component.scss']
})
export class ConsignInventoryDetailComponent implements OnInit {
  @Input() currentSidebarInfo:CurrentSidebarInfo;
  constructor() { }

  ngOnInit() {
  }

}
