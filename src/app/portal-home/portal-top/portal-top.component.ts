import { Component, OnInit, TemplateRef } from '@angular/core';
import { UIHelper } from '../../helpers/ui.helpers';
import { Commonservice } from '../../services/commonservice.service';

import { BsModalService } from 'ngx-bootstrap/modal'; // Bootstrap Modal
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service'; // Bootstrap Modal
import { Router } from '@angular/router';
import { opticonstants } from '../../constants';

@Component({
  selector: 'app-portal-top',
  templateUrl: './portal-top.component.html',
  styleUrls: ['./portal-top.component.scss']
})
export class PortalTopComponent implements OnInit {

  modalRef: BsModalRef;
  openThemeSetting: boolean = false;
  constructor(private modalService: BsModalService,private router: Router, private commonService: Commonservice) { }
  selectedThemeColor: string = opticonstants.DEFAULTTHEMECOLOR;
  
  ngOnInit() {
    UIHelper.manageThemeCssFile();
  }

  // open and close theme setting side panel
  openCloseRightPanel() {
    this.openThemeSetting = !this.openThemeSetting;
    
    // get theme color
    this.commonService.themeCurrentData.subscribe(
      data => {
        this.selectedThemeColor = data;
      }
    )
  }

  // evenet emitted by client(right) to parenet(top).
  receiverMessage($evenet) {
    this.openThemeSetting = $evenet;
  }

  openSearchMobileModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  signOut() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

} 
