import { Component, OnInit, Input } from '@angular/core';
import { CurrentSidebarInfo } from 'src/app/models/sidebar/current-sidebar-info';

@Component({
  selector: 'app-consign-inventory-sr-batch-detail',
  templateUrl: './consign-inventory-sr-batch-detail.component.html',
  styleUrls: ['./consign-inventory-sr-batch-detail.component.scss']
})
export class ConsignInventorySRBatchDetailComponent implements OnInit {
  @Input() currentSidebarInfo:CurrentSidebarInfo;
  constructor() { }

  ngOnInit() {
  }

}
