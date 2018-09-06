import { Component, OnInit } from '@angular/core';
import { ISubscription } from '../../../../node_modules/rxjs/Subscription';
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

  // quotationNumber = 'Cust002';
  // Status = 'New';
  // validUntil = '02/08/2018';
  // documentDate = '02/08/2018';
  // salesEmployee = 'Ankur';
  // Owner = 'Sameer Sharma';
  // Remark = 'Apple';
  // placeOfSupply = 'Indore';
  // totalBeforeDiscount = '5%';
  // discountPercantage = '4%';
  // Discount = '52401';
  // Freight = '12';
  // Tax = '8521';
  // Total = '2514556';

  showLoader: boolean = false;
  public getSidebarsubs: ISubscription;
  public getOrderDetailsubs: ISubscription;
  salesOrderDetailModel: SalesOrderDetail = new SalesOrderDetail();

  constructor(private commonService: Commonservice, private salseOrderService: SalesOrderService) { }

  ngOnInit() { 
    console.log("oninit: salsodh");
    this.getSidebarsubs = this.commonService.currentSidebarInfo.subscribe(
      currentSidebarData => {
        console.log("oninit: salsodh subs");
        this.salesOrderDetailModel = currentSidebarData.RequesterData;
        let orderNo: number = this.salesOrderDetailModel.OrderNumber;
        this.getSalesOrderDetail(orderNo);  
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
        alert("Something went wrong");
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
