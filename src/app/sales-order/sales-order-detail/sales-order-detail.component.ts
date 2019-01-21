import { Component, OnInit, Input, HostListener } from '@angular/core';
import { CurrentSidebarInfo } from '../../models/sidebar/current-sidebar-info';
import { UIHelper } from '../../helpers/ui.helpers';
import { GlobalResource } from '../../helpers/global-resource';
import { ConfirmDialog } from '../../helpers/services/dialog.service';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-sales-order-detail',
  templateUrl: './sales-order-detail.component.html',
  styleUrls: ['./sales-order-detail.component.scss']
})
export class SalesOrderDetailComponent implements OnInit {

  public configX: PerfectScrollbarConfigInterface = {
      suppressScrollY:true
  };

  @Input() currentSidebarInfo: CurrentSidebarInfo;

  constructor(private confirmService: ConfirmDialog) { }

  tabName: string = 'home';

  // tab function
  async openTab(evt, tabName) {
    // Check for unsaved data.
    // if (GlobalResource.leaveUnsavedDataConfirmation() == false) {
    //   return;
    // }

     // Check for dirty confirmation from
  let a: boolean = await this.confirmService.leaveUnsavedDataConfirmation();
  if (a == false) {
    return;
  }

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
