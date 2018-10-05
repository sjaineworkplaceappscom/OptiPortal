import { Component, OnInit, HostListener } from '@angular/core';

import { UIHelper } from '../../helpers/ui.helpers';
import { openInvoicesNotes } from '../../demodata/open-invoices';


import { SalesNoteModel } from '../../tempmodels/SalesNoteModel';
import { Configuration } from '../../helpers/Configuration';


@Component({
  selector: 'app-open-invoices-detail-notes',
  templateUrl: './open-invoices-detail-notes.component.html',
  styleUrls: ['./open-invoices-detail-notes.component.scss']
})
export class OpenInvoicesDetailNotesComponent implements OnInit {
  
  constructor() { }

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

 noteModel:SalesNoteModel = new SalesNoteModel();
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
public getOpenInvoicesAllNotesList() {
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

   this.getOpenInvoicesAllNotesList();
   
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
 }

 public deleteNotes({ sender, rowIndex, dataItem }) {

 }

 submitNote(e) {
   
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
   private getDeliveryNotesNoteList(salesId: string, parentType: number) {
    
   }

     // Format dates.
 private formatNotesDate() {
  

 }

 public updateNote(e){

 }
 

}
