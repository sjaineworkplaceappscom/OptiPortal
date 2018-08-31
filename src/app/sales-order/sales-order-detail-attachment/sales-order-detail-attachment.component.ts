import { Component, OnInit, HostListener } from '@angular/core';
import { UIHelper } from '../../helpers/ui.helpers';
import { salesOrderAttachment } from '../../DemoData/sales-order';
import { GridComponent } from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-sales-order-detail-attachment',
  templateUrl: './sales-order-detail-attachment.component.html',
  styleUrls: ['./sales-order-detail-attachment.component.scss']
})
export class SalesOrderDetailAttachmentComponent implements OnInit {

  public gridData: any[];
  isMobile: boolean;
  isColumnFilter: boolean = false;
  isColumnGroup: boolean = false;
  gridHeight: number;
  showLoader: boolean = false;
  searchRequest: string = '';

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

    this.getSalesOrderAttachmentList();
  }

   /**
   * Method to get list of inquries from server.
  */
  public getSalesOrderAttachmentList() {
    this.showLoader = true;
    this.gridData = salesOrderAttachment;
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
