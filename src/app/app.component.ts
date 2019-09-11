//===============================================================================
// © 2018 Optipro.  All rights reserved.
// Original Author: Shashank Jain
// Original Date: 10 March 2018
//==============================================================================

import { Component, HostListener } from '@angular/core';
import { UIHelper } from './helpers/ui.helpers';
import { ConfigurationService } from './services/configuration.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [" :host >>> .k-dialog-close { display: none; }"]
  // styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'OptiPortals';
  isMobile: boolean;

  constructor(private configService: ConfigurationService,private translate: TranslateService,private httpClientSer: HttpClient) {
    this.configService.congigure();
   
   this.httpClientSer.get('./assets/config.json').subscribe(
    (data: any) => {
      localStorage.setItem('appLanguage',data.appLang);  
      //sessionStorage.setItem('ConfigData', JSON.stringify(data));

        //this.getPSURL();
    },
    (err: HttpErrorResponse) => {
        console.log(err.message);
        // set default local if error
        let userLang = 'en';
        localStorage.setItem('appLanguage',userLang);
        alert("HttpErrorResponse:"+err.message);
    }
  );
 

    
  translate.use(localStorage.getItem('appLanguage'));
  translate.onLangChange.subscribe((event: LangChangeEvent) => {
  });
    console.log(localStorage.getItem('appLanguage'));
  }

  ngOnInit() {
    UIHelper.deviceClass();
  }


}
