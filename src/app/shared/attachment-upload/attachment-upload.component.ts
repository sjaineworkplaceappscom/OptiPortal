import { Component, OnInit } from '@angular/core';
import { Commonservice } from '../../services/commonservice.service';
import { HttpClient, HttpRequest, HttpEventType } from '../../../../node_modules/@angular/common/http';
import { Configuration } from '../../../assets/configuration';

@Component({
  selector: 'app-attachment-upload',
  templateUrl: './attachment-upload.component.html',
  styleUrls: ['./attachment-upload.component.scss']
})
export class AttachmentUploadComponent implements OnInit {

  public progress: number;
  public message: string;
  constructor(private commonService: Commonservice, private http: HttpClient) { }

  TabAttachementGridStatus;

  ngOnInit() {
    this.commonService.purchaseInquiryAttachmentGridStatus.subscribe(
      data => {
        this.TabAttachementGridStatus = data;
      }
    );
  }

  public submitAttachements(event) {
    this.commonService.setPurchaseInquiryAttachmentGrid(true);
  }

  // public upload(files) {
    
  //   if (files.length === 0)
  //     return;

  //   const formData = new FormData();

  //   for (let file of files)
  //     formData.append(file.name, file);
 
  //   let purchaseInqueryId=localStorage.getItem("PurchaseinqueryId");

  //   // Attachment details
  //   let attachmentDetail:AttachmentDetail=new AttachmentDetail();
  //   attachmentDetail.ParentId=purchaseInqueryId;
  //   attachmentDetail.GrandParentId=purchaseInqueryId;    

  //   formData.append('AttachmentDetail',JSON.stringify(attachmentDetail));

  //   const uploadReq = new HttpRequest('POST', Configuration.baseServerAPIEndpoint + 'attachment/upload',
  //     formData, {
  //       reportProgress: true,        
  //     }
  //   );

  //   this.http.request(uploadReq).subscribe(event => {

  //     if (event.type === HttpEventType.UploadProgress)
  //       this.progress = Math.round(100 * event.loaded / event.total);

  //     else if (event.type === HttpEventType.Response)
  //       this.message = event.body.toString();
  //   }
  // );

  // }
}




