import { Component, OnInit, HostListener, Input } from '@angular/core';
import { UIHelper } from '../../../helpers/ui.helpers';
import { CurrentSidebarInfo } from '../../../models/sidebar/current-sidebar-info';
import { ConfirmDialog } from 'src/app/helpers/services/dialog.service';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';


@Component({
  selector: 'app-vendor-pi-detail',
  templateUrl: './vendor-pi-detail.component.html',
  styleUrls: ['./vendor-pi-detail.component.scss']
})
export class VendorPiDetailComponent implements OnInit {

  public configX: PerfectScrollbarConfigInterface = {
      suppressScrollY:true
  };

  @Input() currentSidebarInfo:CurrentSidebarInfo;
  constructor(private confirmService: ConfirmDialog) { }

  tabName: string = 'home';

  // tab function
 async openTab(evt, tabName) {
    let a: boolean = await this.confirmService.leaveUnsavedDataConfirmation();

   if(a==false){
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
