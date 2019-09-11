import { Component, OnInit } from '@angular/core';
import { ISubscription } from '../../../../../node_modules/rxjs/Subscription';
import { PaymentModel } from '../../../tempmodels/vendor/payment-model';
import { Commonservice } from '../../../services/commonservice.service';
import { VendorService } from '../../../services/vendor/vendor.service';
import { ToastService } from '../../../helpers/services/toast.service';
import { DateTimeHelper } from '../../../helpers/datetime.helper';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-vpayment-home',
  templateUrl: './vpayment-home.component.html',
  styleUrls: ['./vpayment-home.component.scss']
})
export class VpaymentHomeComponent implements OnInit {

  public sideBarsubs: ISubscription;
  public getpaymentsubs: ISubscription;
  showLoader: boolean = false;
  paymentModel: PaymentModel = new PaymentModel();

  constructor(private commonService: Commonservice, private vendorService: VendorService,private toast:ToastService,private translate: TranslateService) { 
    translate.use(localStorage.getItem('appLanguage'));
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
    });
  }

  ngOnInit() {
    this.sideBarsubs = this.commonService.currentSidebarInfo.subscribe(
      currentSidebarData => {
        if (currentSidebarData != null && currentSidebarData != undefined) {
          this.showLoader = true;
          this.paymentModel = currentSidebarData.RequesterData;
          if (this.paymentModel != null) {
            this.PaymentDetail(this.paymentModel.PaymentId + "");
          } else { }
        }
      },
      error => {
        this.showLoader = false;
        console.log("Error: ", error)
      }

    );
  }

  /** 
     * call api for purchase inquiry detail.
     */
    PaymentDetail(id: string) {

      // console.log("Update:data from LocalStorage:" + JSON.stringify(localStorage.getItem('SelectedPurchaseInquery')));
      this.showLoader = true;
      this.getpaymentsubs = this.vendorService.getPaymentDetailById(id, 1 + "").subscribe(
        data => {
  
          this.showLoader = false;
          let dataArray: any[] = JSON.parse(data);
          this.paymentModel = dataArray[0];
          this.paymentModel.PaymentDate = DateTimeHelper.ParseToUTC(this.paymentModel.PaymentDate);
  
        }, error => {
          this.showLoader = false;
          //alert("Something went wrong");
          console.log("Error: ", error)
        }, () => { }
      );
    }

    ngOnDestroy() {
      if (this.sideBarsubs != undefined)
        this.sideBarsubs.unsubscribe();
      if (this.getpaymentsubs != undefined)
        this.getpaymentsubs.unsubscribe();
    }
}
