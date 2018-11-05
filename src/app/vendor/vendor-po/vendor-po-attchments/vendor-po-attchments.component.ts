import { Component, OnInit, HostListener } from '@angular/core';
import { GridComponent } from '../../../../../node_modules/@progress/kendo-angular-grid';
import { UIHelper } from '../../../helpers/ui.helpers';
import { Configuration } from '../../../helpers/Configuration';
import { vpiAttachment } from '../../../DemoData/vendor-data';

@Component({
  selector: 'app-vendor-po-attchments',
  templateUrl: './vendor-po-attchments.component.html',
  styleUrls: ['./vendor-po-attchments.component.scss']
})
export class VendorPoAttchmentsComponent implements OnInit {

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

    this.getVPOAttachmentList();
  }

   /**
   * Method to get list of inquries from server.
  */
  public getVPOAttachmentList() {
    this.showLoader = true;
    this.gridData = vpiAttachment;
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
