import { Component, OnInit, Output, EventEmitter, HostListener, ViewChild, Input } from '@angular/core';
import { Commonservice } from '../../services/commonservice.service';
import { opticonstants } from '../../constants';
import { UIHelper } from '../../helpers/ui.helpers';
import { CurrentSidebarInfo } from '../../models/sidebar/current-sidebar-info';
import { Configuration } from '../../../assets/configuration';
import { GlobalResource } from '../../helpers/global-resource';
import { ConfirmDialog } from 'src/app/helpers/services/dialog.service';



@Component({
  selector: 'app-portal-right',
  templateUrl: './portal-right.component.html',
  styleUrls: ['./portal-right.component.scss']
})
export class PortalRightComponent implements OnInit {
  imgPath = Configuration.imagePath;
  @Input() currentSidebarInfo: CurrentSidebarInfo;
  // Event emitter variable.
  //  @Output() messageEvent = new EventEmitter<boolean>();
  constructor(private commonService: Commonservice, private confirmService: ConfirmDialog) { }


  ngOnInit() {
  }
  /**
  * 
  * @param status close right content section, will pass false
  */
  async closeRightSidebar(param) {
    // if(GlobalResource.leaveUnsavedDataConfirmation()==false){
    //   return;
    // }

    // Check for dirty confirmation from
    let a: boolean = await this.confirmService.leaveUnsavedDataConfirmation();
    if (a == false) {
      return;
    }

    let currentSidebarInfo: CurrentSidebarInfo = new CurrentSidebarInfo();
    currentSidebarInfo.SideBarStatus = false;
    this.commonService.setCurrentSideBar(currentSidebarInfo);
  }

}
