import { Component, OnInit, Input, HostListener } from '@angular/core';
import { CurrentSidebarInfo } from '../../../models/sidebar/current-sidebar-info';
import { UIHelper } from '../../../helpers/ui.helpers';

@Component({
  selector: 'app-vasn-update',
  templateUrl: './vasn-update.component.html',
  styleUrls: ['./vasn-update.component.scss']
})
export class VasnUpdateComponent implements OnInit {

  @Input() currentSidebarInfo:CurrentSidebarInfo;

  constructor() {}
  
  showLoader: boolean = false;
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
