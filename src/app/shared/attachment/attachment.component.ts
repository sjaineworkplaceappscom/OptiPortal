import { Component, OnInit, Input, HostListener } from '@angular/core';
import { UIHelper } from '../../helpers/ui.helpers';

@Component({
  selector: 'app-attachment',
  templateUrl: './attachment.component.html',
  styleUrls: ['./attachment.component.scss']
})
export class AttachmentComponent implements OnInit {

  /**
   * global variable
  */
  isMobile: boolean;
  gridHeight: number;

  /**
   * Attachement tab variable
  */
  @Input() tabparent;
  getTabParent:string;
  TabAddAttachementFormStatus:boolean = false;
  TabAttachementGridStatus:boolean = true; 
  showLoader:boolean=false;


  constructor() { }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    /**
     * Apply Grid Height
    */
    this.gridHeight = UIHelper.getMainContentHeight();
      
    /**
     * Check Mobile device
    */
      this.isMobile = UIHelper.isMobile();
  }

  ngOnInit() {

    /**
     * Apply Grid Height
    */
    this.gridHeight = UIHelper.getMainContentHeight();
      
    /**
    * Check Mobile device
    */
    this.isMobile = UIHelper.isMobile();

    this.getTabParent = this.tabparent;
    
  }

  /**
   * Attachement Tab
  */
  
  public showTabAddAttachementForm(){
    this.TabAttachementGridStatus = false;
    this.TabAddAttachementFormStatus = true;
  }
  public submitAttachements(event){
    this.TabAttachementGridStatus = true;
    this.TabAddAttachementFormStatus = false;
  }

  

}
