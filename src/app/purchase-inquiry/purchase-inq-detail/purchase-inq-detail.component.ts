import { Component, OnInit, HostListener, ViewChild, Input } from '@angular/core';
import { UIHelper } from '../../helpers/ui.helpers';
import { CurrentSidebarInfo } from '../../models/sidebar/current-sidebar-info';

@Component({
  selector: 'app-purchase-inq-detail',
  templateUrl: './purchase-inq-detail.component.html',
  styleUrls: ['./purchase-inq-detail.component.scss']
})
export class PurchaseInqDetailComponent implements OnInit {
  @Input() currentSidebarInfo:CurrentSidebarInfo;

  constructor() { }

  //@ViewChild('optiRightDetailInquiry') optiRightDetailInquiry;
  @ViewChild('optiTab') optiTab;

  // tab function
  openTab(evt, tabName) {
      UIHelper.customOpenTab(evt, tabName);
  }
  
  @HostListener('window:resize', ['$event'])
  onResize(event) {
      // apply width on opti_TabID
      UIHelper.getWidthOfOuterTab();
  }

  ngOnInit() {
    //this.optiRightDetailInquiry.nativeElement.children[2].style.display='block';
    this.optiTab.nativeElement.children[0].classList.add('active'); 
  }

}
