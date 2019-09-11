import { Component, OnInit, HostListener } from '@angular/core';
import { GridComponent } from '@progress/kendo-angular-grid';
import { UIHelper } from '../../../helpers/ui.helpers';
import { Configuration } from '../../../helpers/Configuration';
import { vpiAttachment } from '../../../DemoData/vendor-data';
import { VendorPurchaseInquiryModel } from 'src/app/tempmodels/vendor/vendor-purchase-inquiry-model';
import { ISubscription } from 'rxjs/Subscription';
import { VendorService } from 'src/app/services/vendor/vendor.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-vendor-pi-attchments',
  templateUrl: './vendor-pi-attchments.component.html',
  styleUrls: ['./vendor-pi-attchments.component.scss']
})
export class VendorPiAttchmentsComponent implements OnInit {

  imgPath = Configuration.imagePath;
  pageLimit;
  pagination:boolean;

  isMobile: boolean;
  isColumnFilterAttachementsGrid: boolean = false;
  isColumnGroup: boolean = false;
  gridHeight: number;
  showLoader: boolean = false;

  public gridData: any[];

  VPIModel: VendorPurchaseInquiryModel = new VendorPurchaseInquiryModel();
  public getVPIsubs: ISubscription;

  constructor(private vendorService:VendorService ,private translate: TranslateService) { 
    translate.use(localStorage.getItem('appLanguage'));
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
    });
  }

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
      this.getVPIAttachmentList(this.VPIModel.InquiryId+"");
    }

    //this.getVPIAttachmentList();
  }

  /**
  * Method to get list of inquries from server.
  */
  public getVPIAttachmentList1() {
    this.showLoader = true;
    this.gridData = vpiAttachment;
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

   /** 
    * call api for purchase inquiry detail.
    */
   getVPIAttachmentList(id: string) {
     
    // console.log("Update:data from LocalStorage:" + JSON.stringify(localStorage.getItem('SelectedPurchaseInquery')));
     this.showLoader = true;
     this.getVPIsubs = this.vendorService.getVendorDetailById(id,3+"").subscribe(
       data => { 
     
         this.showLoader = false;
         if(data!=null && data!=undefined && data != ""){
          this.gridData = JSON.parse(data);
         // this.VPIModel.RequestedDate = VPIModel.ParseToUTC(this.VPIModel.RequestedDate);
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
