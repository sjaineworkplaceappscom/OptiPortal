import { Component, OnInit, HostListener } from '@angular/core';
import { UIHelper } from '../../helpers/ui.helpers';
import { deliveryNotesAttachment } from '../../demodata/delivery-notes';
import { GridComponent } from '@progress/kendo-angular-grid';
import { DeliveryNoteListModel } from '../../tempmodels/delivery-note-list-model';
import { ISubscription } from '../../../../node_modules/rxjs/Subscription';
import { DeliveryNotesService } from '../../services/delivery-notes.service';
import { SharedComponentService } from '../../services/shared-component.service';
import { DateTimeHelper } from '../../helpers/datetime.helper';
import { Configuration } from '../../helpers/Configuration';

@Component({
  selector: 'app-delivery-notes-detail-attachment',
  templateUrl: './delivery-notes-detail-attachment.component.html',
  styleUrls: ['./delivery-notes-detail-attachment.component.scss']
})
export class DeliveryNotesDetailAttachmentComponent implements OnInit {

  // showGrid:boolean=true;

  imgPath = Configuration.imagePath;
  pageLimit;
  pagination: boolean;

  isMobile: boolean;
  isColumnFilter: boolean = false;
  isColumnGroup: boolean = false;
  gridHeight: number;

  searchRequest: string = '';
  showLoader: boolean = false;
  deliveryNoteListModel: DeliveryNoteListModel = new DeliveryNoteListModel();
  public getDetailAttachsubs: ISubscription;
  public gridData: any[];

  constructor(private deliveryNotesService: DeliveryNotesService, private sharedComponentService: SharedComponentService) { }

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

    this.deliveryNoteListModel = JSON.parse(localStorage.getItem('SelectedDeliveryNote'));
    if (this.deliveryNoteListModel != null) {
      let deliveryId: number = this.deliveryNoteListModel.DeliveryId;
      this.getDeliveryNotesAttachmentList(deliveryId);
    }
  }

  /**
   * Method to get list of inquries from server.
  */
  public getDeliveryNotesAttachmentList1() {
    this.showLoader = true;
    this.gridData = deliveryNotesAttachment;
    setTimeout(() => {
      this.showLoader = false;
    }, 1000);
  }

  onFilterChange(checkBox: any, grid: GridComponent) {
    if (checkBox.checked == false) {
      this.clearFilter(grid);
    }
  }

  clearFilter(grid: GridComponent) {
    //grid.filter.filters=[];
  }


  /** 
    * call api for Sales quotation detail attachment .
    */
  getDeliveryNotesAttachmentList(id: number) {
    this.showLoader = true;

    this.getDetailAttachsubs = this.deliveryNotesService.getDeliveryNotesDetail(id, 3).subscribe(
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

  download(fileName: string) {
    let seletedAttachment = this.gridData.filter(i => i.FileName == fileName)[0];
    try {
      // Create file path from response
      let filePath: string = seletedAttachment.FullPath;//"\\\\172.16.6.20\\People\\Vaibhav\\ListofFilesRequiredForSetup.xlsx";
      this.sharedComponentService.getAtachmentFromPath(filePath)
        .subscribe(
          res => {
            if (res != undefined && res != null) {
              let fileName = res.Item1;
              let tempAttachmentId = res.Item2;
              let filepath: string = Configuration.doccumentPath + "Temp/" + tempAttachmentId + "/" + fileName;
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

  ngOnDestroy() {
    if (this.getDetailAttachsubs != undefined)
      this.getDetailAttachsubs.unsubscribe();
  }

}
