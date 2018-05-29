//===============================================================================
// © 2018 Optipro.  All rights reserved.
// Original Author: Shashank Jain
// Original Date: 10 March 2018
//==============================================================================

import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-right',
  templateUrl: './right.component.html',
  styleUrls: ['./right.component.scss']
})
export class RightComponent implements OnInit {
  // Event emitter variable.
  @Output() messageEvent = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
  }

  // Function called on cross icon.
  onClose() {
    this.messageEvent.emit(false);
  }
}
