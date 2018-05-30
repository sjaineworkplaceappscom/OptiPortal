//===============================================================================
// © 2018 Optipro.  All rights reserved.
// Original Author: Shashank Jain
// Original Date: 10 March 2018
//==============================================================================

import { Component, OnInit, TemplateRef } from '@angular/core';
import { UIHelper } from '../../helpers/ui.helpers';

import { BsModalService } from 'ngx-bootstrap/modal'; // Bootstrap Modal
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service'; // Bootstrap Modal

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent implements OnInit {
  modalRef: BsModalRef;
  openThemeSetting: boolean = false;
  constructor(private modalService: BsModalService) { }

  ngOnInit() {
    UIHelper.manageThemeCssFile();
  }

  // open and close theme setting side panel
  openCloseRightPanel() {
    this.openThemeSetting = !this.openThemeSetting;
  }

  // evenet emitted by client(right) to parenet(top).
  receiverMessage($evenet) {
    this.openThemeSetting = $evenet;
  }

  openSearchMobileModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}
