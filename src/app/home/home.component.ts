import { Component, OnInit, HostListener } from '@angular/core';
import { UIHelper } from '../helpers/ui.helpers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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
