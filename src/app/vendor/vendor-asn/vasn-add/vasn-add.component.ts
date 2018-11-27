import { Component, OnInit, Input, HostListener } from '@angular/core';
import { CurrentSidebarInfo } from '../../../models/sidebar/current-sidebar-info';
import { UIHelper } from '../../../helpers/ui.helpers';
import { VendorAsnModule } from '../vendor-asn.module';

@Component({
  selector: 'app-vasn-add',
  templateUrl: './vasn-add.component.html',
  styleUrls: ['./vasn-add.component.scss']
})
export class VasnAddComponent implements OnInit {

  @Input() currentSidebarInfo:CurrentSidebarInfo;

 
  constructor() {}
  
  showLoader: boolean = false;
  tabName: string = 'home';
  
  // tab function
  openTab(evt, tabName) {
    this.tabName = tabName;
    UIHelper.customOpenTab(evt, tabName, 'horizontal');
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // apply width on opti_TabID
    UIHelper.getWidthOfOuterTab();
  }

  ngOnInit() {
    // apply width on opti_TabID
    UIHelper.getWidthOfOuterTab();
   // console.log("VSNAdd",this.currentSidebarInfo);
    
  }

  ngOnChange(){
    //console.log("VSNAdd",this.currentSidebarInfo);
  }

}
