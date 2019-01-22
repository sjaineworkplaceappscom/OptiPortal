import { Component, OnInit, Input, HostListener } from '@angular/core';
import { CurrentSidebarInfo } from 'src/app/models/sidebar/current-sidebar-info';
import { GridComponent } from '@progress/kendo-angular-grid';
import { UIHelper } from '../../helpers/ui.helpers';
import { serialAndBatchList } from '../../DemoData/consign';
import { Configuration } from '../../helpers/Configuration';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-consign-inventory-sr-batch-detail',
  templateUrl: './consign-inventory-sr-batch-detail.component.html',
  styleUrls: ['./consign-inventory-sr-batch-detail.component.scss']
})
export class ConsignInventorySRBatchDetailComponent implements OnInit {
  @Input() currentSidebarInfo:CurrentSidebarInfo;
  imgPath = Configuration.imagePath;
  public gridData: any[];
  isMobile: boolean;
  isSrBatchColumnFilter: boolean = false;
  gridHeight: number;
  showLoader: boolean = false;
  searchRequest: string = '';
  
  public configX: PerfectScrollbarConfigInterface = {
      suppressScrollY:true
  };

  tabName: string = 'home';
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

    this.getSrBatchList();
  }

  // tab function
  openTab(evt, tabName, tabType) {
    UIHelper.customOpenTab(evt, tabName, 'horizontal');
  }

  /**
   * Method to get list of inquries from server.
  */
  public getSrBatchList() {
    this.showLoader = true;
    this.gridData = serialAndBatchList;
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
