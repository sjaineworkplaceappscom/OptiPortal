import { Component, OnInit } from '@angular/core';
import { ISubscription } from '../../../../node_modules/rxjs/Subscription';
import { DeliveryNoteListModel } from '../../tempmodels/delivery-note-list-model';
import { DeliveryNoteHeaderModel } from '../../tempmodels/delivery-note-header-model';
import { DeliveryNotesService } from '../../services/delivery-notes.service';
import { Commonservice } from '../../services/commonservice.service';
import { DateTimeHelper } from '../../helpers/datetime.helper';

@Component({
  selector: 'app-delivery-notes-detail-home',
  templateUrl: './delivery-notes-detail-home.component.html',
  styleUrls: ['./delivery-notes-detail-home.component.scss']
})
export class DeliveryNotesDetailHomeComponent implements OnInit {

  public getDetailsubs: ISubscription;
  public getSidebarsubs: ISubscription;
   
  showLoader: boolean = false;
  deliveryNoteListModel: DeliveryNoteListModel = new DeliveryNoteListModel();
  deliveryNoteHeaderModel: DeliveryNoteHeaderModel = new DeliveryNoteHeaderModel();

  constructor(private commonService: Commonservice, private deliveryNotesService: DeliveryNotesService) { }


  delivery;
  shipdate;
  deliveredDate;
  customerName;
  wayBill;
  tracking;
  packingSlip;
  modeOfShipment;
  shippingMethod;
  shipToLocation;
  totalPrice;
  freight;
  tax;
  discAmt;

  ngOnInit() {

    this.getSidebarsubs = this.commonService.currentSidebarInfo.subscribe(
      currentSidebarData => {
        this.deliveryNoteListModel = currentSidebarData.RequesterData;
        if(this.deliveryNoteListModel!=null){
          let deliveryNoteId: number = this.deliveryNoteListModel.DeliveryNumber;
          
          this.getDeliveryNotesDetail(deliveryNoteId);
        }
        
      }
    );
  }

  /** 
     * call api for Sales quotation detail .
     */
    getDeliveryNotesDetail(id: number) {
      this.showLoader = true;
      this.getDetailsubs = this.deliveryNotesService.getDeliveryNotesDetail(id,1).subscribe(
        data => {
          this.showLoader = false;
          let dataArray: any[] = JSON.parse(data);
          this.deliveryNoteHeaderModel = dataArray[0];
          this.deliveryNoteHeaderModel.DeliveredDate = DateTimeHelper.ParseDate(this.deliveryNoteHeaderModel.DeliveredDate);
          this.deliveryNoteHeaderModel.ShipDate = DateTimeHelper.ParseDate(this.deliveryNoteHeaderModel.ShipDate);
  
        }, error => {
          this.showLoader = false;
          //alert("Something went wrong");
          console.log("Error: ", error)
        }, () => { }
      );
    }
  
    ngOnDestroy() {
      if (this.getSidebarsubs != undefined)
        this.getSidebarsubs.unsubscribe();
      if (this.getDetailsubs != undefined)
        this.getDetailsubs.unsubscribe();
    }
  

}
