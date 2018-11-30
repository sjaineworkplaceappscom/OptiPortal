import { Component, OnInit, HostListener } from '@angular/core';
import { GridComponent } from '../../../../../node_modules/@progress/kendo-angular-grid';
import { UIHelper } from '../../../helpers/ui.helpers';
import { Configuration } from '../../../helpers/Configuration';
import { vpiAttachment } from '../../../DemoData/vendor-data';
import { VendorService } from 'src/app/services/vendor/vendor.service';
import { VendorPOContentModel } from 'src/app/tempmodels/vendor/vendor-po-content-model';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-vendor-po-attchments',
  templateUrl: './vendor-po-attchments.component.html',
  styleUrls: ['./vendor-po-attchments.component.scss']
})
export class VendorPoAttchmentsComponent implements OnInit {

  imgPath = Configuration.imagePath;
  pageLimit;
  pagination: boolean;

  isMobile: boolean;
  isColumnFilterAttachementsGrid: boolean = false;
  isColumnGroup: boolean = false;
  gridHeight: number;
  showLoader: boolean = false;

  public gridData: any[];
  VPOModel: VendorPOContentModel = new VendorPOContentModel();
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
    //get status of selected order for disabling or enabling  forms
    let VPI: string = localStorage.getItem("SelectedVPO");
    let vpiData: any = JSON.parse(VPI);
    this.VPOModel = vpiData;
    if (this.VPOModel != null && this.VPOModel != undefined) {
      this.getVPIAttachmentList(this.VPOModel.POId + "");
    }

    this.getVPOAttachmentList();
  }

  ngOnDestroy() {
    if (this.getVPIsubs != undefined)
      this.getVPIsubs.unsubscribe();
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
  public getVPOAttachmentList() {
    this.showLoader = true;
    this.gridData = vpiAttachment;
    setTimeout(() => {
      this.showLoader = false;
    }, 1000);
  }
  
  onFilterChange(checkBox: any, grid: GridComponent) {
    if (checkBox.checked == false) {
      this.clearFilter(grid);
    }
  }

  clearFilter(grid: GridComponent) {
    //grid.filter.filters=[];
  }

}
