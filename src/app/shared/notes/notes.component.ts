import { Component, OnInit, ViewChild, HostListener, Input } from '@angular/core';
import { UIHelper } from '../../helpers/ui.helpers';
import { NotesModel } from '../../models/purchaserequest/notes';
import { SharedComponentService } from '../../services/shared-component.service';
import { CustomerEntityType, PurchaseInquiryStatus, OperationType } from '../../enums/enums';
import { Commonservice } from '../../services/commonservice.service';
import { DatePipe } from '../../../../node_modules/@angular/common';
import { DateTimeHelper } from '../../helpers/datetime.helper';
import { ISubscription } from '../../../../node_modules/rxjs/Subscription';
import { TempPurchaseInquiryModel } from '../../tempmodels/temppurchase-inquiry';
import { PurchaseInquiryService } from '../../services/purchase-enquiry.service';

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
    selectedNote: any = {};
    showLoader: boolean = false;

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
    notessub: ISubscription;
    getnotessub: ISubscription;
    addnotessub: ISubscription;
    updatenotessub: ISubscription;
    deletenotessub: ISubscription;
    updatePIStatussub: ISubscription;
    searchNotes: string = "";
    notesSearchValue: string = ""

    isCancelStatus: boolean = false;
    public noteTypes: Array<{ text: string, value: number }> = [
        { text: "General ", value: 1 },
        { text: "Rejected", value: 2 },
        { text: "Partial accepted", value: 3 }
    ];

    public selectedNoteItem: { text: string, value: number } = this.noteTypes[0];

    constructor(private sharedComponentService: SharedComponentService, private commonService: Commonservice, public datepipe: DatePipe, private purchaseInquiryService: PurchaseInquiryService) {
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        //Apply Grid Height
        this.gridHeight = UIHelper.getMainContentHeight();
        // Check Mobile device
        this.isMobile = UIHelper.isMobile();
    }



    ngOnInit() {

        // UI Start        
        this.getTabParent = this.tabparent;
        //Apply Grid Height
        this.gridHeight = UIHelper.getMainContentHeight();

        // Check Mobile device
        this.isMobile = UIHelper.isMobile();
        // UI End

        //get status of selected inquiry for disabling or enabling  forms
        let inquiryDetail: string = localStorage.getItem("SelectedPurchaseInquery");
        let inquiryData: any = JSON.parse(inquiryDetail);
        if (inquiryData != null || inquiryData != undefined) {
            let inquiryStatus = inquiryData.Status;
            if (inquiryStatus == PurchaseInquiryStatus.Cancelled) {
                this.isCancelStatus = true;
            }
        }
        this.noteModel = new NotesModel();
        // Subscriber for Load data.
        this.notessub = this.commonService.currentNotesData.subscribe(
            (data: NotesModel) => {
                this.noteModel = data;

                // Note parent Id
                if (this.noteModel.ParentType == CustomerEntityType.PurchaseInquiry) {
                    // Get notes data.
                    this.getNoteList(this.noteModel.ParentId, data.ParentType);

                }

            },
            error => {
                this.showLoader = false;
                alert("Something went wrong");
                console.log("Error: ", error)
            }
        );

    }
    ngOnDestroy() {
        if (this.notessub != undefined)
            this.notessub.unsubscribe();

        if (this.addnotessub != undefined)
            this.addnotessub.unsubscribe();

        if (this.getnotessub != undefined)
            this.getnotessub.unsubscribe();

        if (this.updatenotessub != undefined)
            this.updatenotessub.unsubscribe();

        if (this.deletenotessub != undefined)
            this.deletenotessub.unsubscribe();

         if (this.updatePIStatussub != undefined)
            this.updatePIStatussub.unsubscribe();
    }


    /**
    * visible add new comment layout.
    */
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

    /**
    * add note.
    * @param e
    * @param action
    */
    submitNote(e) {
        // Add Notes Data in model. when comes from inquiry        
        this.noteModel.NoteType = this.selectedNoteItem.value;
        this.addnotessub = this.sharedComponentService.AddNote(this.noteModel).subscribe(
            resp => {
                //this method is updating the status if notes updated then update inquiry status.
                this.callPurchaseInquiryStatusUpdateAPI();
               // console.log("record added:")
            },
            error => {
                alert("Something went wrong");
                console.log("Error: ", error)
            },
            () => {
                this.resetModelValues();
                this.closeAddNote();
                // Get notes data.
                this.getNoteList(this.noteModel.ParentId, this.noteModel.ParentType);
            });

    }

    /**
     * call api for update status of inquiry.
     */
    callPurchaseInquiryStatusUpdateAPI() {
        debugger;
        let purchaseInquiryDetail: TempPurchaseInquiryModel = new TempPurchaseInquiryModel();
        //check from local storage.
        if (parseInt(localStorage.getItem("OperationType")) == OperationType.Update) {
            purchaseInquiryDetail = JSON.parse(localStorage.getItem('SelectedPurchaseInquery'));
            if (purchaseInquiryDetail.Status == PurchaseInquiryStatus.New) {
                purchaseInquiryDetail.Status = PurchaseInquiryStatus.Updated;
                this.updatePIStatussub = this.purchaseInquiryService.UpdatePurchaseInquiry(purchaseInquiryDetail).subscribe(
                    data => {

                        // console.log("NOte:data from server:" + JSON.stringify(data));
                         localStorage.setItem("SelectedPurchaseInquery",JSON.stringify(data)); 
                        // console.log("NOte:data from LocalStorage:" + JSON.stringify(localStorage.getItem('SelectedPurchaseInquery')));
                         purchaseInquiryDetail = JSON.parse( localStorage.getItem('SelectedPurchaseInquery'))
                        // localStorage.setItem("SelectedPurchaseInquery", JSON.stringify(data));
                        // purchaseInquiryDetail = JSON.parse(localStorage.getItem('SelectedPurchaseInquery'));
                         //console.log("NOte:data Model:" + JSON.stringify(purchaseInquiryDetail));

                        this.commonService.refreshPIList(null);
                    }, error => {
                        this.commonService.refreshPIList(null);
                    }, () => { }
                );
            }
        }
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

    //All API calling methods
    /**
     * Method to get list of inquries from server.
     */
    private getNoteList(parentId: string, parentType: number) {

        this.showLoader = true;
        this.getnotessub = this.sharedComponentService.getNotesList(parentId, parentType).subscribe(
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

    /**
     * method to call delete note api.
     * @param param0 contains  rowIndex and data item.
     */
    public deleteNotes({ sender, rowIndex, dataItem }) {

        this.deletenotessub = this.sharedComponentService.deleteNote(this.noteItemsData[rowIndex].NoteId).subscribe(
            resp => {

               // console.log("record deleted:")
                this.noteItemsData.splice(rowIndex, 1);
            },
            error => {
                this.showLoader = false;
                alert("Something went wrong");
                console.log("Error: ", error)
                this.getNoteList(this.noteModel.ParentId, CustomerEntityType.PurchaseInquiry);
            },
            () => {

            });

    }

    public updateNote(e) {

        this.selectedNote;
        //selected note object : this.selectedNote
        this.selectedNote.NoteType = this.selectedNoteItem.value;
        this.updatenotessub = this.sharedComponentService.updateNote(this.selectedNote).subscribe(
            resp => {
                //this method is updating the status if notes updated then update inquiry status.
                this.callPurchaseInquiryStatusUpdateAPI();
               // console.log("record updated:")
                this.getNoteList(this.noteModel.ParentId, CustomerEntityType.PurchaseInquiry);
            },
            error => {
                this.showLoader = false;
                alert("Something went wrong");
                this.getNoteList(this.noteModel.ParentId, CustomerEntityType.PurchaseInquiry);
            },
            () => {
                this.closeUpdateNote(e);
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


}

