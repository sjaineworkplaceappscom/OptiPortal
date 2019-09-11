import { Component, OnInit, HostListener, Input, ViewChild } from '@angular/core';
import { UIHelper } from '../../../helpers/ui.helpers';

import { Configuration } from '../../../helpers/Configuration';
import { GlobalResource } from '../../../helpers/global-resource';
import { VendorEntityType, VendorOpenInvoiceStatus } from '../../../enums/enums';
import { AppMessages } from '../../../helpers/app-messages';
import { DateTimeHelper } from '../../../helpers/datetime.helper';
import { SharedComponentService } from '../../../services/shared-component.service';
import { Commonservice } from '../../../services/commonservice.service';
import { ToastService } from '../../../helpers/services/toast.service';
import { NotesModel } from '../../../models/purchaserequest/notes';
import { ISubscription } from '../../../../../node_modules/rxjs/Subscription';
import { VendorOIModel } from '../../../tempmodels/vendor/vendor-OI-model';
import { DatePipe } from '@angular/common';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
@Component({
  selector: 'app-vendor-p-invoice-notes',
  templateUrl: './vendor-p-invoice-notes.component.html',
  styleUrls: ['./vendor-p-invoice-notes.component.scss']
})
export class VendorPInvoiceNotesComponent implements OnInit {

  @Input() NotesMasterData: NotesModel;

  /**
   * global variable
  */
  imgPath = Configuration.imagePath;
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
  public vendorModel: VendorOIModel;
  isCancelStatus: boolean = false;
  public noteTypes: Array<{ text: string, value: number }> = [
    { text: "General ", value: 1 },
    { text: "Rejected", value: 2 },
    { text: "Partial accepted", value: 3 }
  ];

  public selectedNoteItem: { text: string, value: number } = this.noteTypes[0];
  lastnoteText:string;
  constructor(private sharedComponentService: SharedComponentService, private commonService: Commonservice, public datepipe: DatePipe, private toast: ToastService
    ,private translate: TranslateService) {
    translate.use(localStorage.getItem('appLanguage'));
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
    });
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
    //get status of selected inquiry for disabling or enabling  forms
    let vendorDetail: string = localStorage.getItem("SelectedVOI");
    this.vendorModel = JSON.parse(vendorDetail);
    if (this.vendorModel != null && this.vendorModel != undefined) {

      let inquiryStatus = this.vendorModel.Status;
      if (inquiryStatus == VendorOpenInvoiceStatus.Closed) {
        this.isCancelStatus = true;
      }
    }
    this.noteModel = new NotesModel();
    this.noteModel.ParentId=this.noteModel.GrantParentId=this.vendorModel.InvoiceId;
    this.noteModel.ParentType=this.noteModel.GrandParentType=VendorEntityType.VendorOI;
    this.getNoteList(this.noteModel.ParentId, this.noteModel.ParentType);

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
    this.lastnoteText = this.selectedNote.Notes;
    this.selectedNoteItem = { text: this.selectedNote.NoteText, value: this.selectedNote.NoteType };
  }

  valueChange(value: any) {
    GlobalResource.dirty = true;
  }
  changeDiv(e) {
    GlobalResource.dirty = true;
  }

  /**
  * add note.
  * @param e
  * @param action
  */
  submitNote(e) {
    GlobalResource.dirty = false;
    // Add Notes Data in model. when comes from inquiry        

    this.noteModel.NoteType = this.selectedNoteItem.value;
    this.noteModel.ParentId=this.vendorModel.InvoiceId;
    this.noteModel.GrantParentId=this.vendorModel.InvoiceId;

    this.addnotessub = this.sharedComponentService.AddNote(this.noteModel).subscribe(
      resp => {
        //this method is updating the status if notes updated then update inquiry status.
        //this.callPurchaseInquiryStatusUpdateAPI();
        this.toast.showSuccess(AppMessages.NoteAddedSuccessMsg);
        // console.log("record added:")
      },
      error => {
        //alert("Something went wrong");
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
    GlobalResource.dirty = false;

    this.TabNotesGridStatus = true;
    this.TabAddNotesFormStatus = false;
    this.resetModelValues();
  }

  /**
   * method will close add note form and reset model.
   */
  public resetModelValues() {
    //reset note model and type.
    //this.noteModel=new NotesModel();
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
        //alert("Something went wrong");
        console.log("Error: ", error)
        this.getNoteList(this.noteModel.ParentId, VendorEntityType.VendorOI);
      },
      () => {

      });

  }

  public updateNote(e) {
    GlobalResource.dirty = false;
    this.selectedNote;
    //selected note object : this.selectedNote
    this.selectedNote.NoteType = this.selectedNoteItem.value;
    this.updatenotessub = this.sharedComponentService.updateNote(this.selectedNote).subscribe(
      resp => {


        this.toast.showSuccess(AppMessages.NoteUpdateSuccessMsg);
        // console.log("record updated:")
        this.getNoteList(this.noteModel.ParentId, VendorEntityType.VendorOI);
      },
      error => {
        this.showLoader = false;
        //alert("Something went wrong");
        this.getNoteList(this.noteModel.ParentId, VendorEntityType.VendorOI);
      },
      () => {
        this.closeUpdateNote(e);
      });

  }

  closeUpdateNote(e) {
    this.selectedNote.Notes = this.lastnoteText;
    GlobalResource.dirty = false;
    // this.notesgrid.nativeElement.style.display = 'block';
    this.TabNotesGridStatus = true;
    // this.editnoteform.nativeElement.style.display = 'none';
    this.TabEditNotesFormStatus = false;
    //reset model after close edit form.
    this.resetModelValues();
  }

}
