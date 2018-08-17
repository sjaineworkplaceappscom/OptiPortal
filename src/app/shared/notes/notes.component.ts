import { Component, OnInit, ViewChild, HostListener, Input } from '@angular/core';
import { UIHelper } from '../../helpers/ui.helpers';
import { NotesModel } from '../../models/purchaserequest/notes';
import { PurchaseInquiryService } from '../../services/purchase-enquiry.service';
import { SharedComponentService } from '../../services/shared-component.service';
import { CustomerEntityType } from '../../enums/enums';
import { Commonservice } from '../../services/commonservice.service';
import { DatePipe } from '../../../../node_modules/@angular/common';
import { Configuration } from '../../../assets/configuration';

@Component({
    selector: 'app-notes',
    templateUrl: './notes.component.html',
    styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

    @Input() NotesMasterData: NotesModel;

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
    //noteRequetData: any[];
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

    constructor(private sharedComponentService: SharedComponentService, private commonService: Commonservice, public datepipe: DatePipe) {

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

    ngOnChange() {
        //getting data of item at ngOnChange.
        // this.commonService.currentNotesData.subscribe(
        //     data=>{
        //     this.noteModel.ParentId = data.ParentId;
        //     console.log("OnChange-parendId:"+this.noteModel.ParentId);
        //     }
        // );
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
            data => {
                this.noteModel.ParentId = data.ParentId;
                // Get notes data.
                this.getNoteList(this.noteModel.ParentId, CustomerEntityType.PurchaseInquiry);
            }
        );

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


        //related to local storage.
        // let dynamicNotesString = localStorage.getItem("setRequestDynamicNotes");
        // let dynamicNotes: any[] = JSON.parse(dynamicNotesString);
        // if (dynamicNotes == undefined || dynamicNotes.length <= 0) {
        //     dynamicNotes = [];
        // }
        // let date = new Date();
        // let CompleteDate = date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate();
        // dynamicNotes.unshift({ Notes: this.addnotestring, NotesStatus: this.selectedNoteItem.text, Date: CompleteDate, CreatedBy: 'prashant' });
        // localStorage.setItem("setRequestDynamicNotes", JSON.stringify(dynamicNotes));
        // this.noteRequetData = dynamicNotes;


        // Add Notes Data in model. when comes from inquiry
        //this.noteModel.Notes
        //this.noteModel.NoteId
        this.noteModel.NoteType = this.selectedNoteItem.value;
        this.noteModel.GrandParentType = CustomerEntityType.PurchaseInquiry;
        this.noteModel.ParentType = CustomerEntityType.PurchaseInquiry;
        //  this.noteModel.GrantParentId = "895AB8E3-FFDE-4F04-ADC9-D8A7B5A091D6";
        //  this.noteModel.ParentId = "895AB8E3-FFDE-4F04-ADC9-D8A7B5A091D6";
        this.noteModel.GrantParentId = "";
        this.addNoteForInquiry(this.noteModel);
        // this.addnotestring = '';
    }

    openEditNoteView(e, note) {
        console.log(e);
        console.log(note);
        // this.notesgrid.nativeElement.style.display = 'none';
        this.TabNotesGridStatus = false;
        // this.editnoteform.nativeElement.style.display = 'block';
        this.TabEditNotesFormStatus = true;
        this.selectedNote = note;
    }
   
   

    /**
     * close note add form
     * @param e
     */
    closeNoteWindow(e) {
        this.TabNotesGridStatus = true;
        this.TabAddNotesFormStatus = false;
    }




    /**
     * delete note from local storage.
     */
    deleteNote({ sender, rowIndex, dataItem }) {
        console.log("delete note call:");
        // this.noteRequetData.splice(rowIndex, 1);
        // localStorage.setItem("setRequestDynamicNotes", JSON.stringify(this.noteRequetData));
    }



    openEditItemNoteView(e, note) {
        console.log(e);
        console.log(note);
        // this.notesgrid.nativeElement.style.display = 'none';
        this.TabNotesGridStatus = false;
        // this.editnoteform.nativeElement.style.display = 'block';
        this.TabEditNotesFormStatus = true;
        this.selectedNote = note;
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

        this.noteItemsData.splice(rowIndex, 1);
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

    /**
     * method will close add note form and reset model.
     */
    resetModelAndCloseAddNoteView() {
        //close add note component
        this.TabNotesGridStatus = true;
        this.TabAddNotesFormStatus = false;
        this.noteModel.Notes = '';
    }


    //All API calling methods

    /**
     * Method to get list of inquries from server.
     */
    public getNoteList(id: string, type: number) {

        this.showLoader = true;
        this.sharedComponentService.getNotesList(this.noteModel.ParentId, CustomerEntityType.PurchaseInquiry).subscribe(
            notesData => {
                
                this.formatNotesDate(notesData);
                 console.log("Note data from server: " + notesData);
                this.noteItemsData = JSON.parse(notesData);
                this.showLoader = false;
            });
    }   


    public  formatNotesDate(notesData:any){
        if (notesData != null && notesData != undefined) {
            this.noteItemsData = JSON.parse(notesData);
            this.noteItemsData.forEach(element => {
              element.CreatedDate = new Date(this.datepipe.transform(element.CreatedDate, Configuration.dateFormat))
              element.ModifiedDate = new Date(this.datepipe.transform(element.ModifiedDate, Configuration.dateFormat))
             
            });
        }
    }
    /**
     * Call api to add note.
     * @param NotesModel updated note model which we want to add.
     */
    public addNoteForInquiry(NotesModel: NotesModel) {
        this.sharedComponentService.AddNote(this.noteModel).subscribe(
            resp => {
                console.log("record added:")
            },
            error => {

                alert("Something went wrong");
                console.log("Error: ", error)
            },
            () => {
                this.resetModelAndCloseAddNoteView();
                // Get notes data.
                this.getNoteList(this.noteModel.ParentId, CustomerEntityType.PurchaseInquiry);


            });
    }
    
    /**
     * method to call delete note api.
     * @param param0 contains  rowIndex and data item.
     */
    public deleteNotes({ sender, rowIndex, dataItem }) {

        this.sharedComponentService.deleteNote(this.noteItemsData[rowIndex].NoteId).subscribe(
            resp => {
                
                console.log("record deleted:")
                this.noteItemsData.splice(rowIndex, 1);
            },
            error => {

                alert("Something went wrong");
                console.log("Error: ", error)
                this.getNoteList(this.noteModel.ParentId, CustomerEntityType.PurchaseInquiry);
            },
            () => {
              
            });
        //this.noteItemsData.splice(rowIndex, 1);
        // localStorage.setItem("setRequestDynamicNotes", JSON.stringify(this.noteItemsData));
    }

    updateNote(e) {
        
        this.selectedNote
        console.log(this.selectedNote);
        // this.notesgrid.nativeElement.style.display = 'block';
        this.TabNotesGridStatus = true;
        // this.editnoteform.nativeElement.style.display = 'none';
        this.TabEditNotesFormStatus = false;
        this.sharedComponentService.updateNote(this.selectedNote).subscribe(
            resp => {
                console.log("record updated:")
            },
            error => {
                alert("Something went wrong");
            },
            () => {
                this.getNoteList(this.noteModel.ParentId, CustomerEntityType.PurchaseInquiry);
            });
       
    }

}

