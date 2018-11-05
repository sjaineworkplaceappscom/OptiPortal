import { Component, OnInit, HostListener, Input } from '@angular/core';
import { UIHelper } from '../../helpers/ui.helpers';
import { CurrentSidebarInfo } from '../../models/sidebar/current-sidebar-info';
import { GlobalResource } from '../../helpers/global-resource';
import { ConfirmDialog } from '../../helpers/services/dialog.service';

@Component({
  selector: 'app-sales-quotations-detail',
  templateUrl: './sales-quotations-detail.component.html',
  styleUrls: ['./sales-quotations-detail.component.scss']
})
export class SalesQuotationsDetailComponent implements OnInit {

  @Input() currentSidebarInfo:CurrentSidebarInfo;

  constructor( private confirmService: ConfirmDialog) { }

  tabName: string = 'home';

  // tab function
  async openTab(evt, tabName) {
    // Check for unsaved data.
    // if(GlobalResource.leaveUnsavedDataConfirmation()==false){
    //   return;
    //  }
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
    UIHelper.getWidthOfOuterTab();
  }

  ngOnInit() {
    // apply width on opti_TabID
    UIHelper.getWidthOfOuterTab();
  }

}
