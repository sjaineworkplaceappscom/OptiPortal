import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Commonservice } from '../../services/commonservice.service';
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
  //TabAddAttachementFormStatus:boolean = false;
  TabAttachementGridStatus:boolean = true; 
  showLoader:boolean=false;


  constructor(private commonService: Commonservice) { }

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

    this.commonService.purchaseInquiryAttachmentGridStatus.subscribe(
      data => {
        this.TabAttachementGridStatus = data;
      }
    );
    
  }

  /**
   * Attachement Tab
  */
  
  public showTabAddAttachementForm(){
    // this.TabAttachementGridStatus = false;
    // this.TabAddAttachementFormStatus = true;

    this.commonService.setPurchaseInquiryAttachmentGrid(false);
   
 }

  

  

}
