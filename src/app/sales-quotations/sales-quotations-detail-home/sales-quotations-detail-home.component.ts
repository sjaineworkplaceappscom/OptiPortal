import { Component, OnInit } from '@angular/core';
import { Commonservice } from '../../services/commonservice.service';
import { ISubscription } from '../../../../node_modules/rxjs/Subscription';
import { SalesQuotationsModule } from '../sales-quotations.module';
import { SalesQuotation } from '../../tempmodels/sales-quotation';
import { SalesQuotationService } from '../../services/sales-quotation.service';
@Component({
  selector: 'app-sales-quotations-detail-home',
  templateUrl: './sales-quotations-detail-home.component.html',
  styleUrls: ['./sales-quotations-detail-home.component.scss']
})
export class SalesQuotationsDetailHomeComponent implements OnInit {

  public sideBarsubs: ISubscription;
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

  salesQuotationModel:SalesQuotation = new SalesQuotation();
  constructor(private commonService: Commonservice, private salseQuotationService: SalesQuotationService ) { }
   
  ngOnInit() {
    console.log("oninit:");
    this.sideBarsubs = this.commonService.currentSidebarInfo.subscribe(
      currentSidebarData => {
        this.salesQuotationModel = currentSidebarData.RequesterData;
        //need to chech show data directly or from API call.
        console.log("side bar data:"+JSON.stringify(this.salesQuotationModel));
        //this.salesQuotationModel = JSON.parse( localStorage.getItem('SelectedSalseQuotation'))
      }
    );
  }


 /** 
    * call api for purchase inquiry detail.
    */
   callSalesQuotationDetailAPI(id: string) {
    // /salesquotation/list
     console.log("detail:" + id);
    //  this.showLoader = true;
    //  this.getPIsubs = this.purchaseInquiryService.getInquiryDetail(id).subscribe(
    //    data => { 
    //      this.showLoader = false;
    //      let dataArray: any[] = JSON.parse(data);
    //      this.purchaseInquiryDetail = dataArray[0];
    //      localStorage.setItem("SelectedPurchaseInquery",JSON.stringify(this.purchaseInquiryDetail));
    //      this.setModelAndSubscribeData();
           
    //    }, error => {  
    //      this.showLoader = false; 
    //      alert("Something went wrong");
    //      console.log("Error: ", error)
    //    }, () => { }
    //  );
   }

  ngOnDestroy(){
    if(this.sideBarsubs!=undefined)
    this.sideBarsubs.unsubscribe();
}

}
