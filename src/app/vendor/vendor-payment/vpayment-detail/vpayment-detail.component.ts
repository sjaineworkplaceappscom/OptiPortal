import { Component, OnInit, HostListener, Input } from '@angular/core';
import { UIHelper } from 'src/app/helpers/ui.helpers';
import { CurrentSidebarInfo } from 'src/app/models/sidebar/current-sidebar-info';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-vpayment-detail',
  templateUrl: './vpayment-detail.component.html',
  styleUrls: ['./vpayment-detail.component.scss']
})
export class VpaymentDetailComponent implements OnInit {

  public configX: PerfectScrollbarConfigInterface = {
      suppressScrollY:true
  };

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
    //UIHelper.getWidthOfOuterTab();
  }

  ngOnInit() {
    // apply width on opti_TabID
    //UIHelper.getWidthOfOuterTab();
  }

}
