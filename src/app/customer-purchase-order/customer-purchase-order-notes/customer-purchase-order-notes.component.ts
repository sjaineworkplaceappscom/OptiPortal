import { Component, OnInit, HostListener } from '@angular/core';
import { Configuration } from '../../helpers/Configuration';
import { UIHelper } from '../../helpers/ui.helpers';
import { openInvoicesNotes } from '../../demodata/open-invoices';
import { NotesModel } from '../../models/purchaserequest/notes';
import { CustomerEntityType } from '../../enums/enums';
import { SalesNoteModel } from '../../tempmodels/SalesNoteModel';
import { ISubscription } from '../../../../node_modules/rxjs/Subscription';
import { SharedComponentService } from '../../services/shared-component.service';
import { Commonservice } from '../../services/commonservice.service';
import { DatePipe } from '../../../../node_modules/@angular/common';
import { GlobalResource } from '../../helpers/global-resource';
import { DateTimeHelper } from '../../helpers/datetime.helper';

@Component({
  selector: 'app-customer-purchase-order-notes',
  templateUrl: './customer-purchase-order-notes.component.html',
  styleUrls: ['./customer-purchase-order-notes.component.scss']
})
export class CustomerPurchaseOrderNotesComponent implements OnInit {

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

  noteModel: NotesModel = new NotesModel();
  public noteTypes: Array<{ text: string, value: number }> = [
    { text: "General ", value: 1 },
    { text: "Rejected", value: 2 },
    { text: "Partial accepted", value: 3 }
  ];

  public selectedNoteItem: { text: string, value: number } = this.noteTypes[0];

   /**
     * ITEMS NOTES VARIABLE
    */
   selectedItemNote: any = {};
   itemNotesGrid: boolean = true;
   itemAddNotes: boolean = false;
   itemEditNotes: boolean = false;
   notessub: ISubscription;
   getnotessub: ISubscription;
   addnotessub: ISubscription;
   updatenotessub: ISubscription;
   deletenotessub: ISubscription;
   updatePIStatussub: ISubscription;
   searchNotes: string = "";

   isCancelStatus: boolean = false;

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
  public getCustomerPurchaseOrderNotesList() {
  this.showLoader = true;
  this.noteItemsData = openInvoicesNotes;
  setTimeout(()=>{    
    this.showLoader = false;
  }, 1000);
  }

  constructor(private sharedComponentService: SharedComponentService, private commonService: Commonservice, public datepipe: DatePipe) {}

  ngOnInit() {
    //Apply Grid Height
    this.gridHeight = UIHelper.getMainContentHeight();
    // Check Mobile device
    this.isMobile = UIHelper.isMobile();

    //get status of selected order for disabling or enabling  forms
    let orderDetail: string = localStorage.getItem("SelectedPurchaseInquery");
    let orderData: any = JSON.parse(orderDetail);

    this.noteModel = new NotesModel();
    // Subscriber for Load data.
    this.notessub = this.commonService.currentNotesData.subscribe(
        (data: NotesModel) => {
            this.noteModel = data;

            // Note parent Id
            if (this.noteModel.ParentType == CustomerEntityType.CustomerPurchaseOrder) {
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

 /**
    * add note.
    * @param e
    * @param action
    */
   submitNote(e) {
    GlobalResource.dirty=false;
    // Add Notes Data in model. when comes from inquiry        
    this.noteModel.NoteType = this.selectedNoteItem.value;
    this.addnotessub = this.sharedComponentService.AddNote(this.noteModel).subscribe(
        resp => {
           // console.log("record added:")
           this.getNoteList(this.noteModel.ParentId, this.noteModel.ParentType);
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
   * close note add form
   * @param e
   */
  public closeAddNoteWindow(e) {
    this.TabNotesGridStatus = true;
    this.TabAddNotesFormStatus = false;
    this.resetModelValues();
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
              this.getNoteList(this.noteModel.ParentId, CustomerEntityType.CustomerPurchaseOrder);
          },
          () => {

          });

  }

  public updateNote(e) {
      GlobalResource.dirty=false;
      this.selectedNote;
      //selected note object : this.selectedNote
      this.selectedNote.NoteType = this.selectedNoteItem.value;
      this.updatenotessub = this.sharedComponentService.updateNote(this.selectedNote).subscribe(
          resp => {
              this.getNoteList(this.noteModel.ParentId, CustomerEntityType.CustomerPurchaseOrder);
          },
          error => {
              this.showLoader = false;
              alert("Something went wrong");
              this.getNoteList(this.noteModel.ParentId, CustomerEntityType.CustomerPurchaseOrder);
          },
          () => {
              this.closeUpdateNote(e);
          });

  }

}
