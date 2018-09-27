import { Component, OnInit, HostListener } from '@angular/core';
import { Configuration } from '../../../assets/configuration';
import { UIHelper } from '../../helpers/ui.helpers';
import { deliveryNotesTabNotes } from '../../demodata/delivery-notes';
import { NotesModel } from '../../models/purchaserequest/notes';
import { CustomerEntityType } from '../../enums/enums';
import { SalesNoteModel } from '../../tempmodels/SalesNoteModel';
import { ISubscription } from '../../../../node_modules/rxjs/Subscription';
import { SharedComponentService } from '../../services/shared-component.service';
import { DateTimeHelper } from '../../helpers/datetime.helper';

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

  noteModel:SalesNoteModel = new SalesNoteModel();
  addnotessub: ISubscription;
  getDeliveryNotesNoteSubs: ISubscription;
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
  setTimeout(()=>{    
    this.showLoader = false;
  }, 1000);
}

  constructor(private sharedComponentService: SharedComponentService) { }

  ngOnInit() {
    //Apply Grid Height
    this.gridHeight = UIHelper.getMainContentHeight();
    // Check Mobile device
    this.isMobile = UIHelper.isMobile();

    //this.getDeliveryAllNotesList();
    this.getDeliveryNotesNoteList(3+"",3);
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
    debugger;
    let salesOptiId: number = 4;
    let salesNumber: number = 4;
    this.noteModel.NoteType = this.selectedNoteItem.value;
    this.noteModel.ParentId = undefined;
    this.noteModel.ParentType = CustomerEntityType.DeliveryNotes;
    this.noteModel.SalesOptiId = salesOptiId.toString();
    this.noteModel.SaleNumber = salesNumber;

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
        //this.salesQuotationModel = JSON.parse(localStorage.getItem('SelectedSalesQuotation'))
        let salesOptiId: number = 3;
        let salesNumber: number = 3;
        this.getDeliveryNotesNoteList(salesOptiId.toString(),CustomerEntityType.DeliveryNotes);
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
    private getDeliveryNotesNoteList(salesId: string, parentType: number) {
      let deliveryNoteOptiId: number = 4;
      let salesNumber: number = 4;
      //deliverynotes/notelist/{deliveryNotesOptiId}/{parentType:int
      this.showLoader = true;
      this.getDeliveryNotesNoteSubs = this.sharedComponentService.getDeliveryNoteNotesList(deliveryNoteOptiId.toString(), CustomerEntityType.DeliveryNotes.toString()).subscribe(
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
  
   


}
