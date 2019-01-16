import { Component, OnInit, HostListener } from '@angular/core';
import { VendorPurchaseInquiryModel } from 'src/app/tempmodels/vendor/vendor-purchase-inquiry-model';
import { DateTimeHelper } from 'src/app/helpers/datetime.helper';
import { VendorService } from 'src/app/services/vendor/vendor.service';
import { ISubscription } from 'rxjs/Subscription';
import { VendorPurchaseInquiryContentModel } from 'src/app/tempmodels/vendor/vendor-pi-content-model';
import { UIHelper } from 'src/app/helpers/ui.helpers';
import { Configuration } from 'src/app/helpers/Configuration';

@Component({
  selector: 'app-vendor-pi-content',
  templateUrl: './vendor-pi-content.component.html',
  styleUrls: ['./vendor-pi-content.component.scss']
})
export class VendorPiContentComponent implements OnInit {

  imgPath = Configuration.imagePath;

  displayDateformat:string=Configuration.getDisplayDateFormat(true);

  VPIModel: VendorPurchaseInquiryModel = new VendorPurchaseInquiryModel();
  VPIContentModel:VendorPurchaseInquiryContentModel = new VendorPurchaseInquiryContentModel();
  showLoader: boolean = false;
  public getVPIsubs: ISubscription;
  constructor(private vendorService:VendorService) { }
  gridData = [];


  isMobile: boolean;
  isColumnFilterVPI: boolean = false;
  gridHeight: number;

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

    //get status of selected order for disabling or enabling  forms
    let VPI: string = localStorage.getItem("SelectedVPI");
    let vpiData: any = JSON.parse(VPI);
    this.VPIModel = vpiData;
    
    if(this.VPIModel!=null && this.VPIModel != undefined){
      this.callVendorPurchaseInquiryDetailAPI(this.VPIModel.InquiryId+"");
    }
  }

   /** 
    * call api for purchase inquiry detail.
    */
   callVendorPurchaseInquiryDetailAPI(id: string) {
     
    // console.log("Update:data from LocalStorage:" + JSON.stringify(localStorage.getItem('SelectedPurchaseInquery')));
     this.showLoader = true;
     this.getVPIsubs = this.vendorService.getVendorDetailById(id,2+"").subscribe(
       data => { 
         
         this.showLoader = false;
         if(data!=null && data!=undefined && data != ""){
          let dataArray: any[] = JSON.parse(data);
          debugger;
          this.gridData = JSON.parse(data);
          this.gridData.forEach(element => {
            element.RequestedDate = DateTimeHelper.ParseDate(element.RequestedDate);
           
          });
          //this.VPIContentModel = dataArray[0];
          //this.VPIContentModel.RequestedDate = DateTimeHelper.ParseToUTC(this.VPIContentModel.RequestedDate);
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
    if (this.getVPIsubs != undefined)
      this.getVPIsubs.unsubscribe();
   
  }
}


