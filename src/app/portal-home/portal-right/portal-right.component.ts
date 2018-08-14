import { Component, OnInit, Output, EventEmitter, HostListener, ViewChild, Input } from '@angular/core';
import { Commonservice } from '../../services/commonservice.service';
import { opticonstants } from '../../constants';
import { UIHelper } from '../../helpers/ui.helpers';
import { CurrentSidebarInfo } from '../../models/sidebar/current-sidebar-info';



@Component({
  selector: 'app-portal-right',
  templateUrl: './portal-right.component.html',
  styleUrls: ['./portal-right.component.scss']
})
export class PortalRightComponent implements OnInit {
  @Input() currentSidebarInfo:CurrentSidebarInfo;
   // Event emitter variable.
  //  @Output() messageEvent = new EventEmitter<boolean>();
   constructor(private commonService: Commonservice) { }
   
   
  //  opalColor = opticonstants.OPALTHEMECOLOR;
  //  urbanColor = opticonstants.URBANTHEMECOLOR;
  //  skypeColor = opticonstants.SKYPETHEMECOLOR;
  //  greenColor = opticonstants.GREEN;
  //  stripeColor = opticonstants.STRIPE;
  //  coffeeColor = opticonstants.COFFEE;
  //  newtrendColor = opticonstants.NEWTREND2018;
  //  castfyColor = opticonstants.CASTFY;
  //  sunriseColor = opticonstants.SUNRISE;
  //  maldiveColor = opticonstants.MALDIVE;
  //  boraboraColor = opticonstants.BORABORA;
  //  bluelagooColor = opticonstants.BLUELAGOO;
 
   
 
   

  /**
   * View Child for Tab section of Purchase 
  */ 
  //@ViewChild('optirightfixedsection') optirightfixedsection;
  //@ViewChild('optiTab') optiTab;

 
  
  ngOnInit() {
  
  // Tab Content section Code start  
    //this.optirightfixedsection.nativeElement.children[2].style.display='block';
    //this.optiTab.nativeElement.children[0].classList.add('active'); 
  // Tab Content section Code end

  }
 
   // Function called on cross icon.
  //  onClose() {
  //    this.messageEvent.emit(false);
  //  }
 
  //  onThemeChange(themeColor: any) {
  //    this.commonService.setThemeData(themeColor);
  //  }

      /**
* 
* @param status close right content section, will pass false
*/
closeRightSidebar() {
  let currentSidebarInfo: CurrentSidebarInfo=new CurrentSidebarInfo();
  currentSidebarInfo.SideBarStatus = false;
  this.commonService.setCurrentSideBar(currentSidebarInfo);
}

}
