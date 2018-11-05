import { Component, OnInit, HostListener } from '@angular/core';
import { salesQuotationsAttachment } from '../../DemoData/sales-quotations';
import { UIHelper } from '../../helpers/ui.helpers';
import { GridComponent } from '@progress/kendo-angular-grid';
import { SalesQuotation } from '../../tempmodels/sales-quotation';
import { ISubscription } from 'rxjs/Subscription';
import { SalesQuotationService } from '../../services/sales-quotation.service';
import { DateTimeHelper } from '../../helpers/datetime.helper';
import { SharedComponentService } from '../../services/shared-component.service';
import { Path } from '@progress/kendo-drawing';
import { Configuration } from '../../helpers/Configuration';


@Component({ 
  selector: 'app-sales-quotations-detail-attchment',
  templateUrl: './sales-quotations-detail-attchment.component.html',
  styleUrls: ['./sales-quotations-detail-attchment.component.scss']
})
export class SalesQuotationsDetailAttchmentComponent implements OnInit {
  imgPath = Configuration.imagePath;
  
  isMobile: boolean;
  isColumnFilter: boolean = false;
  isColumnGroup: boolean = false;
  gridHeight: number;
  
  public gridData: any[];
  showLoader: boolean = false;
  searchRequest: string = '';
  salesQuotationModel: SalesQuotation = new SalesQuotation();
  public getDetailAttachsubs: ISubscription;
  constructor(private salseQuotationService: SalesQuotationService, private sharedComponentService: SharedComponentService) { }

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

    this.salesQuotationModel = JSON.parse(localStorage.getItem('SelectedSalesQuotation'))
    let quotationId: number = this.salesQuotationModel.QuotationId;
    this.getSalesQuotationAttachmentList(quotationId);

  }

  /**
  * Method to get list of inquries from server.
 */
  public getSalesQuotationAttachmentList1() {
    this.showLoader = true;
    this.gridData = salesQuotationsAttachment;
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
   * call api for Sales quotation detail attachment .
   */
  getSalesQuotationAttachmentList(id: number) {
    this.showLoader = true;
    this.getDetailAttachsubs = this.salseQuotationService.getSalesQuotationDetail(id, 3).subscribe(
      data => {

        this.showLoader = false;
        if (data != null && data != undefined) {
          this.gridData = JSON.parse(data);
          this.gridData.forEach(element => {
            element.AttachementDate = DateTimeHelper.ParseDate(element.AttachementDate);
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
    if (this.getDetailAttachsubs != undefined)
      this.getDetailAttachsubs.unsubscribe();
  }

  download(fileName: string) {

    let seletedAttachment = this.gridData.filter(i => i.FileName == fileName)[0];

    try {
      // Create file path from response
      let filePath: string = seletedAttachment.FullPath;//"\\\\172.16.6.20\\People\\Vaibhav\\ListofFilesRequiredForSetup.xlsx";

      this.sharedComponentService.getAtachmentFromPath(filePath)
        .subscribe(
          res => {
           if(res!=undefined && res!=null){
            let fileName=res.Item1;
            let tempAttachmentId=res.Item2;
            
            let filepath:string=Configuration.doccumentPath + "Temp/"+tempAttachmentId +"/"+fileName;          
                        
            var a = document.createElement('a');
            document.body.appendChild(a);
            a.href = filepath;
            a.download = fileName;
            // a.target="_blank";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
           }
          }


        );
    }
    catch (err) {
      // this.errorHandler.handledError(err, 'MsgInfoComponent.download');
    }
  }

}

