//===============================================================================
// © 2018 Optipro.  All rights reserved.
// Original Author: Shashank Jain
// Original Date: 10 March 2018
//==============================================================================

import { Component, HostListener } from '@angular/core';
// import * as $ from "jquery";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  deviceWidth:number;
  deviceHeight:number;
  deviceNameOnTheBasisOfDimension:string;

  constructor(){ }
  
  ngOnInit(){
    this.getDeviceDimension(); 
    this.manageSidebarAndRightSectionWidth(); 
  }

  // start sidebar and right panel manage
  // this function will call only for desktop and ipad
  manageSidebarAndRightSectionWidth(){
      let this1 = this;
      document.getElementById('sidebarCollapse').onclick = function() {
        if(this1.deviceNameOnTheBasisOfDimension == 'not mobile'){ 
          document.getElementById('opti_LeftPanelID').classList.toggle('opti_sidebar-minimize');  
          document.getElementById('opti_RightPanelID').classList.toggle('opti_sidebar-minimize');
        }else{
          document.getElementById('opti_LeftPanelID').classList.toggle('opti_menusidebar-mobile-open');  
          document.getElementById('opti_RightPanelID').classList.toggle('opti_menusidebar-mobile-open');
        }
      };
    
  }


  getDeviceDimension(){
    let getDeviceWidth = window.outerWidth;
    let getDeviceHeight = window.outerHeight;
    if(getDeviceWidth <= 767){
      this.deviceNameOnTheBasisOfDimension = 'mobile'; 
    }else{
      this.deviceNameOnTheBasisOfDimension = 'not mobile'; 
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.getDeviceDimension();
    this.manageSidebarAndRightSectionWidth(); 
  }

}
