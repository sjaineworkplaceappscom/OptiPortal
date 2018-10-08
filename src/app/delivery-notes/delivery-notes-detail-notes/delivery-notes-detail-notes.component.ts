import { Component, OnInit, HostListener } from '@angular/core';

import { UIHelper } from '../../helpers/ui.helpers';
import { deliveryNotesTabNotes } from '../../demodata/delivery-notes';
import { NotesModel } from '../../models/purchaserequest/notes';
import { CustomerEntityType } from '../../enums/enums';
import { SalesNoteModel } from '../../tempmodels/SalesNoteModel';
import { ISubscription } from '../../../../node_modules/rxjs/Subscription';
import { SharedComponentService } from '../../services/shared-component.service';
import { DateTimeHelper } from '../../helpers/datetime.helper';
import { DeliveryNoteNoteModel } from '../../tempmodels/delivery-note-note-model';
import { DeliveryNoteListModel } from '../../tempmodels/delivery-note-list-model';
import { Configuration } from '../../helpers/Configuration';

@Component({
  selector: 'app-delivery-notes-detail-notes',
  templateUrl: './delivery-notes-detail-notes.component.html',
  styleUrls: ['./delivery-notes-detail-notes.component.scss']
})
export class DeliveryNotesDetailNotesComponent implements OnInit {

  /**
   * global variable
  */
  imgPath = Configuration.imagePath;
  isMobile: boolean;
  gridHeight: number;

  TabAddNotesFormStatus: boolean = false;
  TabEditNotesFormStatus: boolean = false;
  TabNotesGridStatus: boolean = true;
  addnotestring = '';
  selectedNote: any = {};
  showLoader: boolean = false;
  notesSearchValue: string = ""

  public noteItemsData: any[];

  deliveryNoteListModel: DeliveryNoteListModel = new DeliveryNoteListModel();
  noteModel: DeliveryNoteNoteModel = new DeliveryNoteNoteModel();
  addnotessub: ISubscription;
  getDeliveryNotesNoteSubs: ISubscription;
  updatenotessub: ISubscription;
  selectedDeliveryNoteId:number;
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

  /**
  * Method to get list of inquries from server.
 */
  public getDeliveryAllNotesList() {
    this.showLoader = true;
    this.noteItemsData = deliveryNotesTabNotes;
    setTimeout(() => {
      this.showLoader = false;
    }, 1000);
  }

  constructor(private sharedComponentService: SharedComponentService) { }

  ngOnInit() {
    //Apply Grid Height
    this.gridHeight = UIHelper.getMainContentHeight();
    // Check Mobile device
    this.isMobile = UIHelper.isMobile();
    debugger;
    //this.getDeliveryAllNotesList();
    this.deliveryNoteListModel = JSON.parse(localStorage.getItem('SelectedDeliveryNote'))
    this.selectedDeliveryNoteId = this.deliveryNoteListModel.DeliveryId;
    // let deliveryNoteOptiId1: number = this.deliveryNoteNoteModel.DeliveryNoteOptiId;
    this.getDeliveryNotesNoteList(this.selectedDeliveryNoteId.toString(), CustomerEntityType.SalesQuotation);
    this.getDeliveryNotesNoteList(3 + "", 3);
  }

  public openNewNote() {
    this.TabNotesGridStatus = this.TabEditNotesFormStatus = false;
    this.TabAddNotesFormStatus = true;
    this.resetModelValues();
  }

  openEditNoteView(e, note) {
    this.TabNotesGridStatus = this.TabAddNotesFormStatus = false;
    this.TabEditNotesFormStatus = true;
    this.selectedNote = note;
    this.selectedNoteItem = this.noteTypes[0];// { text: this.selectedNote.NoteText, value: this.selectedNote.NoteType };
  }

  public closeAddNote() {
    //close add note component
    this.TabNotesGridStatus = true;
    this.TabAddNotesFormStatus = false;
  }

  closeUpdateNote(e) {
    // this.notesgrid.nativeElement.style.display = 'block';
    this.TabNotesGridStatus = true;
    // this.editnoteform.nativeElement.style.display = 'none';
    this.TabEditNotesFormStatus = false;
    //reset model after close edit form.
    this.resetModelValues();
  }

  /**
   * method will close add note form and reset model.
   */
  public resetModelValues() {
    //reset note model and type.
    this.noteModel.Notes = '';
    let noteTypeDefault = { text: "General ", value: 1 };
    this.selectedNoteItem = noteTypeDefault;
    this.noteModel.NoteType = noteTypeDefault.value;

  }

  public deleteNotes({ sender, rowIndex, dataItem }) {

  }

  submitNote(e) {
    let DNId: number = this.deliveryNoteListModel.DeliveryId;
    let DNNumber: number = this.deliveryNoteListModel.DeliveryNumber;
    this.noteModel.NoteType = this.selectedNoteItem.value;
    this.noteModel.ParentId = undefined;
    this.noteModel.ParentType = CustomerEntityType.DeliveryNotes;
    this.noteModel.DeliveryNoteNumber = DNNumber;
    this.noteModel.DeliveryNoteOptiId = DNId.toString();

    this.addnotessub = this.sharedComponentService.AddDeliveryNotesNote(this.noteModel).subscribe(
      resp => {
        //this method is updating the status if notes updated then update inquiry status.
        //this.callPurchaseInquiryStatusUpdateAPI();
      },
      error => {
        alert("Something went wrong");
        console.log("Error: ", error)
      },
      () => {
        this.resetModelValues();
        this.closeAddNote();
        // Get notes data.
        this.deliveryNoteListModel = JSON.parse(localStorage.getItem('SelectedDeliveryNote'))
        let DNId: number = this.deliveryNoteListModel.DeliveryId;
        let DNNumber: number = this.deliveryNoteListModel.DeliveryNumber;
        this.getDeliveryNotesNoteList(DNId.toString(), CustomerEntityType.DeliveryNotes);
      });
    this.closeAddNote();
  }

  updateNote(e) {
    this.selectedNote;
    //selected note object : this.selectedNote
    this.selectedNote.NoteType = this.selectedNoteItem.value;
    this.updatenotessub = this.sharedComponentService.updateNote(this.selectedNote).subscribe(
      resp => {
        //this method is updating the status if notes updated then update inquiry status.
        
        let deliveryNumber: number = this.deliveryNoteListModel.DeliveryNumber;
        // let quotationNumber: number = this.noteModel.DeliveryNoteOptiId;

        // Get notes data.
        this.deliveryNoteListModel = JSON.parse(localStorage.getItem('SelectedDeliveryNote'))
        let DNId: number = this.deliveryNoteListModel.DeliveryId;
        let DNNumber: number = this.deliveryNoteListModel.DeliveryNumber;
        this.getDeliveryNotesNoteList(DNId.toString(), CustomerEntityType.DeliveryNotes);

      },
      error => {
        this.showLoader = false;
        alert("Something went wrong"); 
        this.deliveryNoteListModel = JSON.parse(localStorage.getItem('SelectedDeliveryNote'))
        let DNId: number = this.deliveryNoteListModel.DeliveryId;
        let DNNumber: number = this.deliveryNoteListModel.DeliveryNumber;
        this.getDeliveryNotesNoteList(DNId.toString(), CustomerEntityType.DeliveryNotes);
        
      },
      () => {
        this.closeUpdateNote(e);
      }); 

  }

  /**
   * close note add form
   * @param e
   */
  public closeAddNoteWindow(e) {
    this.TabNotesGridStatus = true;
    this.TabAddNotesFormStatus = false;
    this.resetModelValues();
  }


  /**
      * Method to get list of inquries from server.
      */
  private getDeliveryNotesNoteList(id: string, parentType: number) {

    this.showLoader = true;
    this.getDeliveryNotesNoteSubs = this.sharedComponentService.getDeliveryNoteNotesList(id.toString(), CustomerEntityType.DeliveryNotes.toString()).subscribe(
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

  ngOnDestroy() {
    if (this.addnotessub != undefined)
      this.addnotessub.unsubscribe();
    if (this.getDeliveryNotesNoteSubs != undefined)
      this.getDeliveryNotesNoteSubs.unsubscribe();
    if (this.updatenotessub != undefined)
      this.updatenotessub.unsubscribe();
  }

}
