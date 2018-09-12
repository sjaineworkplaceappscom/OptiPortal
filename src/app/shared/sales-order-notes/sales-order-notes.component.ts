import { Component, OnInit, HostListener } from '@angular/core';
import { UIHelper } from '../../helpers/ui.helpers';
import { ISubscription } from '../../../../node_modules/rxjs/Subscription';
import { SalesOrder } from '../../tempmodels/sales-order';
import { SalesNoteModel } from '../../tempmodels/SalesNoteModel';
import { DateTimeHelper } from '../../helpers/datetime.helper';
import { SharedComponentService } from '../../services/shared-component.service';
import { CustomerEntityType } from '../../enums/enums';

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
  updatenotessub: ISubscription;

  salesOrderModel: SalesOrder = new SalesOrder();
  noteModel: SalesNoteModel = new SalesNoteModel();
  constructor(private sharedComponentService: SharedComponentService) { }

  public noteTypes: Array<{ text: string, value: number }> = [
    { text: "General ", value: 1 },
    { text: "Rejected", value: 2 },
    { text: "Partial accepted", value: 3 }
  ];
 
  public selectedNoteItem: { text: string, value: number } = this.noteTypes[0];

  selectedNote: any = {};

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
    this.getSalesNotesList(orderId.toString(), CustomerEntityType.SalesOrder);

  }

  openNewNote() {
    this.TabNotesGridStatus = this.TabEditNotesFormStatus = false;
    this.TabAddNotesFormStatus = true;
    this.resetModelValues();
  }

  openEditNoteView(e, note) {
    this.TabNotesGridStatus = this.TabAddNotesFormStatus = false;
    this.TabEditNotesFormStatus = true;
    this.selectedNote = note;
    this.selectedNoteItem = this.noteTypes[0];
  }

  submitNote() {
    //debugger;
    // Add Notes Data in model. when comes from inquiry  
    this.salesOrderModel = JSON.parse(localStorage.getItem('SelectedSalesOrder'))
    let orderId: number = this.salesOrderModel.OrderId;
    let orderNumber: number = this.salesOrderModel.OrderNumber;
    this.noteModel.NoteType = this.selectedNoteItem.value;
    this.noteModel.ParentId = undefined;
    this.noteModel.SalesOptiId = orderId.toString();
    this.noteModel.SaleNumber = orderNumber;
    this.noteModel.ParentType = CustomerEntityType.SalesOrder;

    this.addnotessub = this.sharedComponentService.AddSalesOrderNote(this.noteModel).subscribe(
      resp => {
        console.log("record added:")
      },
      error => {
        alert("Something went wrong");
        console.log("Error: ", error)
      },
      () => {
        this.resetModelValues();
        this.closeAddNote();
        // Get notes data.
        this.salesOrderModel = JSON.parse(localStorage.getItem('SelectedSalesOrder'));
        let orderId: number = this.salesOrderModel.OrderId;
        let orderNumber: number = this.salesOrderModel.OrderNumber;
        this.getSalesNotesList(orderId.toString(), this.noteModel.ParentType);
      });
  }

  closeAddNoteWindow() {
    this.TabNotesGridStatus = true;
    this.TabAddNotesFormStatus = false;
  }

  updateNote(e) {

    this.selectedNote;
    //selected note object : this.selectedNote
    this.selectedNote.NoteType = this.selectedNoteItem.value;
    this.updatenotessub = this.sharedComponentService.updateNote(this.selectedNote).subscribe(
      resp => {
        //this method is updating the status if notes updated then update inquiry status.
        this.salesOrderModel = JSON.parse(localStorage.getItem('SelectedSalesOrder'));
        let orderId: number = this.salesOrderModel.OrderId;
        this.getSalesNotesList(orderId.toString(), CustomerEntityType.SalesOrder);

      },
      error => {
        this.showLoader = false;
        alert("Something went wrong");
        this.salesOrderModel = JSON.parse(localStorage.getItem('SelectedSalesOrder'));
        let orderId: number = this.salesOrderModel.OrderId;
        this.getSalesNotesList(orderId.toString(), CustomerEntityType.SalesOrder);

      },
      () => {
        this.closeUpdateNote(e);
      });


  }

  /**
     * Method to get list of inquries from server.
     */
  private getSalesNotesList(salesId: string, parentType: number) {
    this.showLoader = true;
    this.getnotessub = this.sharedComponentService.getSalesOrderNotesList(salesId, parentType).subscribe(
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

  closeUpdateNote(e) {
    this.TabNotesGridStatus = true;
    this.TabEditNotesFormStatus = false;
    this.resetModelValues();
  }

  /**
   * method will close add note form and reset model.
   */
  public resetModelValues() {
    //reset note model and type.
    this.noteModel.Notes = '';
    let noteTypeDefault = { text: "General ", value: 1 };
    this.noteModel.NoteType = noteTypeDefault.value;
    this.selectedNoteItem = noteTypeDefault;
  }
  /**
    * close add note view.
    */
  public closeAddNote() {
    //close add note component
    this.TabNotesGridStatus = true;
    this.TabAddNotesFormStatus = false;
  }

  ngOnDestroy() {
    if (this.addnotessub != undefined)
      this.addnotessub.unsubscribe();
    if (this.getnotessub != undefined)
      this.getnotessub.unsubscribe();
    if (this.updatenotessub != undefined)
      this.updatenotessub.unsubscribe();
  }
}
