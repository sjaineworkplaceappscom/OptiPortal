import { Component, OnInit, HostListener } from '@angular/core';
import { invoiceContent } from '../../../DemoData/vendor-data';
import { GridComponent } from '@progress/kendo-angular-grid';
import { UIHelper } from '../../../helpers/ui.helpers';
import { Configuration } from '../../../helpers/Configuration';
import { ISubscription } from 'rxjs/Subscription';
import { DateTimeHelper } from 'src/app/helpers/datetime.helper';
import { VendorOIService } from 'src/app/services/vendor/vendor-o-i.service';
import { VendorOIModel } from 'src/app/tempmodels/vendor/vendor-OI-model';
import { VOIContentModel } from 'src/app/tempmodels/vendor/vendor-oi-content-model';

@Component({
  selector: 'app-vendor-p-invoice-content',
  templateUrl: './vendor-p-invoice-content.component.html',
  styleUrls: ['./vendor-p-invoice-content.component.scss']
})
export class VendorPInvoiceContentComponent implements OnInit {


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

  public gridData: any[];

  constructor( private vendorOIService: VendorOIService) { }

  // UI Section
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // apply grid height
    this.gridHeight = UIHelper.getMainContentHeight();

    // check mobile device
    this.isMobile = UIHelper.isMobile();
  }
  // End UI Section
  getOIlistSubs: ISubscription;
  refreshOIlistSubs: ISubscription;
  vOIModel: VendorOIModel; 

  ngOnInit() {
    // apply grid height
    this.gridHeight = UIHelper.getMainContentHeight();
    // check mobile device
    this.isMobile = UIHelper.isMobile();
    let selectedVOI: string = localStorage.getItem("SelectedVOI");
    var id ='';
    if (selectedVOI != null && selectedVOI != undefined) {
      this.vOIModel = JSON.parse(selectedVOI);
      id = this.vOIModel.InvoiceId;
    }
    this.getContentList(id);
  }

   /**
   * Method to get list of inquries from server.
  */
  public getContentList1(){
    this.showLoader = true;
    this.gridData = invoiceContent;
    setTimeout(()=>{    
      this.showLoader = false;
    }, 1000);
  }

  /**
  * Method to get list of inquries from server.
  */
 public getContentList(id:string) {
   debugger;
  this.showLoader = true;
  this.getOIlistSubs = this.vendorOIService.getVendorOIContentList(id).subscribe(
    OICData => {
      if (OICData != null && OICData != undefined) {
        this.gridData = JSON.parse(OICData);
        this.gridData.forEach(element => {
          element.InvoiceDate = DateTimeHelper.ParseDate(element.InvoiceDate);
          element.PaymentDueDate = DateTimeHelper.ParseDate(element.PaymentDueDate);
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
  voiContentModelForUpdate: VOIContentModel;
  openContentDetailOnSelection(selection) {
       
    let selectedContentItem = this.gridData[selection.index];
    this.showGrid = false;
    this.addContent = false;
    this.editContent = true;
    this.voiContentModelForUpdate = selectedContentItem;
    // Reset Selection.
    selection.selectedRows=[];  
  }

}
