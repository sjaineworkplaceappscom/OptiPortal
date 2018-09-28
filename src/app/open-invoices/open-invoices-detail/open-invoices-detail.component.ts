import { Component, OnInit, HostListener, Input } from '@angular/core';
import { UIHelper } from '../../helpers/ui.helpers';
import { CurrentSidebarInfo } from '../../models/sidebar/current-sidebar-info';

@Component({
  selector: 'app-open-invoices-detail',
  templateUrl: './open-invoices-detail.component.html',
  styleUrls: ['./open-invoices-detail.component.scss']
})
export class OpenInvoicesDetailComponent implements OnInit {

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
