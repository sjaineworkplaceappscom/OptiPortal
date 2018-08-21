import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Commonservice } from '../../services/commonservice.service';
import { UIHelper } from '../../helpers/ui.helpers';
import { HttpClient, HttpRequest, HttpEventType } from '../../../../node_modules/@angular/common/http';
import { Configuration } from '../../../assets/configuration';
import { AttachmentDetail } from 'src/app/models/AttchmentDetail';
import { SharedComponentService } from '../../services/shared-component.service';
import { CustomerEntityType } from '../../enums/enums';


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
  constructor(private commonService: Commonservice, private http: HttpClient, private sharedComponentService: SharedComponentService) { }

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
    // Load data
    this.getAttchmentList();
    console.log("Attachment ist",this.gridAttachmentData)
  }

  /**
   * Attachement Tab
  */
  public showTabAddAttachementForm() {
    this.showGrid=false;
  }

  public getAttchmentList() {
    this.sharedComponentService.getAtachmentList(this.purchaseInqId, CustomerEntityType.PurchaseInquiry)
    .subscribe(
      data=> {
        if(data!=undefined && data!=null)
        {
          let griddata:any=data;
        this.gridAttachmentData=JSON.parse(data);           
        }
      }
    );
  }

  public upload(files) {

    if (files.length === 0)
      return;

    const formData = new FormData();

    for (let file of files)
      formData.append(file.name, file);


    // Attachment details
    let attachmentDetail: AttachmentDetail = new AttachmentDetail();
    attachmentDetail.ParentId = this.purchaseInqId;
    attachmentDetail.GrandParentId = this.purchaseInqId;

    formData.append('AttachmentDetail', JSON.stringify(attachmentDetail));

    const uploadReq = new HttpRequest('POST', Configuration.baseServerAPIEndpoint + 'attachment/upload',
      formData, {
        reportProgress: true,
      }
    );

    this.http.request(uploadReq).subscribe(event => {

      if (event.type === HttpEventType.UploadProgress)
        this.progress = Math.round(100 * event.loaded / event.total);

      else if (event.type === HttpEventType.Response)
        this.message = event.body.toString();
        // Get attachment list
       
    }
    );

  }

  public back(){
    this.showGrid=true;
  }
}
