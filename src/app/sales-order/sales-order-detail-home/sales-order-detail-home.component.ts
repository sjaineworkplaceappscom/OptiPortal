import { Component, OnInit } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { Commonservice } from '../../services/commonservice.service';
import { SalesQuotation } from '../../tempmodels/sales-quotation';
import { SalesOrder } from '../../tempmodels/sales-order';
import { SalesOrderService } from '../../services/sales-order.service';
import { DateTimeHelper } from '../../helpers/datetime.helper';
import { SalesOrderDetail } from '../../tempmodels/sales-order-detail';

@Component({
  selector: 'app-sales-order-detail-home',
  templateUrl: './sales-order-detail-home.component.html',
  styleUrls: ['./sales-order-detail-home.component.scss']
})
export class SalesOrderDetailHomeComponent implements OnInit {



  showLoader: boolean = false;
  public getSidebarsubs: ISubscription;
  public getOrderDetailsubs: ISubscription;
  salesOrderDetailModel: SalesOrderDetail = new SalesOrderDetail();

  constructor(private commonService: Commonservice, private salseOrderService: SalesOrderService) { }

  ngOnInit() { 
    debugger;
    console.log("item","sodhome component");
    this.getSidebarsubs = this.commonService.currentSidebarInfo.subscribe(
      currentSidebarData => {
        console.log("item","in subscriber code");
        this.salesOrderDetailModel = currentSidebarData.RequesterData;
        if(this.salesOrderDetailModel!=null){
          let orderNo: number = this.salesOrderDetailModel.OrderId;
          this.getSalesOrderDetail(orderNo);  
        }
        
        
      }
    );
  }


  /** 
     * call api for Sales order detail .
     */
  getSalesOrderDetail(id: number) {

    this.showLoader = true;
    this.getOrderDetailsubs = this.salseOrderService.getSalesOrderDetail(id,1).subscribe(
      data => {
        this.showLoader = false; 
        let dataArray: any[] = JSON.parse(data);
        this.salesOrderDetailModel = dataArray[0];
        this.salesOrderDetailModel.DocumentDate = DateTimeHelper.ParseDate(this.salesOrderDetailModel.DocumentDate);
        this.salesOrderDetailModel.DeliveryDate = DateTimeHelper.ParseDate(this.salesOrderDetailModel.DeliveryDate);
        
      }, error => {
        this.showLoader = false;
        //alert("Something went wrong");
        console.log("Error: ", error)
      }, () => { }
    );
  }

  ngOnDestroy() {
    if (this.getSidebarsubs != undefined)
      this.getSidebarsubs.unsubscribe();
    if (this.getOrderDetailsubs != undefined)
      this.getOrderDetailsubs.unsubscribe();
  }

}
