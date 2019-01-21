import { Component, OnInit, Input, HostListener } from '@angular/core';
import { CurrentSidebarInfo } from '../../models/sidebar/current-sidebar-info';
import { UIHelper } from '../../helpers/ui.helpers';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-customer-purchase-order-add',
  templateUrl: './customer-purchase-order-add.component.html',
  styleUrls: ['./customer-purchase-order-add.component.scss']
})
export class CustomerPurchaseOrderAddComponent implements OnInit {

  public configX: PerfectScrollbarConfigInterface = {
      suppressScrollY:true
  };
 
  constructor() { }

  @Input() currentSidebarInfo:CurrentSidebarInfo;

  tabName: string = 'home';
  tabStatus: boolean = false;

  // tab function
  openTab(evt, tabName, tabStatus) {
    if (tabStatus == true) {
      this.tabName = tabName;
      UIHelper.customOpenTab(evt, tabName, 'horizontal');
    }

  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // apply width on opti_TabID
    //UIHelper.getWidthOfOuterTabCPO();
  }

  ngOnInit() {
    // apply width on opti_TabID
    //UIHelper.getWidthOfOuterTabCPO();
  }

}
