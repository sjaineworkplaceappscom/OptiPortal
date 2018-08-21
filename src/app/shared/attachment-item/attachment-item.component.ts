import { Component, OnInit, HostListener } from '@angular/core';
import { UIHelper } from '../../helpers/ui.helpers';

@Component({
  selector: 'app-attachment-item',
  templateUrl: './attachment-item.component.html',
  styleUrls: ['./attachment-item.component.scss']
})
export class AttachmentItemComponent implements OnInit {

    /**
     * global variable
    */
   isMobile: boolean;
   gridHeight: number;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
      //Apply Grid Height
      this.gridHeight = UIHelper.getMainContentHeight();
      
      // Check Mobile device
      this.isMobile = UIHelper.isMobile();
  }

  constructor() { }

  ngOnInit() {
    //Apply Grid Height
    this.gridHeight = UIHelper.getMainContentHeight();

    // Check Mobile device
    this.isMobile = UIHelper.isMobile();
  }

}
