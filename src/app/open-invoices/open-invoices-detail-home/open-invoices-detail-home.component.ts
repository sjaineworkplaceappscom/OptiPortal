import { Component, OnInit } from '@angular/core';
import { Commonservice } from '../../services/commonservice.service';
import { OpenInvoiceService } from '../../services/open-invoice.service';
import { ISubscription } from 'rxjs/Subscription';
import { OpenInvoiceHeaderModel } from '../../tempmodels/open-invoice-header-model';
import { OpenInvoiceListModel } from '../../tempmodels/open-invoice-list-model';
import { DateTimeHelper } from '../../helpers/datetime.helper';
import { Configuration } from '../../helpers/Configuration';

@Component({
  selector: 'app-open-invoices-detail-home',
  templateUrl: './open-invoices-detail-home.component.html',
  styleUrls: ['./open-invoices-detail-home.component.scss']
})
export class OpenInvoicesDetailHomeComponent implements OnInit {

 
  public getDetailsubs: ISubscription;
  public getSidebarsubs: ISubscription;

  showLoader: boolean = false;
  openInvoiceHeaderModel: OpenInvoiceHeaderModel = new OpenInvoiceHeaderModel();
  openInvoiceListModel: OpenInvoiceListModel = new OpenInvoiceListModel();
  public dateformat:string=Configuration.getDisplayDateFormat();

  constructor(private commonService: Commonservice, private openInvoiceService: OpenInvoiceService) { }
  
  ngOnInit() { 
    this.getSidebarsubs = this.commonService.currentSidebarInfo.subscribe(
      currentSidebarData => {
        
        if(currentSidebarData.RequesterData!=null && currentSidebarData.RequesterData != undefined){
        console.log('side bar data'+currentSidebarData.RequesterData);
        this.openInvoiceListModel = currentSidebarData.RequesterData;
        let invoiceNumber: number = this.openInvoiceListModel.InvoiceNumber;
       this.getOpenInvoiceDetail(invoiceNumber);
      }
      }
    );
  }

    /** 
     * call api for Sales quotation detail .
     */
    getOpenInvoiceDetail(id: number) {
      this.showLoader = true;
      this.getDetailsubs = this.openInvoiceService.getOpenInvoiceDetail(id,1).subscribe(
        data => {
          this.showLoader = false;
          let dataArray: any[] = JSON.parse(data);
          this.openInvoiceHeaderModel = dataArray[0];
          this.openInvoiceHeaderModel.InvoiceDate = DateTimeHelper.ParseDate(this.openInvoiceHeaderModel.InvoiceDate);
          this.openInvoiceHeaderModel.DueDate = DateTimeHelper.ParseDate(this.openInvoiceHeaderModel.DueDate);
  
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
      if (this.getDetailsubs != undefined)
        this.getDetailsubs.unsubscribe();
    }
  

}
