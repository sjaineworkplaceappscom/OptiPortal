import { Component, OnInit, HostListener } from '@angular/core';
import { salesQuotationsAttachment } from '../../DemoData/sales-quotations';
import { UIHelper } from '../../helpers/ui.helpers';
import { GridComponent } from '@progress/kendo-angular-grid';
import { SalesQuotation } from '../../tempmodels/sales-quotation';
import { ISubscription } from '../../../../node_modules/rxjs/Subscription';
import { SalesQuotationService } from '../../services/sales-quotation.service';
import { DateTimeHelper } from '../../helpers/datetime.helper';

@Component({
  selector: 'app-sales-quotations-detail-attchment',
  templateUrl: './sales-quotations-detail-attchment.component.html',
  styleUrls: ['./sales-quotations-detail-attchment.component.scss']
})
export class SalesQuotationsDetailAttchmentComponent implements OnInit {

  public gridData: any[];
  isMobile: boolean;
  isColumnFilter: boolean = false;
  isColumnGroup: boolean = false;
  gridHeight: number;
  showLoader: boolean = false;
  searchRequest: string = '';
  salesQuotationModel: SalesQuotation = new SalesQuotation();
  public getDetailAttachsubs: ISubscription;
  constructor( private salseQuotationService: SalesQuotationService) { }

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

    this.salesQuotationModel = JSON.parse(localStorage.getItem('SelectedSalseQuotation'))
    let quotationNumber: number = this.salesQuotationModel.QuotationNumber;
    this.getSalesQuotationAttachmentList(quotationNumber);

  }

   /**
   * Method to get list of inquries from server.
  */
  public getSalesQuotationAttachmentList1() {
    this.showLoader = true;
    this.gridData = salesQuotationsAttachment;
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
  * call api for Sales quotation detail attachment .
  */
  getSalesQuotationAttachmentList(id: number) {
    this.showLoader = true;
    this.getDetailAttachsubs = this.salseQuotationService.getSalesQuotationAttachmentDetail(id).subscribe(
      data => {
        this.showLoader = false;
        if (data != null && data != undefined) {
          this.gridData = JSON.parse(data);
          this.gridData.forEach(element => { 
          element.AttachmentDate = DateTimeHelper.ParseDate(element.AttachmentDate);
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
    if (this.getDetailAttachsubs != undefined)
      this.getDetailAttachsubs.unsubscribe();
   }



}
