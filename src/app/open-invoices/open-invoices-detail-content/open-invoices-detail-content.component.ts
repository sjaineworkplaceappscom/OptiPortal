import { Component, OnInit, HostListener } from '@angular/core';
import { UIHelper } from '../../helpers/ui.helpers';
import { openInvoicesContent } from '../../demodata/open-invoices';
import { GridComponent } from '@progress/kendo-angular-grid';
import { Configuration } from '../../../assets/configuration';
import { ISubscription } from '../../../../node_modules/rxjs/Subscription';
import { OpenInvoiceListModel } from '../../tempmodels/open-invoice-list-model';
import { OpenInvoiceService } from '../../services/open-invoice.service';

@Component({
  selector: 'app-open-invoices-detail-content',
  templateUrl: './open-invoices-detail-content.component.html',
  styleUrls: ['./open-invoices-detail-content.component.scss']
})

export class OpenInvoicesDetailContentComponent implements OnInit {

  imgPath = Configuration.imagePath;
  pageLimit;
  pagination:boolean;

  isMobile: boolean;
  isColumnFilter: boolean = false;
  isColumnGroup: boolean = false;
  gridHeight: number;

  showLoader: boolean = false;
  public gridData: any[];
  public getDetailsubs: ISubscription;
  openInvoiceListModel: OpenInvoiceListModel = new OpenInvoiceListModel();
  
  constructor(private openInvoiceService: OpenInvoiceService) { }

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

    this.getOpenInvoiceContentList1();
    this.openInvoiceListModel = JSON.parse(localStorage.getItem('SelectedOpenInvoice'));
    let invoiceNumber: number = this.openInvoiceListModel.InvoiceNumber;
    
  }

  /**
   * Method to get list of inquries from server.
  */
  public getOpenInvoiceContentList1() {
    this.showLoader = true;
    this.gridData = openInvoicesContent;
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
   * call api for Sales quotation detail.
   */
  getOpenInvoiceContentList(id: number) {
    this.showLoader = true;
    
    this.getDetailsubs = this.openInvoiceService.getOpenInvoiceDetail(id,2).subscribe(
      data => {
        
        this.showLoader = false;
        if (data != null && data != undefined) {
          this.gridData = JSON.parse(data);
          this.gridData.forEach(element => {
        //  element.DeliveryDate = DateTimeHelper.ParseDate(element.DeliveryDate);
        });
        this.showLoader = false;
      }

      }, error => {
        this.showLoader = false;
        alert("Something went wrong");
        console.log("Error: ", error)
      }, () => { }
    );
  }

  ngOnDestroy() {
    if (this.getDetailsubs != undefined)
      this.getDetailsubs.unsubscribe();
   }

}