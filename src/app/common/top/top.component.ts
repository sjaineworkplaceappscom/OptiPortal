//===============================================================================
// © 2018 Optipro.  All rights reserved.
// Original Author: Shashank Jain
// Original Date: 10 March 2018
//==============================================================================

import { Component, OnInit } from '@angular/core';
import { UIHelper } from '../../helpers/ui.helpers';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent implements OnInit {
  themeSettingSidebar:boolean=false;
  constructor() { }

  ngOnInit() {
    UIHelper.manageThemeCssFile();
  }

  // open and close theme setting side panel
  themeSetting(){
    this.themeSettingSidebar = !this.themeSettingSidebar;
  }

}
