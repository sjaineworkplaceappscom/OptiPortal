import { Component, OnInit } from '@angular/core';
import { ISubscription } from '../../../../node_modules/rxjs/Subscription';
import { Commonservice } from '../../services/commonservice.service';
import { SalesQuotation } from '../../tempmodels/sales-quotation';
import { SalesOrder } from '../../tempmodels/sales-order';
import { SalesOrderService } from '../../services/sales-order.service';
import { DateTimeHelper } from '../../helpers/datetime.helper';

@Component({
  selector: 'app-sales-order-detail-home',
  templateUrl: './sales-order-detail-home.component.html',
  styleUrls: ['./sales-order-detail-home.component.scss']
})
export class SalesOrderDetailHomeComponent implements OnInit {

  quotationNumber = 'Cust002';
  Status = 'New';
  validUntil = '02/08/2018';
  documentDate= '02/08/2018';
  salesEmployee = 'Ankur';
  Owner = 'Sameer Sharma';
  Remark = 'Apple';
  placeOfSupply= 'Indore';
  totalBeforeDiscount = '5%';
  discountPercantage = '4%';
  Discount = '52401';
  Freight = '12';
  Tax = '8521';
  Total = '2514556';

  showLoader: boolean = false;
  public getSidebarsubs: ISubscription;
  public getOrderDetailsubs: ISubscription;
  salesOrderModel: SalesOrder = new SalesOrder();

  constructor(private commonService: Commonservice , private salseOrderService: SalesOrderService) { }

  ngOnInit() {
    console.log("oninit:");
    debugger;
    this.getSidebarsubs = this.commonService.currentSidebarInfo.subscribe(
      currentSidebarData => {
        this.salesOrderModel = currentSidebarData.RequesterData;
        let orderNumber: number = this.salesOrderModel.OrderNumber;
        this.getSalesOrderDetail(orderNumber);
      }
    );
    console.log("s o d h");
  }


  /** 
     * call api for Sales quotation detail .
     */
    getSalesOrderDetail(id: number) {

      this.showLoader = true;
      // this.getOrderDetailsubs = this.salseOrderService.getSales(id).subscribe(
      //   data => {
      //     this.showLoader = false;
      //     let dataArray: any[] = JSON.parse(data);
      //     this.salesQuotationDetailModel = dataArray[0];
      //     this.salesQuotationDetailModel.DocumentDate = DateTimeHelper.ParseDate(this.salesQuotationDetailModel.DocumentDate);
      //     this.salesQuotationDetailModel.ValidUntil = DateTimeHelper.ParseDate(this.salesQuotationDetailModel.ValidUntil);
  
      //   }, error => {
      //     this.showLoader = false;
      //     alert("Something went wrong");
      //     console.log("Error: ", error)
      //   }, () => { }
      // );
    }
  
    ngOnDestroy() {
      if (this.getSidebarsubs != undefined)
        this.getSidebarsubs.unsubscribe();
     
    }

}
