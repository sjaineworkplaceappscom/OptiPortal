import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Commonservice } from '../../services/commonservice.service';
import { UIHelper } from '../../helpers/ui.helpers';
import { HttpClient, HttpRequest, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Configuration } from '../../../assets/configuration';
import { AttachmentDetail } from '../../models/AttchmentDetail';
import { SharedComponentService } from '../../services/shared-component.service';
import { CustomerEntityType, PurchaseInquiryStatus, OperationType } from '../../enums/enums';
import { initChangeDetectorIfExisting } from '@angular/core/src/render3/instructions';
import { TempPurchaseInquiryModel } from '../../tempmodels/temppurchase-inquiry';
import { PurchaseInquiryService } from '../../services/purchase-enquiry.service';
import { ISubscription } from 'rxjs/Subscription';
import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';



@Component({
  selector: 'app-attachment',
  templateUrl: './attachment.component.html',
  styleUrls: ['./attachment.component.scss']
})
export class AttachmentComponent implements OnInit {

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
  public purchaseInqId: string;
  public gridAttachmentData: any[] = [];
  public selectedFileName: string = '';

  isCancelStatus: boolean = false;

  getAttachmentsub: ISubscription;
  uploadAttachmentsub: ISubscription;
  updatePIStatussub: ISubscription;

  constructor(private commonService: Commonservice, private http: HttpClient, private sharedComponentService: SharedComponentService, private purchaseInquiryService: PurchaseInquiryService) { }

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
    this.purchaseInqId = localStorage.getItem("PurchaseinqueryId");

    //get status of selected inquiry for disabling or enabling  forms
    let inquiryDetail: string = localStorage.getItem("SelectedPurchaseInquery");

    if (inquiryDetail != null && inquiryDetail != undefined) {
      let inquiryData: any = JSON.parse(inquiryDetail);
      let inquiryStatus = inquiryData.Status;
      if (inquiryStatus == PurchaseInquiryStatus.Cancelled) {
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

  public getAttchmentList() {
    this.showLoader = true;
    this.getAttachmentsub = this.sharedComponentService.getAtachmentList(this.purchaseInqId, CustomerEntityType.PurchaseInquiry)
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
    attachmentDetail.ParentId = this.purchaseInqId;
    attachmentDetail.GrandParentId = this.purchaseInqId;

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
          this.getAttchmentList();
          //this method is updating the status if notes updated then update inquiry status.
          this.callPurchaseInquiryStatusUpdateAPI();
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

      }

    );

  }
  /**
  * call api for update status of inquiry. 
  */
  callPurchaseInquiryStatusUpdateAPI() {
    let purchaseInquiryDetail: TempPurchaseInquiryModel = new TempPurchaseInquiryModel();
    //check from local storage.
    if (parseInt(localStorage.getItem("OperationType")) == OperationType.Update) {
      purchaseInquiryDetail = JSON.parse(localStorage.getItem('SelectedPurchaseInquery'));
      if (purchaseInquiryDetail.Status == PurchaseInquiryStatus.New) {
        purchaseInquiryDetail.Status = PurchaseInquiryStatus.Updated;
        this.updatePIStatussub = this.purchaseInquiryService.UpdatePurchaseInquiry(purchaseInquiryDetail).subscribe(
          data => {
            localStorage.setItem("SelectedPurchaseInquery", JSON.stringify(data));
            purchaseInquiryDetail = JSON.parse(localStorage.getItem('SelectedPurchaseInquery'));
            this.commonService.refreshPIList(null);
          }, error => {
            this.commonService.refreshPIList(null);
          }, () => { }
        );
      }
    }
  }

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
      //   this.sharedComponentService.getAtachment(id)
      //     .subscribe(
      //     res => {
      //      // var data =   JSON.stringify(res);
      //       var data = res.blob();


      //       let blob = new Blob([data], {
      //         type: 'application/pdf' // must match the Accept type
      //       });

      //         var a = document.createElement('a');
      //         document.body.appendChild(a);
      //         a.href = URL.createObjectURL(blob);
      //         a.download = seletedAttachment.AttachmentName;
      //         document.body.appendChild(a);
      //         a.click();
      //         document.body.removeChild(a);
      //       }


      //   ),
      //   (err:HttpErrorResponse)=> {

      //     console.log(err);
      //   };
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
