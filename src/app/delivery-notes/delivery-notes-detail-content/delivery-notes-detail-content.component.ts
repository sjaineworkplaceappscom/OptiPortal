import { Component, OnInit, HostListener } from '@angular/core';
import { UIHelper } from '../../helpers/ui.helpers';
import { deliveryNotesContent } from '../../demodata/delivery-notes';
import { GridComponent } from '@progress/kendo-angular-grid';
import { Configuration } from '../../../assets/configuration';

@Component({
  selector: 'app-delivery-notes-detail-content',
  templateUrl: './delivery-notes-detail-content.component.html',
  styleUrls: ['./delivery-notes-detail-content.component.scss']
})
export class DeliveryNotesDetailContentComponent implements OnInit {

  imgPath = Configuration.imagePath;
  pageLimit;
  pagination:boolean;

  isMobile: boolean;
  isColumnFilter: boolean = false;
  isColumnGroup: boolean = false;
  gridHeight: number;
  showLoader: boolean = false;

  public gridData: any[];
  
  constructor() { }

   // UI Section
   @HostListener('window:resize', ['$event'])
   onResize(event) {
     // apply grid height
     this.gridHeight = UIHelper.getMainContentHeight();
     // check mobile device
     this.isMobile = UIHelper.isMobile();
   }
   // End UI Section

  ngOnInit() {
    // apply grid height
    this.gridHeight = UIHelper.getMainContentHeight();
    // check mobile device
    this.isMobile = UIHelper.isMobile();

    this.getDeliveryNotesContentList();
  }

  /**
   * Method to get list of inquries from server.
  */
  public getDeliveryNotesContentList() {
    this.showLoader = true;
    this.gridData = deliveryNotesContent;
    setTimeout(()=>{    
      this.showLoader = false;
    }, 1000);
  }

  onFilterChange(checkBox:any,grid:GridComponent)
  {
    if(checkBox.checked==false){
      this.clearFilter(grid);
    }
  }

  clearFilter(grid:GridComponent){      
    //grid.filter.filters=[];
  }
}
