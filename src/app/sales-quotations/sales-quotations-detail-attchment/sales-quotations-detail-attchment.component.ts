import { Component, OnInit, HostListener } from '@angular/core';
import { salesQuotationsAttachment } from '../../DemoData/sales-quotations';
import { UIHelper } from '../../helpers/ui.helpers';
import { GridComponent } from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-sales-quotations-detail-attchment',
  templateUrl: './sales-quotations-detail-attchment.component.html',
  styleUrls: ['./sales-quotations-detail-attchment.component.scss']
})
export class SalesQuotationsDetailAttchmentComponent implements OnInit {

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

    this.getSalesQuotationAttachmentList();
  }

   /**
   * Method to get list of inquries from server.
  */
  public getSalesQuotationAttachmentList() {
    this.showLoader = true;
    this.gridData = salesQuotationsAttachment;
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
