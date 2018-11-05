import { Component, OnInit, HostListener } from '@angular/core';
import { Configuration } from '../../helpers/Configuration';
import { UIHelper } from '../../helpers/ui.helpers';
import { openInvoicesNotes } from '../../demodata/open-invoices';
import { NotesModel } from '../../models/purchaserequest/notes';
import { CustomerEntityType } from '../../enums/enums';
import { AdvanceShipmentNotesListModel } from '../../tempmodels/advance-shipment-notes-list-model';
import { AdvanceShipmentNotesNoteModel } from '../../tempmodels/advance-shipment-notes-note-model';
import { ISubscription } from 'rxjs/Subscription';
import { SharedComponentService } from '../../services/shared-component.service';
import { DateTimeHelper } from '../../helpers/datetime.helper';
import { ToastService } from '../../helpers/services/toast.service';
import { AppMessages } from '../../helpers/app-messages';

@Component({
  selector: 'app-advance-shipment-notestab',
  templateUrl: './advance-shipment-notestab.component.html',
  styleUrls: ['./advance-shipment-notestab.component.scss']
})
export class AdvanceShipmentNotestabComponent implements OnInit {

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

  advanceShipmentNotesListModel: AdvanceShipmentNotesListModel = new AdvanceShipmentNotesListModel();
  noteModel: AdvanceShipmentNotesNoteModel = new AdvanceShipmentNotesNoteModel();
  addnotessub: ISubscription;
  getASNNoteSubs: ISubscription;
  updatenotessub: ISubscription;
  selectedASNNoteId: number;
  public noteTypes: Array<{ text: string, value: number }> = [
    { text: "General ", value: 1 },
    { text: "Rejected", value: 2 },
    { text: "Partial accepted", value: 3 }
  ];

  public selectedNoteItem: { text: string, value: number } = this.noteTypes[0];
  constructor(private sharedComponentService: SharedComponentService, private toast:ToastService) { }


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
  public getAdvanceShipmentNotesList1() {
    this.showLoader = true;
    this.noteItemsData = openInvoicesNotes;
    setTimeout(() => {
      this.showLoader = false;
    }, 1000);
  }



  ngOnInit() {
    //Apply Grid Height
    this.gridHeight = UIHelper.getMainContentHeight();
    // Check Mobile device
    this.isMobile = UIHelper.isMobile();
     this.advanceShipmentNotesListModel = JSON.parse(localStorage.getItem('SelectedDeliveryNote'))
     this.selectedASNNoteId = this.advanceShipmentNotesListModel.DeliveryNumber;
     this.getAdvanceShipmentNotesList(this.selectedASNNoteId.toString(), CustomerEntityType.AdvanceShipmentNote);
    
     //this.getAdvanceShipmentNotesList1();

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
    this.selectedNoteItem = { text: this.selectedNote.NoteText, value: this.selectedNote.NoteType };
  }

  public closeAddNote() {
    //close add note component
    this.TabNotesGridStatus = true;
    this.TabAddNotesFormStatus = false;
  }
   /**
      * Method to get list of inquries from server.
      */
     private getAdvanceShipmentNotesList(id: string, parentType: number) {

      this.showLoader = true;
      this.getASNNoteSubs = this.sharedComponentService.getASNNotesList(id.toString(), CustomerEntityType.AdvanceShipmentNote.toString()).subscribe(
        notesData => {
          if (notesData != null && notesData != undefined) {
            this.noteItemsData = JSON.parse(notesData);
            this.formatNotesDate();
          }
          this.showLoader = false;
        },
        error => {
          this.showLoader = false;
          //alert("Something went wrong");
          console.log("Error: ", error)
        });
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
  }

  public deleteNotes({ sender, rowIndex, dataItem }) {

  }

  submitNote(e) {
    let ASNId: number = this.advanceShipmentNotesListModel.ASNId;
    let ASNNumber: number = this.advanceShipmentNotesListModel.ASNNumber;
    this.noteModel.NoteType = this.selectedNoteItem.value;
    this.noteModel.ParentId = undefined;
    this.noteModel.ParentType = CustomerEntityType.AdvanceShipmentNote;
    this.noteModel.ASNNoteNumber = ASNNumber;
    this.noteModel.ASNNoteOptiId = ASNId.toString();

    this.addnotessub = this.sharedComponentService.AddASNNote(this.noteModel).subscribe(
      resp => {
        //this method is updating the status if notes updated then update inquiry status.
        //this.callPurchaseInquiryStatusUpdateAPI();
        this.toast.showSuccess(AppMessages.NoteAddedSuccessMsg);
      },
      error => {
        //alert("Something went wrong");
        console.log("Error: ", error)
      },
      () => {
        this.resetModelValues();
        this.closeAddNote();
        // Get notes data.
        this.advanceShipmentNotesListModel = JSON.parse(localStorage.getItem('SelectedDeliveryNote'))
        this.selectedASNNoteId = this.advanceShipmentNotesListModel.ASNId;
        this.getAdvanceShipmentNotesList(this.selectedASNNoteId.toString(), CustomerEntityType.AdvanceShipmentNote);
      });
      this.closeAddNote();
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

 
  public updateNote(e) {
    this.selectedNote;
    this.selectedNote.NoteType = this.selectedNoteItem.value;
    this.updatenotessub = this.sharedComponentService.updateNote(this.selectedNote).subscribe(
      resp => {
       
      // Get notes data.
      // Get notes data.
      this.advanceShipmentNotesListModel = JSON.parse(localStorage.getItem('SelectedDeliveryNote'))
      this.selectedASNNoteId = this.advanceShipmentNotesListModel.ASNId;
      this.getAdvanceShipmentNotesList(this.selectedASNNoteId.toString(), CustomerEntityType.AdvanceShipmentNote);
      this.toast.showSuccess(AppMessages.NoteUpdateSuccessMsg);

      },
      error => {
        this.showLoader = false;
        //alert("Something went wrong"); 
      // Get notes data.
      this.advanceShipmentNotesListModel = JSON.parse(localStorage.getItem('SelectedDeliveryNote'))
      this.selectedASNNoteId = this.advanceShipmentNotesListModel.ASNId;
      this.getAdvanceShipmentNotesList(this.selectedASNNoteId.toString(), CustomerEntityType.AdvanceShipmentNote);
        
      },
      () => {
        this.closeUpdateNote(e);
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
    if (this.getASNNoteSubs != undefined)
      this.getASNNoteSubs.unsubscribe();
    if (this.updatenotessub != undefined)
      this.updatenotessub.unsubscribe();
  }

}
