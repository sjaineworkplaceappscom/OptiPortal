import { Component, OnInit, HostListener } from '@angular/core';
import { UIHelper } from '../../helpers/ui.helpers';
import { Commonservice } from '../../services/commonservice.service';
import { data2 } from '../../demodata/data2';
import { GridComponent } from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-delivery-notes-list',
  templateUrl: './delivery-notes-list.component.html',
  styleUrls: ['./delivery-notes-list.component.scss']
})
export class DeliveryNotesListComponent implements OnInit {

  isMobile: boolean;
  isColumnFilter: boolean = false;
  isColumnGroup: boolean = false;
  gridHeight: number;
  showLoader: boolean = false;
  searchRequest: string = '';
  
  // UI Section
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // apply grid height
    this.gridHeight = UIHelper.getMainContentHeight();

    // check mobile device
    this.isMobile = UIHelper.isMobile();
  }
  // End UI Section

  

  constructor(private commonService:Commonservice) { }

  public gridData: any[];

  ngOnInit() {
    // apply grid height
    this.gridHeight = UIHelper.getMainContentHeight();

    // check mobile device
    this.isMobile = UIHelper.isMobile();

    
    this.getDeliveryNotesList();
  }

  /**
   * Method to get list of inquries from server.
  */
  public getDeliveryNotesList() {
    this.showLoader = true;
    this.gridData = data2;
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