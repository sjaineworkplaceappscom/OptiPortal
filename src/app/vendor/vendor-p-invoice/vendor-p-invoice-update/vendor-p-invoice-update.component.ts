import { Component, OnInit, HostListener, Input } from '@angular/core';
import { UIHelper } from '../../../helpers/ui.helpers';
import { CurrentSidebarInfo } from '../../../models/sidebar/current-sidebar-info';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-vendor-p-invoice-update',
  templateUrl: './vendor-p-invoice-update.component.html',
  styleUrls: ['./vendor-p-invoice-update.component.scss']
})
export class VendorPInvoiceUpdateComponent implements OnInit {

  @Input() currentSidebarInfo:CurrentSidebarInfo;
  constructor(private translate: TranslateService) { 
    translate.use(localStorage.getItem('appLanguage'));
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
    });
  }

  tabName: string = 'home';

  public configX: PerfectScrollbarConfigInterface = {
      suppressScrollY:true
  };

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
  }

}
