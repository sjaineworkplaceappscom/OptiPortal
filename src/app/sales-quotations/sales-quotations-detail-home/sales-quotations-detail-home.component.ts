import { Component, OnInit } from '@angular/core';
import { Commonservice } from '../../services/commonservice.service';
import { ISubscription } from 'rxjs/Subscription';
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
   
  showLoader: boolean = false;
  salesQuotationModel: SalesQuotation = new SalesQuotation();
  salesQuotationDetailModel: SalesQuotationDetail = new SalesQuotationDetail();
  constructor(private commonService: Commonservice, private salseQuotationService: SalesQuotationService) { }

  ngOnInit() {
    console.log("oninit: salseqdh");
    this.getSidebarsubs = this.commonService.currentSidebarInfo.subscribe(
      currentSidebarData => {
        console.log("oninit: salseqdh subs");
        
        this.salesQuotationModel = currentSidebarData.RequesterData;
        let quotationId: number = this.salesQuotationModel.QuotationId;
        this.getSalesQuotationDetail(quotationId);
      }
    );
  }

  /** 
     * call api for Sales quotation detail .
     */
  getSalesQuotationDetail(id: number) {

    this.showLoader = true;
    
    this.getDetailsubs = this.salseQuotationService.getSalesQuotationDetail(id,1).subscribe(
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
