//===============================================================================
// © 2018 Optipro.  All rights reserved.
// Original Author: Shashank Jain
// Original Date: 10 March 2018
//==============================================================================

import { Component } from '@angular/core';
import * as $ from "jquery";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  constructor(){ }
  
  ngOnInit(){
    this.manageThemeCssFile();  
    this.manageSidebarAndRightSectionWidth();
  }

  // start apply theme css
  manageThemeCssFile(){
    $(document).ready(function(){
        $('#flat').click(function (){
            $('footer').find('link.opti__theme-css-file').remove();  
            $('footer').append('<link rel="stylesheet" href="../assets/css/theme/kendo.custom.flat.css?v=' + (new Date()).getTime() + '" class="opti__theme-css-file" type="text/css" />');
        });

        $('#opal').click(function (){
            $('footer').find('link.opti__theme-css-file').remove();
            $('footer').append('<link rel="stylesheet" href="../assets/css/theme/kendo.custom.blue.opal.css?v= ' + (new Date()).getTime() + '" class="opti__theme-css-file" type="text/css" />');
        });
    });
  }

  // start sidebar and right panel manage
  manageSidebarAndRightSectionWidth(){
      document.getElementById('sidebarCollapse').onclick = function() {
        document.getElementById('opti_LeftPanelID').classList.toggle('opti_sidebar-minimize');  
        document.getElementById('opti_RightPanelID').classList.toggle('opti_sidebar-minimize');
      };
  }
}
