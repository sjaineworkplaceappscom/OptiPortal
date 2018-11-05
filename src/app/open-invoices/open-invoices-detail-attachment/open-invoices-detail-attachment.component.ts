import { Component, OnInit, HostListener } from '@angular/core';
import { UIHelper } from '../../helpers/ui.helpers';
import { openInvoicesAttachment } from '../../demodata/open-invoices';
import { GridComponent } from '@progress/kendo-angular-grid';

import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { Configuration } from '../../helpers/Configuration';
import { OpenInvoiceListModel } from '../../tempmodels/open-invoice-list-model';
import { ISubscription } from 'rxjs/Subscription';
import { OpenInvoiceService } from '../../services/open-invoice.service';
import { SharedComponentService } from '../../services/shared-component.service';
import { DateTimeHelper } from '../../helpers/datetime.helper';

@Component({
  selector: 'app-open-invoices-detail-attachment',
  templateUrl: './open-invoices-detail-attachment.component.html',
  styleUrls: ['./open-invoices-detail-attachment.component.scss']
})
export class OpenInvoicesDetailAttachmentComponent implements OnInit {

  // showGrid:boolean=true;

  imgPath = Configuration.imagePath;
  pageLimit;
  pagination:boolean;

  isMobile: boolean;
  isColumnFilter: boolean = false;
  isColumnGroup: boolean = false;
  gridHeight: number;

  public gridData: any[];
  showLoader: boolean = false;
  searchRequest: string = '';
  openInvoiceListModel: OpenInvoiceListModel = new OpenInvoiceListModel();
  public getDetailAttachsubs: ISubscription;
  constructor(private openInvoiceService: OpenInvoiceService, private sharedComponentService: SharedComponentService) { }


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

    this.openInvoiceListModel = JSON.parse(localStorage.getItem('SelectedOpenInvoice'))
    let invoiceNumber: number = this.openInvoiceListModel.InvoiceNumber;
    this.getOpenInvoiceAttachmentList(invoiceNumber);
    //this.getOPenInvoicesAttachmentList();
  }

  /**
   * Method to get list of inquries from server.
  */
  public getOPenInvoicesAttachmentList() {
    this.showLoader = true;
    this.gridData = openInvoicesAttachment;
    setTimeout(()=>{    
      this.showLoader = false;
    }, 1000);
  }

  onFilterChange(checkBox:any,grid:GridComponent){
    if(checkBox.checked==false){
      this.clearFilter(grid);
    }
  }

  clearFilter(grid:GridComponent){      
    //grid.filter.filters=[];
  }

  // back() {
  //   this.showGrid = true;
  // }

  // showAttachementForm(){
  //   this.showGrid = false;
  // }




   /** 
   * call api for Sales quotation detail attachment .
   */
  getOpenInvoiceAttachmentList(id: number) {
    this.showLoader = true;
    this.getDetailAttachsubs = this.openInvoiceService.getOpenInvoiceDetail(id, 3).subscribe(
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
