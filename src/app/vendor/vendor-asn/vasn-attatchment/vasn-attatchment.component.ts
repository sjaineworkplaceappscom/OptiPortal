import { Component, OnInit, HostListener } from '@angular/core';

import { asnAttachment } from '../../../DemoData/vendor-data';
import { GridComponent } from '@progress/kendo-angular-grid';
import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { Configuration } from '../../../helpers/Configuration';
import { UIHelper } from '../../../helpers/ui.helpers';
import { VendorASNModel } from 'src/app/tempmodels/vendor/vendor-asn-model';
import { ToastService } from 'src/app/helpers/services/toast.service';
import { SharedComponentService } from 'src/app/services/shared-component.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Commonservice } from 'src/app/services/commonservice.service';
import { ISubscription } from 'rxjs/Subscription';
import { VendorEntityType } from 'src/app/enums/enums';
import { AttachmentDetail } from 'src/app/models/AttchmentDetail';
import { AppMessages } from 'src/app/helpers/app-messages';


@Component({
  selector: 'app-vasn-attatchment',
  templateUrl: './vasn-attatchment.component.html',
  styleUrls: ['./vasn-attatchment.component.scss']
})
export class VasnAttatchmentComponent implements OnInit {

  showGrid:boolean=true;

  imgPath = Configuration.imagePath;
  pageLimit;
  pagination:boolean;

  isMobile: boolean;
  isColumnFilterAttachementsGrid: boolean = false;
  isColumnGroup: boolean = false;
  gridHeight: number;
  showLoader: boolean = false;
  public progress: number;
  public gridData: any[];

  constructor(private commonService: Commonservice, private http: HttpClient, private sharedComponentService: SharedComponentService, private toast: ToastService) { }

  // UI Section
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // apply grid height
    this.gridHeight = UIHelper.getMainContentHeight();

    // check mobile device
    this.isMobile = UIHelper.isMobile();
  }
  // End UI Section
  vendorASNModel:VendorASNModel;
  getAttachmentsub: ISubscription;
  uploadAttachmentsub: ISubscription;
  updatePIStatussub: ISubscription;

  public message: string;  
  public gridAttachmentData: any[] = [];
  public selectedFileName: string = '';
  ngOnInit() {
    // apply grid height
    this.gridHeight = UIHelper.getMainContentHeight();
    // check mobile device
    this.isMobile = UIHelper.isMobile();
     //get status of selected inquiry for disabling or enabling  forms
     let vendorDetail: string = localStorage.getItem("SelectedVASN");
     this.vendorASNModel=JSON.parse(vendorDetail);
     
     if (this.vendorASNModel != null && this.vendorASNModel != undefined) {
     }

    this.getAttchmentList();
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
  // file upload code end


  
  public getAttchmentList(selfCall: boolean = true) {

    if (selfCall)
    this.showLoader = true;
    this.getAttachmentsub = this.sharedComponentService.getAtachmentList(this.vendorASNModel.ASNId, VendorEntityType.VendorASN)
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
      this.showLoader = false;
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
    attachmentDetail.ParentId = this.vendorASNModel.ASNId;
    attachmentDetail.GrandParentId = this.vendorASNModel.ASNId;

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

  }

 

  
}
