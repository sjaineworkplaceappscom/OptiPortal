import { Component, OnInit, HostListener } from '@angular/core';
import { UIHelper } from 'src/app/helpers/ui.helpers';

@Component({
  selector: 'app-portal-home',
  templateUrl: './portal-home.component.html',
  styleUrls: ['./portal-home.component.scss']
})
export class PortalHomeComponent implements OnInit {

  isMobile:boolean;
  constructor(){ }
  
  ngOnInit(){  
    // UI operations
    this.isMobile =UIHelper.isMobile();
    UIHelper.manageNavigationPanel();
  }
  
  @HostListener('window:resize', ['$event'])
  onResize(event) { 
    // UI operations   
    this.isMobile =UIHelper.isMobile();
    UIHelper.manageNavigationPanel();
  }

}
