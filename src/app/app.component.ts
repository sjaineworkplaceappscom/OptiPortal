import { Component } from '@angular/core';
import $ from "jquery";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  constructor(){
    // Apply default theme css
    var cssfile = '<link rel="stylesheet" href="../assets/css/theme/kendo.custom.blue.opal.css?v=' + (new Date()).getTime() + '" />';
    document.write(cssfile);
  }
  
  ngOnInit(){
    this.manageThemeCssFile();  
  }

  // Change theme css file
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
}
