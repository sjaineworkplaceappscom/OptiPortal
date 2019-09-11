import { Component, OnInit, Input, HostListener } from '@angular/core';
import { CurrentSidebarInfo } from '../../../models/sidebar/current-sidebar-info';
import { UIHelper } from '../../../helpers/ui.helpers';
import { VendorAsnModule } from '../vendor-asn.module';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-vasn-add',
  templateUrl: './vasn-add.component.html',
  styleUrls: ['./vasn-add.component.scss']
})
export class VasnAddComponent implements OnInit {

  @Input() currentSidebarInfo:CurrentSidebarInfo;

  public configX: PerfectScrollbarConfigInterface = {
      suppressScrollY:true
  };
 
  constructor( private translate: TranslateService) {
    translate.use(localStorage.getItem('appLanguage'));
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
    });
  }
  
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
    //UIHelper.getWidthOfOuterTab();
  }

  ngOnInit() {
    // apply width on opti_TabID
    //UIHelper.getWidthOfOuterTab();
   // console.log("VSNAdd",this.currentSidebarInfo);
    
  }

  ngOnChange(){
    //console.log("VSNAdd",this.currentSidebarInfo);
  }

}
