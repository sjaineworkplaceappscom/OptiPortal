import { Component, OnInit, Input, HostListener } from '@angular/core';
import { CurrentSidebarInfo } from 'src/app/models/sidebar/current-sidebar-info';
import { UIHelper } from '../../helpers/ui.helpers';

@Component({
  selector: 'app-customer-purchase-order-detail',
  templateUrl: './customer-purchase-order-detail.component.html',
  styleUrls: ['./customer-purchase-order-detail.component.scss']
})
export class CustomerPurchaseOrderDetailComponent implements OnInit {
  constructor() { }

  @Input() currentSidebarInfo:CurrentSidebarInfo;

  tabName: string = 'home';

  // tab function
  openTab(evt, tabName) {
    this.tabName = tabName;
    UIHelper.customOpenTab(evt, tabName, 'horizontal');
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // apply width on opti_TabID
    UIHelper.getWidthOfOuterTab();
  }

  ngOnInit() {
    // apply width on opti_TabID
    UIHelper.getWidthOfOuterTab();
  }

}
