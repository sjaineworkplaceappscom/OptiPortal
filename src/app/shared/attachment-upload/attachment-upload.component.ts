import { Component, OnInit } from '@angular/core';
import { Commonservice } from '../../services/commonservice.service';

@Component({
  selector: 'app-attachment-upload',
  templateUrl: './attachment-upload.component.html',
  styleUrls: ['./attachment-upload.component.scss']
})
export class AttachmentUploadComponent implements OnInit {

  constructor(private commonService: Commonservice) { }

  TabAttachementGridStatus;

  ngOnInit() {
    this.commonService.purchaseInquiryAttachmentGridStatus.subscribe(
      data => {
        this.TabAttachementGridStatus = data;
      }
    );
  }

  public submitAttachements(event){
    this.commonService.setPurchaseInquiryAttachmentGrid(true);
  }

}
