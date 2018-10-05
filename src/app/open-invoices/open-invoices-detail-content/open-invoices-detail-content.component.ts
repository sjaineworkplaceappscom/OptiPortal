import { Component, OnInit, HostListener } from '@angular/core';
import { UIHelper } from '../../helpers/ui.helpers';
import { openInvoicesContent } from '../../demodata/open-invoices';
import { GridComponent } from '@progress/kendo-angular-grid';
import { Configuration } from '../../helpers/Configuration';


@Component({
  selector: 'app-open-invoices-detail-content',
  templateUrl: './open-invoices-detail-content.component.html',
  styleUrls: ['./open-invoices-detail-content.component.scss']
})

export class OpenInvoicesDetailContentComponent implements OnInit {

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
    this.gridData = openInvoicesContent;
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