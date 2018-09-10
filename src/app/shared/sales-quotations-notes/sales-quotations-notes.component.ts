import { Component, OnInit, HostListener } from '@angular/core';
import { UIHelper } from '../../helpers/ui.helpers';

@Component({
  selector: 'app-sales-quotations-notes',
  templateUrl: './sales-quotations-notes.component.html',
  styleUrls: ['./sales-quotations-notes.component.scss']
})
export class SalesQuotationsNotesComponent implements OnInit {

  /**
     * global variable
    */
   isMobile: boolean;
   gridHeight: number;

   /**
    * NOTES TAB VARIABLE
   */
   
  addNotesFormStatus: boolean = false;
  editNotesFormStatus: boolean = false;
  notesGridStatus: boolean = true;
  showLoader: boolean = false;

  constructor() { }

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
  }

  openNewNote(){
    this.notesGridStatus = this.editNotesFormStatus = false;
    this.addNotesFormStatus = true;
  }

  openEditNoteView(e, note) {
      this.notesGridStatus = this.addNotesFormStatus = false;
      this.editNotesFormStatus = true;
  }

  submitNote(){

  }

  closeAddNoteWindow(){
    this.notesGridStatus = true;
    this.addNotesFormStatus = false;
  }

  updateNote(){

  }

  closeUpdateNote(){
    this.notesGridStatus = true;
    this.editNotesFormStatus = false;
  }

}
