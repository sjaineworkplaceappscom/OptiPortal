import { Component, OnInit, HostListener, Input } from '@angular/core';
import { UIHelper } from '../../helpers/ui.helpers';
import { CurrentSidebarInfo } from '../../models/sidebar/current-sidebar-info';
import { GlobalResource } from '../../helpers/global-resource';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';


@Component({
  selector: 'app-delivery-notes-detail',
  templateUrl: './delivery-notes-detail.component.html',
  styleUrls: ['./delivery-notes-detail.component.scss']
})
export class DeliveryNotesDetailComponent implements OnInit {

  constructor() { }

  public configX: PerfectScrollbarConfigInterface = {
    suppressScrollY:true
  };

  @Input() currentSidebarInfo:CurrentSidebarInfo;

  tabName: string = 'home';
  shipMentNotes:boolean;

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
    this.shipMentNotes = GlobalResource.NavigateFromAdvanseShipmentNotes ;
    // apply width on opti_TabID
    //UIHelper.getWidthOfOuterTab();
    // setTimeout(()=>{
    //   UIHelper.getWidthOfOuterTab();
    // }, 500);
  }

}
