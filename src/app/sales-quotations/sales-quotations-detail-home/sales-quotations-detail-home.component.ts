import { Component, OnInit } from '@angular/core';
import { Commonservice } from '../../services/commonservice.service';
import { ISubscription } from 'rxjs/Subscription';
import { SalesQuotationsModule } from '../sales-quotations.module';
import { SalesQuotation } from '../../tempmodels/sales-quotation';
import { SalesQuotationService } from '../../services/sales-quotation.service';
import { SalesQuotationDetail } from '../../tempmodels/sales-quotation-detail';
import { DateTimeHelper } from '../../helpers/datetime.helper';
@Component({
  selector: 'app-sales-quotations-detail-home',
  templateUrl: './sales-quotations-detail-home.component.html',
  styleUrls: ['./sales-quotations-detail-home.component.scss']
})
export class SalesQuotationsDetailHomeComponent implements OnInit {

  public getDetailsubs: ISubscription;
  public getSidebarsubs: ISubscription;
  quotationNumber = 'Cust002';
  Status = 'New';
  validUntil = '02/08/2018';
  documentDate = '02/08/2018';
  salesEmployee = 'Ankur';
  Owner = 'Sameer Sharma';
  Remark = 'Apple';
  placeOfSupply = 'Indore';
  totalBeforeDiscount = '5%';
  discountPercantage = '4%';
  Discount = '52401';
  Freight = '12';
  Tax = '8521';
  Total = '2514556';
  showLoader: boolean = false;
  salesQuotationModel: SalesQuotation = new SalesQuotation();
  salesQuotationDetailModel: SalesQuotationDetail = new SalesQuotationDetail();
  constructor(private commonService: Commonservice, private salseQuotationService: SalesQuotationService) { }

  ngOnInit() {
    console.log("oninit:");
    this.getSidebarsubs = this.commonService.currentSidebarInfo.subscribe(
      currentSidebarData => {
        this.salesQuotationModel = currentSidebarData.RequesterData;
        let quotationNumber: number = this.salesQuotationModel.QuotationNumber;
        //need to chech show data directly or from API call.
        //   console.log("side bar data:" + JSON.stringify(this.salesQuotationModel));
        //this.salesQuotationModel = JSON.parse( localStorage.getItem('SelectedSalseQuotation'))
        this.callSalesQuotationDetailAPI(quotationNumber);
      }
    );
  }


  /** 
     * call api for purchase inquiry detail.
     */
  callSalesQuotationDetailAPI(id: number) {

    this.showLoader = true;
    this.getDetailsubs = this.salseQuotationService.getSalesQuotationDetail(id).subscribe(
      data => {
        this.showLoader = false;
        let dataArray: any[] = JSON.parse(data);
        this.salesQuotationDetailModel = dataArray[0];
        this.salesQuotationDetailModel.DocumentDate = DateTimeHelper.ParseDate(this.salesQuotationDetailModel.DocumentDate);
        this.salesQuotationDetailModel.ValidUntil = DateTimeHelper.ParseDate(this.salesQuotationDetailModel.ValidUntil);

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
    if (this.getDetailsubs != undefined)
      this.getDetailsubs.unsubscribe();
  }

}
