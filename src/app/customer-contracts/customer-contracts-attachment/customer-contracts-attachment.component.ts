import { Component, OnInit, Input, HostListener } from '@angular/core';
import { CurrentSidebarInfo } from '../../models/sidebar/current-sidebar-info';
import { Configuration } from '../../helpers/Configuration';
import { UIHelper } from '../../helpers/ui.helpers';
import { GridComponent } from '../../../../node_modules/@progress/kendo-angular-grid';
import { salesOrderAttachment } from '../../DemoData/sales-order';

@Component({
  selector: 'app-customer-contracts-attachment',
  templateUrl: './customer-contracts-attachment.component.html',
  styleUrls: ['./customer-contracts-attachment.component.scss']
})
export class CustomerContractsAttachmentComponent implements OnInit {

  @Input() currentSidebarInfo: CurrentSidebarInfo;

  showGrid:boolean=true;

  imgPath = Configuration.imagePath;
  pageLimit;
  pagination:boolean;

  isMobile: boolean;
  isColumnFilterAttachementsGrid: boolean = false;
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
