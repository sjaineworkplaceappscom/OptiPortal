import { Component, OnInit, HostListener } from '@angular/core';
import { UIHelper } from '../../helpers/ui.helpers';
import { NotesModel } from '../../models/purchaserequest/notes';
import { SharedComponentService } from '../../services/shared-component.service';
import { DateTimeHelper } from '../../helpers/datetime.helper';
import { ISubscription } from 'rxjs/Subscription';
import { SalesQuotation } from '../../tempmodels/sales-quotation';
import { CustomerEntityType } from '../../enums/enums';
import { SalesNoteModel } from '../../tempmodels/SalesNoteModel';
import { debug } from 'util';

import { GlobalResource } from '../../helpers/global-resource';
import { Configuration } from '../../helpers/Configuration';
import { AppMessages } from '../../helpers/app-messages';
import { ToastService } from '../../helpers/services/toast.service';

@Component({
  selector: 'app-sales-quotations-notes',
  templateUrl: './sales-quotations-notes.component.html',
  styleUrls: ['./sales-quotations-notes.component.scss']
})
export class SalesQuotationsNotesComponent implements OnInit {

  /**
     * global variable
    */
  imgPath = Configuration.imagePath;
  isMobile: boolean;
  gridHeight: number;

  /**
   * NOTES TAB VARIABLE
  */
  TabAddNotesFormStatus: boolean = false;
  TabEditNotesFormStatus: boolean = false;
  TabNotesGridStatus: boolean = true;
  showLoader: boolean = false;

  noteItemsData: any[];
  selectedItemNote: any = {};
  getnotessub: ISubscription;
  addnotessub: ISubscription;
  updatenotessub: ISubscription;
  lastnoteText:string;
  salesQuotationModel: SalesQuotation = new SalesQuotation();
  noteModel: SalesNoteModel;

  constructor(private sharedComponentService: SharedComponentService,private toast:ToastService) { }

  public noteTypes: Array<{ text: string, value: number }> = [
    { text: "General ", value: 1 },
    { text: "Rejected", value: 2 },
    { text: "Partial accepted", value: 3 }
  ];  

  public selectedNoteItem: { text: string, value: number } = this.noteTypes[0];
  selectedNote: any = {};

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // Apply Grid Height
    this.gridHeight = UIHelper.getMainContentHeight();
    // Check Mobile device
    this.isMobile = UIHelper.isMobile();
  }

  ngOnInit() {
    //Apply Grid Height
    this.gridHeight = UIHelper.getMainContentHeight();
    // Check Mobile device
    this.isMobile = UIHelper.isMobile();
    this.noteModel = new SalesNoteModel();
    
    this.salesQuotationModel = JSON.parse(localStorage.getItem('SelectedSalesQuotation'))
    let quotationId: number = this.salesQuotationModel.QuotationId;
    let quotationNumber: number = this.salesQuotationModel.QuotationNumber;
    this.getSalesNotesList(quotationId.toString(), CustomerEntityType.SalesQuotation);
  }

  openNewNote() {
    this.TabNotesGridStatus = this.TabEditNotesFormStatus = false;
    this.TabAddNotesFormStatus = true;
    this.resetModelValues();
  }

  openEditNoteView(e, note) {
    
    this.TabNotesGridStatus = this.TabAddNotesFormStatus = false;
    this.TabEditNotesFormStatus = true;
    this.selectedNote = note;
    this.lastnoteText = this.selectedNote.Notes;
    this.selectedNoteItem = this.noteTypes[0];
  }


  submitNote() {
    GlobalResource.dirty=false;
    // Add Notes Data in model. when comes from inquiry  
    this.salesQuotationModel = JSON.parse(localStorage.getItem('SelectedSalesQuotation'))
    let quotationId: number = this.salesQuotationModel.QuotationId;
    let quotationNumber: number = this.salesQuotationModel.QuotationNumber;
    this.noteModel.NoteType = this.selectedNoteItem.value;
    this.noteModel.ParentId = undefined;
    this.noteModel.ParentType = CustomerEntityType.SalesQuotation;
    this.noteModel.SalesOptiId = quotationId.toString();
    this.noteModel.SaleNumber = quotationNumber;

    this.addnotessub = this.sharedComponentService.AddSalesQuotationNote(this.noteModel).subscribe(
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
        this.salesQuotationModel = JSON.parse(localStorage.getItem('SelectedSalesQuotation'))
        let quotationId: number = this.salesQuotationModel.QuotationId;
        let quotationNumber: number = this.salesQuotationModel.QuotationNumber;
        this.getSalesNotesList(quotationId.toString(), CustomerEntityType.SalesQuotation);
      });
  }

  closeAddNoteWindow() {
    GlobalResource.dirty=false;

    this.TabNotesGridStatus = true;
    this.TabAddNotesFormStatus = false;
  }
  changeDiv(e){
    GlobalResource.dirty=true;
      console.log('notes div changes');
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


  updateNote(e) {
    GlobalResource.dirty=false;
    this.selectedNote;
    //selected note object : this.selectedNote
    this.selectedNote.NoteType = this.selectedNoteItem.value;
    this.updatenotessub = this.sharedComponentService.updateNote(this.selectedNote).subscribe(
      resp => {
        //this method is updating the status if notes updated then update inquiry status.
        this.salesQuotationModel = JSON.parse(localStorage.getItem('SelectedSalesQuotation'))
        let quotationId: number = this.salesQuotationModel.QuotationId;
        let quotationNumber: number = this.salesQuotationModel.QuotationNumber;
        this.getSalesNotesList(quotationId.toString(), CustomerEntityType.SalesQuotation);
        this.toast.showSuccess(AppMessages.NoteUpdateSuccessMsg); 

      },
      error => {
        this.showLoader = false;
        //alert("Something went wrong");
        this.salesQuotationModel = JSON.parse(localStorage.getItem('SelectedSalesQuotation'));
        let quotationId: number = this.salesQuotationModel.QuotationId;
        this.getSalesNotesList(quotationId.toString(), CustomerEntityType.SalesOrder);
      },
      () => {
        this.closeUpdateNote(e);
      });

  }

  closeUpdateNote(e) {
    this.selectedNote.Notes=this.lastnoteText;
    GlobalResource.dirty=false;
    this.TabNotesGridStatus = true;
    this.TabEditNotesFormStatus = false;
    this.resetModelValues();
  }

  /**
   * Method to get list of inquries from server.
   */
  private getSalesNotesList(salesId: string, parentType: number) {
    this.showLoader = true;
    this.getnotessub = this.sharedComponentService.getSalesQuotationNotesList(salesId, parentType).subscribe(
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


  ngOnDestroy() {
    if (this.addnotessub != undefined)
      this.addnotessub.unsubscribe();
    if (this.getnotessub != undefined)
      this.getnotessub.unsubscribe();
    if (this.updatenotessub != undefined)
      this.updatenotessub.unsubscribe();
  }

  /**
   * close add note view.
   */
  public closeAddNote() {
    //close add note component
    this.TabNotesGridStatus = true;
    this.TabAddNotesFormStatus = false;
  }
}

