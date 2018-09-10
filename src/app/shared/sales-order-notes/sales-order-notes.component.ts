import { Component, OnInit, HostListener } from '@angular/core';
import { UIHelper } from '../../helpers/ui.helpers';
import { ISubscription } from '../../../../node_modules/rxjs/Subscription';
import { SalesOrder } from '../../tempmodels/sales-order';
import { SalesNoteModel } from '../../tempmodels/SalesNoteModel';
import { DateTimeHelper } from '../../helpers/datetime.helper';
import { SharedComponentService } from '../../services/shared-component.service';

@Component({
  selector: 'app-sales-order-notes',
  templateUrl: './sales-order-notes.component.html',
  styleUrls: ['./sales-order-notes.component.scss']
})
export class SalesOrderNotesComponent implements OnInit {

  /**
   * global variable
  */
  isMobile: boolean;
  gridHeight: number;

  /**
   * NOTES TAB VARIABLE
  */

  TabAddNotesFormStatus: boolean = false;
  TabEditNotesFormStatus: boolean = false;
  TabNotesGridStatus: boolean = true;
  showLoader: boolean = false;

  noteItemsData: any[];
  selectedItemNote: any = {};
  getnotessub: ISubscription;
  addnotessub: ISubscription;


  salesOrderModel: SalesOrder = new SalesOrder();
  noteModel: SalesNoteModel;
  constructor(private sharedComponentService: SharedComponentService) { }

  public noteTypes: Array<{ text: string, value: number }> = [
    { text: "General ", value: 1 },
    { text: "Rejected", value: 2 },
    { text: "Partial accepted", value: 3 }
  ];

  public selectedNoteItem: { text: string, value: number } = this.noteTypes[0];

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    //Apply Grid Height
    this.gridHeight = UIHelper.getMainContentHeight();
    // Check Mobile device
    this.isMobile = UIHelper.isMobile();
  }

  ngOnInit() {
    //Apply Grid Height
    this.gridHeight = UIHelper.getMainContentHeight();
    // Check Mobile device
    this.isMobile = UIHelper.isMobile();

    this.salesOrderModel = JSON.parse(localStorage.getItem('SelectedSalesOrder'));
    let orderId: number = this.salesOrderModel.OrderId;
    let orderNumber: number = this.salesOrderModel.OrderNumber;

  }

  openNewNote() {
    this.TabNotesGridStatus = this.TabEditNotesFormStatus = false;
    this.TabAddNotesFormStatus = true;
  }

  openEditNoteView(e, note) {
    this.TabNotesGridStatus = this.TabAddNotesFormStatus = false;
    this.TabEditNotesFormStatus = true;
  }

  submitNote() {

  }

  closeAddNoteWindow() {
    this.TabNotesGridStatus = true;
    this.TabAddNotesFormStatus = false;
  }

  updateNote() {

  }

  /**
     * Method to get list of inquries from server.
     */
  private getSalesNotesList(salesId: string, parentType: number) {
    this.showLoader = true;
    this.getnotessub = this.sharedComponentService.getSalesNotesList(salesId, parentType).subscribe(
      notesData => {
        if (notesData != null && notesData != undefined) {
          this.noteItemsData = JSON.parse(notesData);
          this.formatNotesDate();
        }
        this.showLoader = false;
      },
      error => {
        this.showLoader = false;
        alert("Something went wrong");
        console.log("Error: ", error)
      });
  }

  // Format dates.
  private formatNotesDate() {
    this.noteItemsData.forEach(element => {
      element.CreatedDate = DateTimeHelper.ParseDate(element.CreatedDate); //new Date(this.datepipe.transform(element.CreatedDate, Configuration.dateFormat))
      element.ModifiedDate = DateTimeHelper.ParseDate(element.ModifiedDate);//new Date(this.datepipe.transform(element.ModifiedDate, Configuration.dateFormat))
    });
  }
  closeUpdateNote() {
    this.TabNotesGridStatus = true;
    this.TabEditNotesFormStatus = false;
  }

}
