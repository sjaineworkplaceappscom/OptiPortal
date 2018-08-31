import { Component, OnInit, HostListener, Input } from '@angular/core';
import { UIHelper } from '../../helpers/ui.helpers';
import { PurchaseInquiryStatus, PurchaseInquiryItemStatus, CustomerEntityType, OperationType } from '../../enums/enums';
import { SharedComponentService } from '../../services/shared-component.service';
import { Commonservice } from '../../services/commonservice.service';
import { HttpClient, HttpEventType } from '../../../../node_modules/@angular/common/http';
import { AttachmentDetail } from '../../models/AttchmentDetail';
import { ISubscription } from '../../../../node_modules/rxjs/Subscription';
import { TempPurchaseInquiryModel } from '../../tempmodels/temppurchase-inquiry';
import { PurchaseInquiryService } from '../../services/purchase-enquiry.service';
import { DecimalPipe } from '../../../../node_modules/@angular/common';

@Component({
  selector: 'app-attachment-item',
  templateUrl: './attachment-item.component.html',
  styleUrls: ['./attachment-item.component.scss']
})
export class AttachmentItemComponent implements OnInit {

  /**
   * global variable
  */
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

  constructor(private commonService: Commonservice, private http: HttpClient, private sharedComponentService: SharedComponentService, private purchaseInquiryService: PurchaseInquiryService) {
    
    this.attachmentsub = this.commonService.currentAttachmentItemData.subscribe(
      (data: AttachmentDetail) => {
        //console.log(JSON.stringify(data));
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
        alert("Something went wrong");
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
        }
      },
      error => {
        alert("Something went wrong");
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
            // console.log("NOte:data from LocalStorage:" + JSON.stringify(localStorage.getItem('SelectedPurchaseInquery')));
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

  // showGrid(){
  //   this.isGridStatus = true;
  // }

  // showUpload(){

  //   this.isGridStatus = false;
  // }

  
 

}
