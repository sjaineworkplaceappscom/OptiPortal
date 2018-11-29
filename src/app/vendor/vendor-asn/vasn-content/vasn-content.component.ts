import { Component, OnInit, HostListener } from '@angular/core';
import { GridComponent } from '@progress/kendo-angular-grid';
import { UIHelper } from '../../../helpers/ui.helpers';
import { Configuration } from '../../../helpers/Configuration';
import { invoiceContent } from '../../../DemoData/vendor-data';
import { VendorASNModel } from 'src/app/tempmodels/vendor/vendor-asn-model';
import { ToastService } from 'src/app/helpers/services/toast.service';
import { SharedComponentService } from 'src/app/services/shared-component.service';
import { Commonservice } from 'src/app/services/commonservice.service';
import { VendorService } from 'src/app/services/vendor/vendor.service';
import { ISubscription } from 'rxjs/Subscription';
import { DateTimeHelper } from 'src/app/helpers/datetime.helper';

@Component({
  selector: 'app-vasn-content',
  templateUrl: './vasn-content.component.html',
  styleUrls: ['./vasn-content.component.scss']
})
export class VasnContentComponent implements OnInit {

  showGrid:boolean=true;
  addContent:boolean = false;
  editContent:boolean = false;

  imgPath = Configuration.imagePath;
  pageLimit;
  pagination:boolean;

  isMobile: boolean;
  isColumnFilterContentGrid: boolean = false;
  isColumnGroup: boolean = false;
  gridHeight: number;
  showLoader: boolean = false;
  vendorASNModel:VendorASNModel;
  public gridData: any[];
  getContentsub: ISubscription;
  refreshVASNContentlistSubs: ISubscription;
  constructor(private commonService: Commonservice, private vendorService: VendorService, private toast: ToastService) { }



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
    //get status of selected inquiry for disabling or enabling  forms
    let vendorDetail: string = localStorage.getItem("SelectedVASN");
    this.vendorASNModel=JSON.parse(vendorDetail);
    
    if (this.vendorASNModel != null && this.vendorASNModel != undefined) {
    }

    this.refreshVASNContentlistSubs = this.commonService.refreshVOIListSubscriber.subscribe(
      data => {
         if (data != undefined && data != null)
        // this.getVASNList();
        this.getVASNContentList(data);
        });

    // this.getContentList(id);
    
  }

   /**
  * Method to get list of inquries from server.
  */
 public getVASNContentList(id: string) {

  this.showLoader = true;
  this.getContentsub = this.vendorService.getVendorASNContentList(id).subscribe(
    VASNContentData => {
      if (VASNContentData != null && VASNContentData != undefined) {
        this.gridData = JSON.parse(VASNContentData);
        this.gridData.forEach(element => {
          element.DeliveryDate = DateTimeHelper.ParseDate(element.DeliveryDate);
        });
        this.showLoader = false;
      }
    },
    error => {
      this.showLoader = false;
    },
    () => {
      this.showLoader = false;
    }
  );
}

  onFilterChange(checkBox:any,grid:GridComponent){
    if(checkBox.checked==false){
      this.clearFilter(grid);
    }
  }

  clearFilter(grid:GridComponent){      
    //grid.filter.filters=[];
  }

  back() {
    this.addContent = false;
    this.editContent = false;
    this.showGrid = true;
  }

  showContentForm(){
    this.showGrid = false;
    this.editContent = false;
    this.addContent = true;
  }

  edit(e){
    this.showGrid = false;
    this.addContent = false;
    this.editContent = true;
  }
  
  openContentDetailOnSelection(selection) {
    this.showGrid = false;
    this.addContent = false;
    this.editContent = true;
    // Reset Selection.
    selection.selectedRows=[];  
  }

}
