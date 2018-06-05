//===============================================================================
// © 2018 Optipro.  All rights reserved.
// Original Author: Shashank Jain
// Original Date: 10 March 2018
//==============================================================================
import { Component, OnInit } from '@angular/core';
import { Commonservice } from '../../services/commonservice.service';
// import { UIHelper } from '../../helpers/ui.helpers';

@Component({
  selector: 'app-left',
  templateUrl: './left.component.html',
  styleUrls: ['./left.component.scss']
})
export class LeftComponent implements OnInit {

  constructor(private commonService: Commonservice) { }
  selectedThemeColor: string = '#FF8382';

  ngOnInit() {    
    this.commonService.themeCurrentData.subscribe(
      data => {
        this.selectedThemeColor = data;
      }
    )

  }

  ngOnChange() {
  }
}
