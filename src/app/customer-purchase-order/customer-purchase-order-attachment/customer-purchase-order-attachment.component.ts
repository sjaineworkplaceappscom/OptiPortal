import { Component, OnInit, HostListener } from '@angular/core';
import { UIHelper } from '../../helpers/ui.helpers';
import { openInvoicesAttachment } from '../../demodata/open-invoices';
import { GridComponent } from '@progress/kendo-angular-grid';
import { Configuration } from '../../helpers/Configuration';
import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { ISubscription } from '../../../../node_modules/rxjs/Subscription';
import { SharedComponentService } from '../../services/shared-component.service';
import { Commonservice } from '../../services/commonservice.service';
import { HttpClient, HttpEventType } from '../../../../node_modules/@angular/common/http';
import { CustomerPurchaseOrderModel } from '../../tempmodels/customer-purchase-order-model';
import { CustomerEntityType } from '../../enums/enums';
import { AttachmentDetail } from '../../models/AttchmentDetail';

@Component({
  selector: 'app-customer-purchase-order-attachment',
  templateUrl: './customer-purchase-order-attachment.component.html',
  styleUrls: ['./customer-purchase-order-attachment.component.scss']
})
export class CustomerPurchaseOrderAttachmentComponent implements OnInit {

  showGrid:boolean=true;
  imgPath = Configuration.imagePath;
  pageLimit;
  pagination:boolean;

  isMobile: boolean;
  isColumnFilterAttachementsGrid: boolean = false;
  gridHeight: number;
  showLoader: boolean = false;

  public gridData: any[];


  public progress: number;
  public message: string;
  public gridAttachmentData: any[] = [];
  public selectedFileName: string = '';
  public purchaseOrderID:string;
  customerPurchaseOrderModel: CustomerPurchaseOrderModel = new CustomerPurchaseOrderModel();

  getAttachmentsub: ISubscription;
  uploadAttachmentsub: ISubscription;
  updatePIStatussub: ISubscription;
  constructor(private commonService: Commonservice, private http: HttpClient, private sharedComponentService: SharedComponentService) { }

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
    this.customerPurchaseOrderModel = JSON.parse(localStorage.getItem('SelectedCustomerPurchaseOrder'));
    this.purchaseOrderID = this.customerPurchaseOrderModel.PurchaseOrderId;
    this.getAttchmentList(this.purchaseOrderID);
  }

  public getAttchmentList(purchaseOrderId:string) {
    this.showLoader = true;
    this.getAttachmentsub = this.sharedComponentService.getAtachmentList(purchaseOrderId, CustomerEntityType.CustomerPurchaseOrder)
      .subscribe(
        data => {
          this.showLoader = false;
          if (data != undefined && data != null) {
            let griddata: any = data;
            //console.log(data);
            this.gridAttachmentData = JSON.parse(data);
          }
        }
      ),
      err => {
        alert("Something went wrong.");
        console.log(err);
        this.showLoader = false;
      }
    () => {
      this.showLoader = false;
    }
      ;
  }

  /**
   * Method to get list of inquries from server.
  */
  public getCustomerPurchaseOrderAttachmentList() {
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

  back() {
    this.showGrid = true;
  }

  showAttachementForm(){
    this.showGrid = false;
  }

  ngOnDestroy() {

    if (this.getAttachmentsub != undefined)
      this.getAttachmentsub.unsubscribe();

    if (this.uploadAttachmentsub != undefined)
      this.uploadAttachmentsub.unsubscribe();

    if (this.updatePIStatussub != undefined)
      this.updatePIStatussub.unsubscribe();
  }

  // file upload code start
  public files: UploadFile[] = [];
 
  public dropped(event: UploadEvent) {
    this.files = event.files;
    for (const droppedFile of event.files) {
 
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          // Here you can access the real file
          console.log(droppedFile.relativePath, file);
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }
 
  public fileOver(event){
    console.log(event);
  }
 
  public fileLeave(event){
    console.log(event);
  }

  public upload(files) {

    if (files.length === 0)
      return;
    const formData = new FormData();

    for (let file of files) {
      // exe
      if (file.type == 'application/x-msdownload') {
        this.message = "Error: specified filetype not supported.";
        return;
      }
      // >10 mb file check.
      if (file.size > 1024 * 1024 * 10) {
        this.message = "Error: file should not be greater then 10 MB.";
        return;
      }
      formData.append(file.name, file);
      this.selectedFileName = file.name;
    }

    // Attachment details
    let attachmentDetail: AttachmentDetail = new AttachmentDetail();
    attachmentDetail.ParentId = this.purchaseOrderID;
    attachmentDetail.GrandParentId = this.purchaseOrderID;

    formData.append('AttachmentDetail', JSON.stringify(attachmentDetail));

    this.showLoader = true;
    this.uploadAttachmentsub = this.sharedComponentService.uploadAttachment(formData).subscribe(
      event => {

        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);

        else if (event.type === HttpEventType.Response)
          this.message = event.body.toString();
        // Get attachment list
        if (event.type === 4 && event.status === 200) {
          this.showLoader = false;
          this.getAttchmentList(this.purchaseOrderID); 
          //this method is updating the status if notes updated then update inquiry status.
          this.back();
        }
      },
      error => {
        alert("Something went wrong");
        console.log(error);
        this.showLoader = false;
        this.showGrid = false;
      },
      () => {
        this.showLoader = false;
      }

    );

  }
  // file upload code end

}
