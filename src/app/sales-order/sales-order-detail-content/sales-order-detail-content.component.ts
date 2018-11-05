import { Component, OnInit, HostListener } from '@angular/core';
import { UIHelper } from '../../helpers/ui.helpers';
import { GridComponent } from '@progress/kendo-angular-grid';
import { salesOrderContent } from '../../DemoData/sales-order';
import { SalesOrder } from '../../tempmodels/sales-order';
import { SalesQuotationService } from '../../services/sales-quotation.service';
import { SalesOrderService } from '../../services/sales-order.service';
import { ISubscription } from 'rxjs/Subscription';
import { DateTimeHelper } from '../../helpers/datetime.helper';
import { Configuration } from '../../helpers/Configuration';


@Component({
  selector: 'app-sales-order-detail-content',
  templateUrl: './sales-order-detail-content.component.html',
  styleUrls: ['./sales-order-detail-content.component.scss']
})
export class SalesOrderDetailContentComponent implements OnInit {
  imgPath = Configuration.imagePath;
  public gridData: any[];
  isMobile: boolean;
  isColumnFilter: boolean = false;
  isColumnGroup: boolean = false;
  gridHeight: number;
  showLoader: boolean = false;
  searchRequest: string = '';
  salesOrderModel: SalesOrder = new SalesOrder();
  public getSalseContentsubs: ISubscription;

  constructor(private salseOrderService: SalesOrderService) { }

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
    this.salesOrderModel = JSON.parse(localStorage.getItem('SelectedSalesOrder'))
    let orderNumber: number = this.salesOrderModel.OrderId;
    this.getSalesOrderContentList(orderNumber);
    //this.getSalesOrderContentList1();
  }

  /**
   * Method to get list of inquries from server.
  */
  public getSalesOrderContentList1() {
    this.showLoader = true;
    this.gridData = salesOrderContent;
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

  /** 
   * call api for Sales order detail content.
   */
  getSalesOrderContentList(id: number) {
    this.showLoader = true;
    this.getSalseContentsubs = this.salseOrderService.getSalesOrderDetail(id,2).subscribe(
      data => {
        this.showLoader = false;
        if (data != null && data != undefined) {
          this.gridData = JSON.parse(data);
          this.gridData.forEach(element => {
          element.DeliveryDate = DateTimeHelper.ParseDate(element.DeliveryDate);
        });
        this.showLoader = false;
      }

      }, error => {
        this.showLoader = false;
        //alert("Something went wrong");
        console.log("Error: ", error)
      }, () => { }
    );
  }

}
