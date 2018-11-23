import { Component, OnInit, HostListener } from '@angular/core';
import { GridComponent } from '../../../../../node_modules/@progress/kendo-angular-grid';
import { UIHelper } from '../../../helpers/ui.helpers';
import { Configuration } from '../../../helpers/Configuration';
import { paymentAttachment } from '../../../DemoData/vendor-data';
import { PaymentContentModel } from '../../../tempmodels/vendor/payment-content-model';
import { ISubscription } from '../../../../../node_modules/rxjs/Subscription';
import { VendorService } from '../../../services/vendor/vendor.service';

@Component({
  selector: 'app-vpayment-attachment',
  templateUrl: './vpayment-attachment.component.html',
  styleUrls: ['./vpayment-attachment.component.scss']
})
export class VpaymentAttachmentComponent implements OnInit {

  showGrid:boolean=true;

  imgPath = Configuration.imagePath;
  pageLimit;
  pagination:boolean;

  isMobile: boolean;
  isColumnFilterAttachementsGrid: boolean = false;
  isColumnGroup: boolean = false;
  gridHeight: number;
  showLoader: boolean = false;

  public gridData: any[];
  paymentModel: PaymentContentModel = new PaymentContentModel();
  public getVPIsubs: ISubscription;

  constructor(private vendorService: VendorService) { }

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

    let VPayment: string = localStorage.getItem("SelectedPayment");
    let vpaymentData: any = JSON.parse(VPayment);
    this.paymentModel = vpaymentData;
    if (this.paymentModel != null && this.paymentModel != undefined) {
      this.getPaymentAttachmentList(this.paymentModel.PaymentId + "");
    }
  }

  /** 
    * call api for purchase inquiry detail.
    */
   getPaymentAttachmentList(id: string) {
     
    // console.log("Update:data from LocalStorage:" + JSON.stringify(localStorage.getItem('SelectedPurchaseInquery')));
     this.showLoader = true;
     this.getVPIsubs = this.vendorService.getVendorDetailById(id,3+"").subscribe(
       data => { 
     
         this.showLoader = false;
         if(data!=null && data!=undefined && data != ""){
          this.gridData = JSON.parse(data);
       
         }
         else{
         }
       }, error => {  
         this.showLoader = false; 
         console.log("Error: ", error)
       }, () => { }
     );
   }

   /**
   * Method to get list of inquries from server.
  */
  public getPaymentAttachmentList1() {
    this.showLoader = true;
    this.gridData = paymentAttachment;
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

  back() {
    this.showGrid = true;
  }

  showAttachementForm(){
    this.showGrid = false;
  }

}
