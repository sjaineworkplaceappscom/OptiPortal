import { Component, OnInit, HostListener, Input } from '@angular/core';
import { UIHelper } from '../../helpers/ui.helpers';
import { PurchaseInquiryStatus, PurchaseInquiryItemStatus, CustomerEntityType, OperationType } from '../../enums/enums';
import { SharedComponentService } from '../../services/shared-component.service';
import { Commonservice } from '../../services/commonservice.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { AttachmentDetail } from '../../models/AttchmentDetail';
import { ISubscription } from 'rxjs/Subscription';
import { TempPurchaseInquiryModel } from '../../tempmodels/temppurchase-inquiry';
import { PurchaseInquiryService } from '../../services/purchase-enquiry.service';


import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { Configuration } from '../../helpers/Configuration';
import { AppMessages } from '../../helpers/app-messages';
import { ToastService } from '../../helpers/services/toast.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-attachment-item',
  templateUrl: './attachment-item.component.html',
  styleUrls: ['./attachment-item.component.scss']
})
export class AttachmentItemComponent implements OnInit {

  /**
   * global variable
  */
  imgPath = Configuration.imagePath;
  isMobile: boolean;
  gridHeight: number;
  isCancelStatus: boolean = false;
  isGridStatus: boolean = true;

  @Input() tabparent;
  getTabParent: string;

  showGrid: boolean = true;
  showLoader: boolean = false;
  public progress: number;
  public message: string;
  public purchaseInqId: string;
  public purchaseInqItemId: string;
  public gridAttachmentData: any[] = [];
  public selectedFileName: string = '';
  attachmentModel: AttachmentDetail;

  attachmentsub: ISubscription;
  getAttachmentsub: ISubscription;
  uploadAttachmentsub: ISubscription;
  updatePIStatussub: ISubscription;

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

  constructor(private commonService: Commonservice, private http: HttpClient, private sharedComponentService: SharedComponentService, private purchaseInquiryService: PurchaseInquiryService,private toast:ToastService,private translate: TranslateService) {
    translate.use(localStorage.getItem('appLanguage'));
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
    });
    this.attachmentsub = this.commonService.currentAttachmentItemData.subscribe(
      (data: AttachmentDetail) => {
        if (data != undefined && data != null) {
          this.attachmentModel = data;
          this.purchaseInqId = this.attachmentModel.GrandParentId;
          this.purchaseInqItemId = this.attachmentModel.ParentId;
          // Get notes data.
          this.getAttchmentList();

        }
      },
      error => {
        this.showLoader = false;
        //alert("Something went wrong");
        console.log("Error: ", error)
      }
    );
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
    let inquiryItemDetail: string = localStorage.getItem("SelectedPurchaseInquiryItem");
    let inquiryItemData: any = JSON.parse(inquiryItemDetail);

    if (inquiryItemData != null || inquiryItemData != undefined) {
      let inquiryStatus = inquiryItemData.Status;
      if (inquiryStatus == PurchaseInquiryItemStatus.Cancelled) {
        this.isCancelStatus = true;
      }
    }
  }

  ngOnDestroy() {
    if (this.attachmentsub != undefined)
      this.attachmentsub.unsubscribe();

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
    this.getAttachmentsub = this.sharedComponentService.getAtachmentList(this.purchaseInqItemId, CustomerEntityType.PurchaseInquiryItem)
      .subscribe(
        data => {
          this.showLoader = false;
          if (data != undefined && data != null) {
            let griddata: any = data;
            this.gridAttachmentData = JSON.parse(data);
          }
        }
      ),
      err => {
        //alert("Something went wrong.");
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

      // exe file format not supported.
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
    this.showLoader = true;
    // Attachment details
    let attachmentDetail: AttachmentDetail = new AttachmentDetail();
    attachmentDetail.ParentId = this.purchaseInqItemId;
    attachmentDetail.GrandParentId = this.purchaseInqId;

    formData.append('AttachmentDetail', JSON.stringify(attachmentDetail));


    this.uploadAttachmentsub = this.sharedComponentService.uploadAttachment(formData).subscribe(
      event => {

        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);

        else if (event.type === HttpEventType.Response)
          this.message = event.body.toString();
        // Get attachment list
        if (event.type === 4 && event.status === 200) {
          this.getAttchmentList();
          this.showLoader = false;
          //this method is updating the status if notes updated then update inquiry status.
          this.callPurchaseInquiryStatusUpdateAPI();
          this.back();
          this.toast.showSuccess(AppMessages.AttachmentAddedSuccessMsg);
        }
      },
      error => {
        //alert("Something went wrong");
        console.log(error);
        this.showLoader = false;
        this.showGrid = false;
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
            this.commonService.refreshPIList(true);
          }, error => {
            this.commonService.refreshPIList(true);
          }, () => { }
        );
      }
    }
  }

  public back() {
    this.showGrid = true;
  }

  // showGrid(){
  //   this.isGridStatus = true;
  // }

  // showUpload(){

  //   this.isGridStatus = false;
  // }




  // download attachment file
  //  download(id:string) {

  //   let seletedAttachment=this.gridAttachmentData.filter(i=> i.AttachmentId==id)[0];   

  //   try {
  //     this.sharedComponentService.getAtachment(id)
  //       .subscribe(
  //       res => {
  //         var data = res;

  //         let blob = new Blob([data], {
  //           type: 'application/pdf' // must match the Accept type
  //         });

  //           var a = document.createElement('a');
  //           document.body.appendChild(a);
  //           a.href = URL.createObjectURL(blob);
  //           a.download = seletedAttachment.AttachmentName;
  //           document.body.appendChild(a);
  //           a.click();
  //           document.body.removeChild(a);
  //         }


  //     );
  //   }
  //   catch (err) {
  //    // this.errorHandler.handledError(err, 'MsgInfoComponent.download');
  //   }
  // }


  download(id: string) {

    let seletedAttachment = this.gridAttachmentData.filter(i => i.AttachmentId == id)[0];
    let filepath: string = Configuration.doccumentPath + id + "\\" + seletedAttachment.AttachmentName;

    var a = document.createElement('a');
    // document.body.appendChild(a);
    a.href = filepath;// URL.createObjectURL(blob);
    // a.target="_blank";
    a.download = seletedAttachment.AttachmentName;
    document.body.appendChild(a);

    a.click();
    document.body.removeChild(a);
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
          
          // Here you can access the real file
          //console.log(droppedFile.relativePath, file);

          /**
          // You could upload it like this:
          const formData = new FormData()
          formData.append('logo', file, relativePath)
 
          // Headers
          const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })
 
          this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
          .subscribe(data => {
            // Sanitized logo returned from backend
          })
          **/

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
