import { Component, OnInit, HostListener, Input } from '@angular/core';
import { UIHelper } from '../../../helpers/ui.helpers';
import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { Configuration } from '../../../helpers/Configuration';
import { AppMessages } from '../../../helpers/app-messages';
import { ISubscription } from '../../../../../node_modules/rxjs/Subscription';
import { Commonservice } from '../../../services/commonservice.service';
import { HttpClient, HttpEventType } from '../../../../../node_modules/@angular/common/http';
import { SharedComponentService } from '../../../services/shared-component.service';
import { PurchaseInquiryService } from '../../../services/purchase-enquiry.service';
import { ToastService } from '../../../helpers/services/toast.service';
import { VendorEntityType, VendorOpenInvoiceStatus } from '../../../enums/enums';
import { AttachmentDetail } from 'src/app/models/AttchmentDetail';
import { VendorOIModel } from '../../../tempmodels/vendor/vendor-OI-model';

import * as $ from "jquery";

@Component({
  selector: 'app-vendor-p-invoice-attachment',
  templateUrl: './vendor-p-invoice-attachment.component.html',
  styleUrls: ['./vendor-p-invoice-attachment.component.scss']
})
export class VendorPInvoiceAttachmentComponent implements OnInit {

  /**
   * global variable
  */
  isMobile: boolean;
  gridHeight: number;
  imgPath = Configuration.imagePath;

  /**
   * Attachement tab variable
  */
  @Input() tabparent;
  getTabParent: string;
  //TabAddAttachementFormStatus:boolean = false;
  showGrid: boolean = true;
  showLoader: boolean = false;
  public progress: number;
  public message: string;  
  public gridAttachmentData: any[] = [];
  public selectedFileName: string = '';
  public vendorModel:VendorOIModel;

  isCancelStatus: boolean = false;

  getAttachmentsub: ISubscription;
  uploadAttachmentsub: ISubscription;
  updatePIStatussub: ISubscription;

  constructor(private commonService: Commonservice, private http: HttpClient, private sharedComponentService: SharedComponentService, private toast: ToastService) { }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    /**
     * Apply Grid Height any[] = []
    */
    this.gridHeight = UIHelper.getMainContentHeight();

    /**
     * Check Mobile device
    */
    this.isMobile = UIHelper.isMobile();
  }

  ngOnInit() {

    /**
     * Apply Grid Height
    */
    this.gridHeight = UIHelper.getMainContentHeight();

    /**
    * Check Mobile device
    */
    this.isMobile = UIHelper.isMobile();

    this.getTabParent = this.tabparent;

    

    //get status of selected inquiry for disabling or enabling  forms
    let vendorDetail: string = localStorage.getItem("SelectedVOI");
    this.vendorModel=JSON.parse(vendorDetail);
    if (this.vendorModel != null && this.vendorModel != undefined) {
      
      let inquiryStatus = this.vendorModel.Status;
       if (inquiryStatus == VendorOpenInvoiceStatus.Closed) {
         this.isCancelStatus = true;
       }

    }

    // Load data
    this.getAttchmentList();

  }

  ngOnDestroy() {

    if (this.getAttachmentsub != undefined)
      this.getAttachmentsub.unsubscribe();

    if (this.uploadAttachmentsub != undefined)
      this.uploadAttachmentsub.unsubscribe();

    if (this.updatePIStatussub != undefined)
      this.updatePIStatussub.unsubscribe();
  }

  /**
   * Attachement Tab
  */
  public showTabAddAttachementForm() {
    this.message = '';
    this.showGrid = false;

  }

  public getAttchmentList(selfCall: boolean = true) {

    if (selfCall)
      this.showLoader = true;

    this.getAttachmentsub = this.sharedComponentService.getAtachmentList(this.vendorModel.InvoiceId, VendorEntityType.VendorOI)
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
        //alert("Something went wrong.");
        console.log(err);
        if (selfCall)
          this.showLoader = false;
      }
    () => {
      if (selfCall)
        this.showLoader = false;
    }
      ;
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
    attachmentDetail.ParentId = this.vendorModel.InvoiceId;
    attachmentDetail.GrandParentId = this.vendorModel.InvoiceId;

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
          this.getAttchmentList(false);
          //this method is updating the status if notes updated then update inquiry status.
          // this.callPurchaseInquiryStatusUpdateAPI();
          this.back();
          this.toast.showSuccess(AppMessages.AttachmentAddedSuccessMsg);
          $('body').trigger('click');
        }
      },
      error => {
        //alert("Something went wrong");
        console.log(error);
        this.showLoader = false;
        this.showGrid = false;
      },
      () => {
        this.showLoader = false;
      }

    );

  }
  /**
  * call api for update status of inquiry. 
  */
  //  callPurchaseInquiryStatusUpdateAPI() {
  //    let purchaseInquiryDetail: TempPurchaseInquiryModel = new TempPurchaseInquiryModel();
  //    //check from local storage.
  //    if (parseInt(localStorage.getItem("OperationType")) == OperationType.Update) {
  //      purchaseInquiryDetail = JSON.parse(localStorage.getItem('SelectedPurchaseInquery'));
  //      if (purchaseInquiryDetail.Status == PurchaseInquiryStatus.New) {
  //        purchaseInquiryDetail.Status = PurchaseInquiryStatus.Updated;
  //        this.updatePIStatussub = this.purchaseInquiryService.UpdatePurchaseInquiry(purchaseInquiryDetail).subscribe(
  //          data => {
  //            localStorage.setItem("SelectedPurchaseInquery", JSON.stringify(data));
  //            purchaseInquiryDetail = JSON.parse(localStorage.getItem('SelectedPurchaseInquery'));
  //            this.commonService.refreshPIList(true);
  //          }, error => {
  //            this.commonService.refreshPIList(true);
  //          }, () => { }
  //        );
  //      }
  //    }
  //  }

  public back() {
    this.showGrid = true;
  }


  // download attachment file
  download(id: string) {

    let seletedAttachment = this.gridAttachmentData.filter(i => i.AttachmentId == id)[0];
    let filepath: string = Configuration.doccumentPath + id + "\\" + seletedAttachment.AttachmentName;

    var a = document.createElement('a');
    document.body.appendChild(a);
    a.href = filepath;// URL.createObjectURL(blob);
    // a.target="_blank";
    a.download = seletedAttachment.AttachmentName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    try {

    }
    catch (err) {
      // this.errorHandler.handledError(err, 'MsgInfoComponent.download');
    }
  }


  ///////////////////////////////////////////
  // drag file code start
  ///////////////////////////////////////////
  public files: UploadFile[] = [];

  public dropped(event: UploadEvent) {
    this.files = event.files;

    for (const droppedFile of event.files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;

        fileEntry.file((file: File) => {

          // My code
          let files: Array<any> = [file];
          this.upload(files);

        });
      } else {

        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        //console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }
  ///////////////////////////////////////////
  // drag file code end
  ///////////////////////////////////////////

}
