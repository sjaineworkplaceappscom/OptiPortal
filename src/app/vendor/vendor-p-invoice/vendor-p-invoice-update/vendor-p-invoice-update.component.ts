import { Component, OnInit, HostListener, Input } from '@angular/core';
import { UIHelper } from '../../../helpers/ui.helpers';
import { CurrentSidebarInfo } from '../../../models/sidebar/current-sidebar-info';

@Component({
  selector: 'app-vendor-p-invoice-update',
  templateUrl: './vendor-p-invoice-update.component.html',
  styleUrls: ['./vendor-p-invoice-update.component.scss']
})
export class VendorPInvoiceUpdateComponent implements OnInit {

  @Input() currentSidebarInfo:CurrentSidebarInfo;
  constructor() { }

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
