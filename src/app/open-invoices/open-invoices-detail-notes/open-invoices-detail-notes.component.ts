import { Component, OnInit, HostListener } from '@angular/core';
import { UIHelper } from '../../helpers/ui.helpers';
import { openInvoicesNotes } from '../../demodata/open-invoices';
import { Configuration } from '../../helpers/Configuration';
import { OpenInvoiceNoteModel } from '../../tempmodels/open-invoice-note-model';
import { OpenInvoiceListModel } from '../../tempmodels/open-invoice-list-model';
import { ISubscription } from 'rxjs/Subscription';
import { SharedComponentService } from '../../services/shared-component.service';
import { CustomerEntityType } from '../../enums/enums';
import { DateTimeHelper } from '../../helpers/datetime.helper';
import { AppMessages } from '../../helpers/app-messages';
import { ToastService } from '../../helpers/services/toast.service';


@Component({
  selector: 'app-open-invoices-detail-notes',
  templateUrl: './open-invoices-detail-notes.component.html',
  styleUrls: ['./open-invoices-detail-notes.component.scss']
})
export class OpenInvoicesDetailNotesComponent implements OnInit {
  
  constructor(private sharedComponentService: SharedComponentService, private toast:ToastService) { }

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

 openInvoiceListModel: OpenInvoiceListModel = new OpenInvoiceListModel();
 noteModel: OpenInvoiceNoteModel = new OpenInvoiceNoteModel();
 addnotessub: ISubscription;
 getOpenInvoiceNoteSubs: ISubscription;
 updatenotessub: ISubscription;
 selectedOpenInvoiceId:number;
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
public getOpenInvoicesAllNotesList1() {
 this.showLoader = true;
 this.noteItemsData = openInvoicesNotes;
 setTimeout(()=>{    
   this.showLoader = false;
 }, 1000);
} 

 ngOnInit() {
   //Apply Grid Height
   this.gridHeight = UIHelper.getMainContentHeight();
   // Check Mobile device
   this.isMobile = UIHelper.isMobile();
   this.openInvoiceListModel = JSON.parse(localStorage.getItem('SelectedOpenInvoice'))
   this.selectedOpenInvoiceId = this.openInvoiceListModel.InvoiceId;
   this.getOpenInvoiceNoteList(this.selectedOpenInvoiceId.toString(), CustomerEntityType.OpenInvoice);
  // this.getOpenInvoicesAllNotesList1();
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
  this.showLoader = true;
  let OpenInvoiceId: number = this.openInvoiceListModel.InvoiceId;
  let OpenInvoiceNumber: number = this.openInvoiceListModel.InvoiceNumber;
  this.noteModel.NoteType = this.selectedNoteItem.value;
  this.noteModel.ParentId = undefined;
  this.noteModel.ParentType = CustomerEntityType.OpenInvoice;
  this.noteModel.OpenInvoiceNoteNumber = OpenInvoiceNumber;
  this.noteModel.OpenInvoiceNoteOptiId = OpenInvoiceId.toString();

  this.addnotessub = this.sharedComponentService.AddOpenInvoiceNote(this.noteModel).subscribe(
    resp => {
      //this method is updating the status if notes updated then update inquiry status.
      //this.callPurchaseInquiryStatusUpdateAPI();
      this.resetModelValues();
      this.closeAddNote();
      // Get notes data.
      this.openInvoiceListModel = JSON.parse(localStorage.getItem('SelectedOpenInvoice'))
      let OpenInvoiceId: number = this.openInvoiceListModel.InvoiceId;
      let OpenInvoiceNumber: number = this.openInvoiceListModel.InvoiceNumber;
      this.getOpenInvoiceNoteList(OpenInvoiceId.toString(), CustomerEntityType.OpenInvoice);
      this.showLoader = false;
      this.toast.showSuccess(AppMessages.NoteAddedSuccessMsg);
    },
    error => {
      this.showLoader = false;
      //alert("Something went wrong");
      this.resetModelValues();
      this.closeAddNote();
      // Get notes data.
      this.openInvoiceListModel = JSON.parse(localStorage.getItem('SelectedOpenInvoice'))
      let OpenInvoiceId: number = this.openInvoiceListModel.InvoiceId;
      let OpenInvoiceNumber: number = this.openInvoiceListModel.InvoiceNumber;
      this.getOpenInvoiceNoteList(OpenInvoiceId.toString(), CustomerEntityType.OpenInvoice);
      this.showLoader = false;
      console.log("Error: ", error)
    },
    () => {
      this.showLoader = false;
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

 
/**
    * Method to get list of inquries from server.
    */ 
   /**
      * Method to get list of inquries from server.
      */
  private getOpenInvoiceNoteList(id: string, parentType: number) {

    this.showLoader = true;
    this.getOpenInvoiceNoteSubs = this.sharedComponentService.getOpenInvoiceNotesList(id.toString(), CustomerEntityType.OpenInvoice.toString()).subscribe(
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

  // Format dates.
  private formatNotesDate() {
    this.noteItemsData.forEach(element => {
      element.CreatedDate = DateTimeHelper.ParseDate(element.CreatedDate); //new Date(this.datepipe.transform(element.CreatedDate, Configuration.dateFormat))
      element.ModifiedDate = DateTimeHelper.ParseDate(element.ModifiedDate);//new Date(this.datepipe.transform(element.ModifiedDate, Configuration.dateFormat))
    });

  }

 public updateNote(e){
  this.selectedNote;
  this.showLoader = true;
  //selected note object : this.selectedNote
  this.selectedNote.NoteType = this.selectedNoteItem.value;
  this.updatenotessub = this.sharedComponentService.updateNote(this.selectedNote).subscribe(
    resp => {
      //this method is updating the status if notes updated then update inquiry status.

      this.openInvoiceListModel = JSON.parse(localStorage.getItem('SelectedOpenInvoice'))
      let OpenInvoiceId: number = this.openInvoiceListModel.InvoiceId;
      let OpenInvoiceNumber: number = this.openInvoiceListModel.InvoiceNumber;
      this.getOpenInvoiceNoteList(OpenInvoiceId.toString(), CustomerEntityType.OpenInvoice);
      this.toast.showSuccess(AppMessages.NoteUpdateSuccessMsg);
    },
    error => {
      this.showLoader = false;
      //alert("Something went wrong"); 
      this.openInvoiceListModel = JSON.parse(localStorage.getItem('SelectedOpenInvoice'))
      let OpenInvoiceId: number = this.openInvoiceListModel.InvoiceId;
      let OpenInvoiceNumber: number = this.openInvoiceListModel.InvoiceNumber;
      this.getOpenInvoiceNoteList(OpenInvoiceId.toString(), CustomerEntityType.OpenInvoice);
      
    },
    () => {
      this.showLoader = false;
      this.closeUpdateNote(e);
    }); 

 }
 ngOnDestroy() {
  if (this.addnotessub != undefined)
    this.addnotessub.unsubscribe();
  if (this.getOpenInvoiceNoteSubs != undefined)
    this.getOpenInvoiceNoteSubs.unsubscribe();
  if (this.updatenotessub != undefined)
    this.updatenotessub.unsubscribe();
}
 

}
