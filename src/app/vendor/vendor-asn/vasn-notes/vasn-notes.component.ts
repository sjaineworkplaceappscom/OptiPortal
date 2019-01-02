import { Component, OnInit, HostListener } from '@angular/core';
import { UIHelper } from '../../../helpers/ui.helpers';
import { SalesNoteModel } from '../../../tempmodels/SalesNoteModel';
import { Configuration } from '../../../helpers/Configuration';
import { salesOrderNotes } from '../../../DemoData/sales-order';
import { VendorASNModel } from 'src/app/tempmodels/vendor/vendor-asn-model';
import { NotesModel } from 'src/app/models/purchaserequest/notes';
import { ISubscription } from 'rxjs/Subscription';
import { VendorEntityType } from 'src/app/enums/enums';
import { DateTimeHelper } from 'src/app/helpers/datetime.helper';
import { DatePipe } from '@angular/common';
import { Commonservice } from 'src/app/services/commonservice.service';
import { ToastService } from 'src/app/helpers/services/toast.service';
import { SharedComponentService } from 'src/app/services/shared-component.service';
import { GlobalResource } from 'src/app/helpers/global-resource';
import { AppMessages } from 'src/app/helpers/app-messages';

@Component({
  selector: 'app-vasn-notes',
  templateUrl: './vasn-notes.component.html',
  styleUrls: ['./vasn-notes.component.scss']
})
export class VasnNotesComponent implements OnInit {

  constructor(private sharedComponentService: SharedComponentService, private commonService: Commonservice, public datepipe: DatePipe, private toast: ToastService) { }

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
  lastnoteText:string;
  public noteItemsData: any[];

  
  public noteTypes: Array<{ text: string, value: number }> = [
    { text: "General ", value: 1 },
    { text: "Rejected", value: 2 },
    { text: "Partial accepted", value: 3 }
  ];

  noteModel: NotesModel;
  notessub: ISubscription;
  getnotessub: ISubscription;
  addnotessub: ISubscription;
  updatenotessub: ISubscription;
  deletenotessub: ISubscription;
  updatePIStatussub: ISubscription;

  vendorASNModel:VendorASNModel;
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

     //get status of selected inquiry for disabling or enabling  forms
     let vendorDetail: string = localStorage.getItem("SelectedVASN");
     this.vendorASNModel=JSON.parse(vendorDetail);
     if (this.vendorASNModel != null && this.vendorASNModel != undefined) {
     }
    
     this.noteModel = new NotesModel();
     this.noteModel.ParentId=this.noteModel.GrantParentId=this.vendorASNModel.ASNId;
     this.noteModel.ParentType=this.noteModel.GrandParentType=VendorEntityType.VendorASN;
 
     this.getNoteList(this.noteModel.ParentId, this.noteModel.ParentType);
    
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
    this.lastnoteText = this.selectedNote.NoteText;
    this.selectedNoteItem = { text: this.selectedNote.NoteText, value: this.selectedNote.NoteType };
  }

  public closeAddNote() {
    //close add note component
    this.TabNotesGridStatus = true;
    this.TabAddNotesFormStatus = false;
  }

  closeUpdateNote(e) {
    this.selectedNote.Notes = this.lastnoteText;
      // this.notesgrid.nativeElement.style.display = 'block';
      this.TabNotesGridStatus = true;
      // this.editnoteform.nativeElement.style.display = 'none';
      this.TabEditNotesFormStatus = false;
      //reset model after close edit form.
      this.resetModelValues();
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

    GlobalResource.dirty = false;
    // Add Notes Data in model. when comes from inquiry        
    this.noteModel.NoteType = this.selectedNoteItem.value;
    this.noteModel.ParentId=this.vendorASNModel.ASNId;
    this.noteModel.GrantParentId=this.vendorASNModel.ASNId;
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


 


}
