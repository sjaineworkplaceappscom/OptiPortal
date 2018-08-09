import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Commonservice } from '../../services/commonservice.service';
import { opticonstants } from '../../constants';

@Component({
  selector: 'app-portal-right',
  templateUrl: './portal-right.component.html',
  styleUrls: ['./portal-right.component.scss']
})
export class PortalRightComponent implements OnInit {

   // Event emitter variable.
   @Output() messageEvent = new EventEmitter<boolean>();
   constructor(private commonService: Commonservice) { }
   
   
   opalColor = opticonstants.OPALTHEMECOLOR;
   urbanColor = opticonstants.URBANTHEMECOLOR;
   skypeColor = opticonstants.SKYPETHEMECOLOR;
   greenColor = opticonstants.GREEN;
   stripeColor = opticonstants.STRIPE;
   coffeeColor = opticonstants.COFFEE;
   newtrendColor = opticonstants.NEWTREND2018;
   castfyColor = opticonstants.CASTFY;
   sunriseColor = opticonstants.SUNRISE;
   maldiveColor = opticonstants.MALDIVE;
   boraboraColor = opticonstants.BORABORA;
   bluelagooColor = opticonstants.BLUELAGOO;
 
   
 
   
 
 
   ngOnInit() {
   }
 
   // Function called on cross icon.
   onClose() {
     this.messageEvent.emit(false);
   }
 
   onThemeChange(themeColor: any) {
     this.commonService.setThemeData(themeColor);
   }

}
