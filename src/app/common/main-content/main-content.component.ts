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

    const element = document.getElementsByTagName("body")[0];
    element.className = "";

    this.approveUser=false;
    this.commonService.currentNavigatedData.subscribe(
      data=>{
        this.approveUser=data;
       
      }
    )
  }

  public roles: Array<{ text: string, value: string }> = [
    { text: "Please Select Role", value: '0' },
    { text: "Admin", value: '41F23977-C709-4B7C-BBEE-16A539211E9C' },
    { text: "Manager", value: 'DA427D60-7B0F-446B-AA40-40D3B7F571EA' },
    { text: "User", value: 'DA427D60-7B0F-446B-AA40-40D3B7F571EB' }
  ];

  public selectedItem: { text: string, value: string } = this.roles[0];

}
