//===============================================================================
// © 2018 Optipro.  All rights reserved.
// Original Author: Shashank Jain
// Original Date: 10 March 2018
//==============================================================================

import { Component, OnInit } from '@angular/core';
import { Commonservice } from '../../services/commonservice.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {
  approveUser:boolean;
  constructor(private commonService:Commonservice) {
    this.approveUser=false;
    
   }

  ngOnInit() {
    this.approveUser=false;
    this.commonService.currentNavigatedData.subscribe(
      data=>{
        this.approveUser=data;
       
      }
    )
  }

}
