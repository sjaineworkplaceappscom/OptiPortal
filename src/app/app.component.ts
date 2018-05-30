//===============================================================================
// © 2018 Optipro.  All rights reserved.
// Original Author: Shashank Jain
// Original Date: 10 March 2018
//==============================================================================

import { Component, HostListener } from '@angular/core';
import { UIHelper } from './helpers/ui.helpers';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'OptiPortals';    
  isMobile:boolean;
  constructor(){ }
  
  ngOnInit(){    

    // UI operations
    
    this.isMobile =UIHelper.isMobile();
    UIHelper.manageNavigationPanel();
  }
  
  @HostListener('window:resize', ['$event'])
  onResize(event) { 
    // UI operations   
    this.isMobile =UIHelper.isMobile();
    UIHelper.manageNavigationPanel();

  }

}
