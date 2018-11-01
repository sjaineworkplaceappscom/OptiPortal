//===============================================================================
// © 2018 Optipro.  All rights reserved.
// Original Author: Shashank Jain
// Original Date: 10 March 2018
//==============================================================================

import { Component, HostListener } from '@angular/core';
import { UIHelper } from './helpers/ui.helpers';
import { ConfigurationService } from 'src/app/services/configuration.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [" :host >>> .k-dialog-close { display: none; }"]
  // styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'OptiPortals';
  isMobile: boolean;

  constructor(private configService: ConfigurationService) {
    this.configService.congigure();
  }

  ngOnInit() {
    UIHelper.deviceClass();
  }


}
