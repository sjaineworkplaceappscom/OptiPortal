import { Component, OnInit, ViewChild, HostListener, Input } from '@angular/core';
import { UIHelper } from '../../helpers/ui.helpers';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
 
  
  /**
   * global variable
  */
  isMobile: boolean;
  gridHeight: number;

  /**
   * NOTES TAB VARIABLE
  */

  @Input() tabparent;
  getTabParent:string;

  TabAddNotesFormStatus:boolean = false;
  TabEditNotesFormStatus:boolean = false;
  TabNotesGridStatus:boolean = true; 
  addnotestring = '';
  noteRequetData: any[];
  selectedNote: any = {};

  @ViewChild('notesgrid') notesgrid;
  @ViewChild('noteform') noteform;
  @ViewChild('editnoteform') editnoteform;

  /**
   * ITEMS NOTES VARIABLE
  */

  noteItemsData: any[];
  selectedItemNote: any = {};
  itemNotesGrid:boolean = true;
  itemAddNotes:boolean = false;
  itemEditNotes:boolean = false;

  

  constructor() { }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    /**
     * Apply Grid Height
    */
    this.gridHeight = UIHelper.getMainContentHeight();
      
    /**
     * Check Mobile device
    */
      this.isMobile = UIHelper.isMobile();
  }

  ngOnInit() {

    this.getTabParent = this.tabparent;

    /**
     * Apply Grid Height
    */
    this.gridHeight = UIHelper.getMainContentHeight();
      
    /**
      * Check Mobile device
    */
    this.isMobile = UIHelper.isMobile();

    

  }

   /**
   * visible add new comment layout.
   */
  addNewComment() {
      // this.notesgrid.nativeElement.style.display = 'none';
      this.TabNotesGridStatus = false;
      // this.noteform.nativeElement.style.display = 'block';
      this.TabAddNotesFormStatus = true;
  }

   /**
   * add note. 
   * @param e 
   * @param action 
   */
    submitNote(e, action) {
        if (action == 'add') {
            // this.notesgrid.nativeElement.style.display = 'block';
            this.TabNotesGridStatus = true;
            // this.noteform.nativeElement.style.display = 'none';
            this.TabAddNotesFormStatus = false;
            let dynamicNotesString = localStorage.getItem("setRequestDynamicNotes");
            let dynamicNotes: any[] = JSON.parse(dynamicNotesString);
            if (dynamicNotes == undefined || dynamicNotes.length <= 0) {
                dynamicNotes = [];
            }
            let date = new Date();
            let CompleteDate = date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate();
            dynamicNotes.unshift({ Notes: this.addnotestring, NotesStatus: this.selectedNoteStatusItem.text, Date: CompleteDate, CreatedBy: 'prashant' });
            localStorage.setItem("setRequestDynamicNotes", JSON.stringify(dynamicNotes));
            this.noteRequetData = dynamicNotes;
        } else {
            // this.notesgrid.nativeElement.style.display = 'block';
            this.TabNotesGridStatus = true;
            // this.noteform.nativeElement.style.display = 'none';
            this.TabAddNotesFormStatus = false;
        }
        this.addnotestring = '';
    }

    editNotes(e, note) {
      console.log(e);
      console.log(note);
      // this.notesgrid.nativeElement.style.display = 'none';
      this.TabNotesGridStatus = false;
      // this.editnoteform.nativeElement.style.display = 'block';
      this.TabEditNotesFormStatus = true;
      this.selectedNote = note;
  }

  updateNote(e) {
      // this.notesgrid.nativeElement.style.display = 'block';
      this.TabNotesGridStatus = true;
      // this.editnoteform.nativeElement.style.display = 'none';
      this.TabEditNotesFormStatus = false;
      let index = this.noteRequetData.indexOf(this.selectedNote);
      if (index > -1) {
          this.noteRequetData[index].Notes = this.selectedNote.Notes;
      }

  }

  public noteStatus: Array<{ text: string, value: string }> = [
      { text: "General ", value: '0' },
      { text: "Rejected", value: '1' },
      { text: "Partial accepted", value: '2' },
  ];
  public selectedNoteStatusItem: { text: string, value: string } = this.noteStatus[0];

  /**
   * delete note from local storage. 
   */
  deleteNote({ sender, rowIndex, dataItem }) {
    this.noteRequetData.splice(rowIndex, 1);
    localStorage.setItem("setRequestDynamicNotes", JSON.stringify(this.noteRequetData));
  }



    /**
     * THIS SECTION FOR ITEMS NOTES
    */
 
     
    submitItemsNote(e, action) {
        if (action == 'add') {
            //this.notesitemgrid.nativeElement.style.display = 'block';
            //this.noteitemform.nativeElement.style.display = 'none';

            this.itemNotesGrid = true;
            this.itemAddNotes = false;

            let dynamicItemsNotesString = localStorage.getItem("setItemsDynamicNotes");
            let dynamicItemsNotes: any[] = JSON.parse(dynamicItemsNotesString);

            if (dynamicItemsNotes == undefined || dynamicItemsNotes.length <= 0) {
                dynamicItemsNotes = [];
            }

            let date = new Date();
            let CompleteDate = date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate();
            dynamicItemsNotes.unshift({ Notes: this.addnotestring, NotesStatus: this.selectedNoteStatusItem.text, Date: CompleteDate, CreatedBy: 'prashant' });
            localStorage.setItem("setItemsDynamicNotes", JSON.stringify(dynamicItemsNotes));
            this.noteItemsData = dynamicItemsNotes;
        } else {
            //this.notesitemgrid.nativeElement.style.display = 'block';
            //this.noteitemform.nativeElement.style.display = 'none';

            this.itemNotesGrid = true;
            this.itemAddNotes = false;
        }
        this.addnotestring = '';
    }

    addNewItemNotes() {
        this.itemNotesGrid = false;
        this.itemAddNotes = true;
    }

    deleteItemsNote({ sender, rowIndex, dataItem }) {
        this.noteItemsData.splice(rowIndex, 1);
        localStorage.setItem("setRequestDynamicNotes", JSON.stringify(this.noteItemsData));
    }

    editItemsNotes(e, note) {
        console.log(e);
        console.log(note);
        //this.notesitemgrid.nativeElement.style.display = 'none';
        //this.edititemnoteform.nativeElement.style.display = 'block';

        this.itemNotesGrid = false;
        this.itemEditNotes = true;

        this.selectedItemNote = note;
    }

    updateItemNote(e, updatednotevalue: any) {
        //this.notesitemgrid.nativeElement.style.display = 'block';
        //this.edititemnoteform.nativeElement.style.display = 'none';

        this.itemNotesGrid = true;
        this.itemEditNotes = false;

        let index = this.noteRequetData.indexOf(this.selectedItemNote);
        if (index > -1) {
            this.noteItemsData[index].Notes = updatednotevalue.value;
        }

    }

}
