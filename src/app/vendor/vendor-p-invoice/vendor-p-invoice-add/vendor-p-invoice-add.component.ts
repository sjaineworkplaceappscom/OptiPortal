import { Component, OnInit, Input, HostListener } from '@angular/core';
import { CurrentSidebarInfo } from '../../../models/sidebar/current-sidebar-info';
import { UIHelper } from '../../../helpers/ui.helpers';

@Component({
  selector: 'app-vendor-p-invoice-add',
  templateUrl: './vendor-p-invoice-add.component.html',
  styleUrls: ['./vendor-p-invoice-add.component.scss']
})
export class VendorPInvoiceAddComponent implements OnInit {

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
