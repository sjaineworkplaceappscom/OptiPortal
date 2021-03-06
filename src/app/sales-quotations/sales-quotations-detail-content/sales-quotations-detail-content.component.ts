import { Component, OnInit, HostListener } from '@angular/core';
import { salesQuotationsContent } from '../../DemoData/sales-quotations';
import { UIHelper } from '../../helpers/ui.helpers';
import { GridComponent } from '@progress/kendo-angular-grid';
import { SalesQuotation } from '../../tempmodels/sales-quotation';
import { ISubscription } from 'rxjs/Subscription';
import { SalesQuotationService } from '../../services/sales-quotation.service';
import { SalesQuotationDetailContent } from '../../tempmodels/sales-quotation-detail-content';
import { DateTimeHelper } from '../../helpers/datetime.helper';
import { Configuration } from '../../helpers/Configuration';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';


@Component({
  selector: 'app-sales-quotations-detail-content',
  templateUrl: './sales-quotations-detail-content.component.html',
  styleUrls: ['./sales-quotations-detail-content.component.scss']
})
export class SalesQuotationsDetailContentComponent implements OnInit {
  imgPath = Configuration.imagePath;
  
  isMobile: boolean;
  isColumnFilter: boolean = false;
  isColumnGroup: boolean = false;
  gridHeight: number;
  
  searchRequest: string = '';
  showLoader: boolean = false;
  public getDetailsubs: ISubscription;
  public gridData: any[];
  salesQuotationModel: SalesQuotation = new SalesQuotation();
  
  constructor( private salseQuotationService: SalesQuotationService,private translate: TranslateService) { 
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
    this.salesQuotationModel = JSON.parse(localStorage.getItem('SelectedSalesQuotation'));
    
    let quotationId: number = this.salesQuotationModel.QuotationId;
    this.getSalesQuotationContentList(quotationId);

  }


  /**
   * Method to get list of inquries from server.
  */
  public getSalesQuotationContentList1() {
    this.showLoader = true;
    this.gridData = salesQuotationsContent;
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

  /** 
   * call api for Sales quotation detail.
   */
  getSalesQuotationContentList(id: number) {
    this.showLoader = true;
    
    this.getDetailsubs = this.salseQuotationService.getSalesQuotationDetail(id,2).subscribe(
      data => {
        
        this.showLoader = false;
        if (data != null && data != undefined) {
          this.gridData = JSON.parse(data);
          this.gridData.forEach(element => {
          element.DeliveryDate = DateTimeHelper.ParseDate(element.DeliveryDate);
        });
        this.showLoader = false;
      }

      }, error => {
        this.showLoader = false;
        //alert("Something went wrong");
        console.log("Error: ", error)
      }, () => { }
    );
  }

  ngOnDestroy() {
    if (this.getDetailsubs != undefined)
      this.getDetailsubs.unsubscribe();
   }


}
