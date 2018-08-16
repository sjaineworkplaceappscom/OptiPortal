import { Component, OnInit, ViewChild, HostListener, Input } from '@angular/core';
import { UIHelper } from '../../helpers/ui.helpers';
import { NotesModel } from '../../models/purchaserequest/notes';
import { PurchaseInquiryService } from '../../services/purchase-enquiry.service';
import { SharedComponentService } from '../../services/shared-component.service';
import { CustomerEntityType } from '../../enums/enums';
import { Commonservice } from '../../services/commonservice.service';

@Component({
    selector: 'app-notes',
    templateUrl: './notes.component.html',
    styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

    @Input() NotesMasterData:NotesModel;

    /**
     * global variable
    */
    isMobile: boolean;
    gridHeight: number;

    /**
     * NOTES TAB VARIABLE
    */

    @Input() tabparent;
    getTabParent: string;

    TabAddNotesFormStatus: boolean = false;
    TabEditNotesFormStatus: boolean = false;
    TabNotesGridStatus: boolean = true;
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
    itemNotesGrid: boolean = true;
    itemAddNotes: boolean = false;
    itemEditNotes: boolean = false;
    noteModel: NotesModel;
    showLoader: boolean = false;

    public noteTypes: Array<{ text: string, value: number }> = [
        { text: "General ", value: 1 },
        { text: "Rejected", value: 2 },
        { text: "Partial accepted", value: 3 }
    ];
    public selectedNoteItem: { text: string, value: number } = this.noteTypes[0];

    constructor(private sharedComponentService: SharedComponentService,private commonService:Commonservice) {

    }

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

    ngOnChange(){
        //getting data of item at ngOnChange.
        this.commonService.currentNotesData.subscribe(
            data=>{              
            this.noteModel.ParentId = data.ParentId;            
            }
        );
      
    }

    ngOnInit() {     
        this.noteModel = new NotesModel();
        this.getTabParent = this.tabparent;
        /**
         * Apply Grid Height
        */
        this.gridHeight = UIHelper.getMainContentHeight();

        /**
          * Check Mobile device
        */
        this.isMobile = UIHelper.isMobile();
        this.commonService.currentNotesData.subscribe(
            data=>{                
            this.noteModel.ParentId=data.ParentId;
            }
        );

        this.getNoteList(this.noteModel.ParentId , CustomerEntityType.PurchaseInquiry);
        }

    /**
    * visible add new comment layout.
    */
    openNewNote() {
        this.TabNotesGridStatus = false;
        this.TabAddNotesFormStatus = true;
        // set default note type for add note.
        //this.noteModel.NoteType = 0;
        
    }

    /**
    * add note. 
    * @param e 
    * @param action 
    */
    submitNote(e) {
        this.TabNotesGridStatus = true;
        this.TabAddNotesFormStatus = false;
        let dynamicNotesString = localStorage.getItem("setRequestDynamicNotes");
        let dynamicNotes: any[] = JSON.parse(dynamicNotesString);
        if (dynamicNotes == undefined || dynamicNotes.length <= 0) {
            dynamicNotes = [];
        }
        let date = new Date();
        let CompleteDate = date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate();
        dynamicNotes.unshift({ Notes: this.addnotestring, NotesStatus: this.selectedNoteItem.text, Date: CompleteDate, CreatedBy: 'prashant' });
        localStorage.setItem("setRequestDynamicNotes", JSON.stringify(dynamicNotes));
        this.noteRequetData = dynamicNotes;
        // Add Notes Data in model. when comes from inquiry
        //this.noteModel.Notes
        //this.noteModel.NoteId
        this.noteModel.NoteType = this.selectedNoteItem.value;
        this.noteModel.GrandParentType = CustomerEntityType.PurchaseInquiry;
        this.noteModel.ParentType = CustomerEntityType.PurchaseInquiry;
        //  this.noteModel.GrantParentId = "895AB8E3-FFDE-4F04-ADC9-D8A7B5A091D6";
      //  this.noteModel.ParentId = "895AB8E3-FFDE-4F04-ADC9-D8A7B5A091D6";
        this.noteModel.GrantParentId = "";
        this.sharedComponentService.AddNote(this.noteModel).subscribe(
            resp => {
                console.log("record added:")
            },
            error => {
                
                alert("Something went wrong");
                console.log("Error: ", error)
            },
            () => {

            });
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

      /**
       * Method to get list of inquries from server.
       */
      public getNoteList(id: string, type: number) {
      
        this.showLoader = true;
        this.sharedComponentService.getNotesList(this.noteModel.ParentId,CustomerEntityType.PurchaseInquiry).subscribe(
          notesData => {
            console.log("data"+notesData);
            this.noteItemsData = JSON.parse(notesData);        
            this.showLoader = false;
          });
    }



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
            this.itemNotesGrid = true;
            this.itemAddNotes = false;

            let dynamicItemsNotesString = localStorage.getItem("setItemsDynamicNotes");
            let dynamicItemsNotes: any[] = JSON.parse(dynamicItemsNotesString);

            if (dynamicItemsNotes == undefined || dynamicItemsNotes.length <= 0) {
                dynamicItemsNotes = [];
            }

            // let date = new Date();
            // let CompleteDate = date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate();
            // dynamicItemsNotes.unshift({ Notes: this.addnotestring, NotesStatus: this.selectedNoteItem.text, Date: CompleteDate, CreatedBy: 'prashant' });
            // localStorage.setItem("setItemsDynamicNotes", JSON.stringify(dynamicItemsNotes));
            // this.noteItemsData = dynamicItemsNotes;
        } else {

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
        //this.noteItemsData.splice(rowIndex, 1);
       // localStorage.setItem("setRequestDynamicNotes", JSON.stringify(this.noteItemsData));
    }

    editItemsNotes(e, note) {
        console.log(e);
        console.log(note);

        this.itemNotesGrid = false;
        this.itemEditNotes = true;

        this.selectedItemNote = note;
    }

    updateItemNote(e, updatednotevalue: any) {
        this.itemNotesGrid = true;
        this.itemEditNotes = false;
        // let index = this.noteRequetData.indexOf(this.selectedItemNote);
        // if (index > -1) {
        //     this.noteItemsData[index].Notes = updatednotevalue.value;
        // }

    }

}

