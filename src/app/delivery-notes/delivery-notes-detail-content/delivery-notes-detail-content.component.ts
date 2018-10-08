import { Component, OnInit, HostListener } from '@angular/core';
import { UIHelper } from '../../helpers/ui.helpers';
import { deliveryNotesContent } from '../../demodata/delivery-notes';
import { GridComponent } from '@progress/kendo-angular-grid';

import { ISubscription } from '../../../../node_modules/rxjs/Subscription';
import { DeliveryNoteListModel } from '../../tempmodels/delivery-note-list-model';
import { DeliveryNotesService } from 'src/app/services/delivery-notes.service';
import { DateTimeHelper } from '../../helpers/datetime.helper';
import { Configuration } from '../../helpers/Configuration';

@Component({
  selector: 'app-delivery-notes-detail-content',
  templateUrl: './delivery-notes-detail-content.component.html',
  styleUrls: ['./delivery-notes-detail-content.component.scss']
})
export class DeliveryNotesDetailContentComponent implements OnInit {

  imgPath = Configuration.imagePath;
  pageLimit;
  pagination:boolean;

  isMobile: boolean;
  isColumnFilter: boolean = false;
  isColumnGroup: boolean = false;
  gridHeight: number;
  
  showLoader: boolean = false;
  public gridData: any[];
  public getDetailsubs: ISubscription;
  deliveryNoteListModel: DeliveryNoteListModel = new DeliveryNoteListModel();
  
  constructor(private deliveryNotesService: DeliveryNotesService) { }

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
    
    let deliveryNumber: number = this.deliveryNoteListModel.DeliveryNumber;
    this.getDeliveryNotesContentList(deliveryNumber);
  }

  /**
   * Method to get list of inquries from server.
  */
  public getDeliveryNotesContentList1() {
    this.showLoader = true;
    this.gridData = deliveryNotesContent;
    setTimeout(()=>{    
      this.showLoader = false;
    }, 1000);
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

   /** 
   * call api for Sales quotation detail.
   */
  getDeliveryNotesContentList(id: number) {
    this.showLoader = true;
    
    this.getDetailsubs = this.deliveryNotesService.getDeliveryNotesDetail(id,2).subscribe(
      data => {
        
        this.showLoader = false;
        if (data != null && data != undefined) {
          this.gridData = JSON.parse(data);
          this.gridData.forEach(element => {
        //  element.DeliveryDate = DateTimeHelper.ParseDate(element.DeliveryDate);
        });
        this.showLoader = false;
      }

      }, error => {
        this.showLoader = false;
        alert("Something went wrong");
        console.log("Error: ", error)
      }, () => { }
    );
  }

  ngOnDestroy() {
    if (this.getDetailsubs != undefined)
      this.getDetailsubs.unsubscribe();
   }
}
