import { Component, OnInit, HostListener } from '@angular/core';
import { UIHelper } from '../../helpers/ui.helpers';
import { Commonservice } from '../../services/commonservice.service';
import { data2 } from '../../demodata/data2';
import { GridComponent } from '@progress/kendo-angular-grid';
import { Configuration } from '../../../assets/configuration';


@Component({
  selector: 'app-customer-purchase-order-list',
  templateUrl: './customer-purchase-order-list.component.html',
  styleUrls: ['./customer-purchase-order-list.component.scss']
})
export class CustomerPurchaseOrderListComponent implements OnInit {

  imgPath = Configuration.imagePath;

  isMobile: boolean;
  isColumnFilter: boolean = false;
  isColumnGroup: boolean = false;
  gridHeight: number;
  showLoader: boolean = false;
  searchRequest: string = '';

  pageLimit:string;
  pagination:boolean;
  
  // UI Section
  @HostListener('window:resize', ['$event'])
  onResize(event) {

    // show/hide pagintaion
    this.paginationAttributes();

    // apply grid height
    this.gridHeight = UIHelper.getMainContentHeight();

    // check mobile device
    this.isMobile = UIHelper.isMobile();
  }
  // End UI Section

  

  constructor(private commonService:Commonservice) { }

  public gridData: any[];

  public paginationAttributes(){
    this.isMobile = UIHelper.isMobile();
    if(this.isMobile==true){
      this.pageLimit = '';
      this.pagination = false;
    }else{
      this.pageLimit = '50';
      this.pagination = true;
    }
  }

  ngOnInit() {

    // Apply class on body start
    const element = document.getElementsByTagName("body")[0];
    element.className = "";
    element.classList.add("opti_body-customer-purchase-order");
    element.classList.add("opti_body-main-module");
    // Apply class on body end

    // show/hide pagintaion
    this.paginationAttributes();

    // apply grid height
    this.gridHeight = UIHelper.getMainContentHeight();

    // check mobile device
    this.isMobile = UIHelper.isMobile();
    
    this.getCustomerPurchaseOrderList();
  }

  /**
   * Method to get list of inquries from server.
  */
  public getCustomerPurchaseOrderList() {
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
