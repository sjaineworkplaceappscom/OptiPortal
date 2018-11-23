import { Component, OnInit } from '@angular/core';
import { PaymentContentModel } from '../../../tempmodels/vendor/payment-content-model';
import { PaymentModel } from '../../../tempmodels/vendor/payment-model';
import { ISubscription } from '../../../../../node_modules/rxjs/Subscription';
import { VendorService } from '../../../services/vendor/vendor.service';
import { DateTimeHelper } from '../../../helpers/datetime.helper';

@Component({
  selector: 'app-vpayment-content',
  templateUrl: './vpayment-content.component.html',
  styleUrls: ['./vpayment-content.component.scss']
})
export class VpaymentContentComponent implements OnInit {

  contentModel: PaymentContentModel = new PaymentContentModel();
  paymentModel: PaymentModel = new PaymentModel();
  showLoader: boolean = false;
  public getpaymentsubs: ISubscription;

  constructor(private vendorService:VendorService) { }

  ngOnInit() {
    //get status of selected order for disabling or enabling  forms
    let Payment: string = localStorage.getItem("SelectedPayment");
    let paymentData: any = JSON.parse(Payment);
    this.contentModel = paymentData;
    
    if(this.contentModel!=null && this.contentModel != undefined){
      this.PaymentContents(this.contentModel.PaymentId+"");
  }
}

 /** 
    * call api for payment content detail.
    */
   PaymentContents(id: string) {
     this.showLoader = true;
     this.getpaymentsubs = this.vendorService.getPaymentDetailById(id,2+"").subscribe(
       data => { 
         
         this.showLoader = false;
         if(data!=null && data!=undefined && data != ""){
          let dataArray: any[] = JSON.parse(data);
          this.contentModel = dataArray[0];
          this.contentModel.DeliveryDate = DateTimeHelper.ParseToUTC(this.contentModel.DeliveryDate);
         }
         else{
         }
       }, error => {  
         this.showLoader = false; 
         console.log("Error: ", error)
       }, () => { }
     );
   }

   ngOnDestroy() {
    if (this.getpaymentsubs != undefined)
      this.getpaymentsubs.unsubscribe();
   }
}
