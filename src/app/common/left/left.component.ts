//===============================================================================
// © 2018 Optipro.  All rights reserved.
// Original Author: Shashank Jain
// Original Date: 10 March 2018
//==============================================================================
import { Component, OnInit } from '@angular/core';
import { Commonservice } from '../../services/commonservice.service';
import { Router } from '@angular/router';
import { opticonstants } from '../../constants';
// import { UIHelper } from '../../helpers/ui.helpers';

@Component({
  selector: 'app-left',
  templateUrl: './left.component.html',
  styleUrls: ['./left.component.scss']
})
export class LeftComponent implements OnInit {
  systemAdmin:string;
  constructor(private commonService: Commonservice,private router: Router) { }
  selectedThemeColor: string = opticonstants.DEFAULTTHEMECOLOR;

  ngOnInit() {    
    
    this.systemAdmin=localStorage.getItem('SystemAdmin');   
     
    this.commonService.themeCurrentData.subscribe(
      data => {
        this.selectedThemeColor = data;
      }
    );
    
    if(this.systemAdmin=='true'){
      this.navigate();
    }    
  }

  ngOnChange() {
  }

  navigate(){
    this.commonService.setNavigatedData(true);
  }
}
