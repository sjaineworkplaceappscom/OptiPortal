//===============================================================================
// © 2018 Optipro.  All rights reserved.
// Original Author: Shashank Jain
// Original Date: 10 March 2018
//==============================================================================

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Commonservice } from '../../services/commonservice.service';
import { opticonstants } from '../../constants';

@Component({
  selector: 'app-right',
  templateUrl: './right.component.html',
  styleUrls: ['./right.component.scss']
})
export class RightComponent implements OnInit {
  // Event emitter variable.
  @Output() messageEvent = new EventEmitter<boolean>();
  constructor(private commonService: Commonservice) { }

  
  opalColor = opticonstants.OPALTHEMECOLOR;
  urbanColor = opticonstants.URBANTHEMECOLOR;
  skypeColor = opticonstants.SKYPETHEMECOLOR;
  greenColor = opticonstants.GREEN;
  stripeColor = opticonstants.STRIPE;
  coffeeColor = opticonstants.COFFEE;
  newtrendColor = opticonstants.NEWTREND2018;
  castfyColor = opticonstants.CASTFY;


  ngOnInit() {
  }

  // Function called on cross icon.
  onClose() {
    this.messageEvent.emit(false);
  }

  onThemeChange(themeColor: any) {
    this.commonService.setThemeData(themeColor);
  }
}
