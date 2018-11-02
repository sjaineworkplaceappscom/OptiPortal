import { Component, OnInit, HostListener, Input } from '@angular/core';
import { UIHelper } from '../../../helpers/ui.helpers';
import { CurrentSidebarInfo } from 'src/app/models/sidebar/current-sidebar-info';


@Component({
  selector: 'app-vendor-pi-detail',
  templateUrl: './vendor-pi-detail.component.html',
  styleUrls: ['./vendor-pi-detail.component.scss']
})
export class VendorPiDetailComponent implements OnInit {

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
