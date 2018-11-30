import { Component, OnInit, HostListener } from '@angular/core';
import { UIHelper } from '../../../helpers/ui.helpers';
import { Configuration } from '../../../helpers/Configuration';
import { vpiNotes } from '../../../DemoData/vendor-data';
import { SalesNoteModel } from '../../../tempmodels/SalesNoteModel';
import { ISubscription } from 'rxjs/Subscription';
import { SharedComponentService } from 'src/app/services/shared-component.service';
import { VendorService } from 'src/app/services/vendor/vendor.service';
import { ToastService } from 'src/app/helpers/services/toast.service';
import { VendorPOModel } from 'src/app/tempmodels/vendor/vendor-po-model';
import { VendorEntityType } from 'src/app/enums/enums';
import { VendorNoteModel } from 'src/app/tempmodels/vendor/vendor-note-model';
import { AppMessages } from 'src/app/helpers/app-messages';
import { DateTimeHelper } from 'src/app/helpers/datetime.helper';

@Component({
  selector: 'app-vendor-po-notes',
  templateUrl: './vendor-po-notes.component.html',
  styleUrls: ['./vendor-po-notes.component.scss']
})
export class VendorPoNotesComponent implements OnInit {

  constructor(private vendorService: VendorService, private sharedComponentService: SharedComponentService, private toast: ToastService) { }

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

  lastnoteText:string;
  VPOModel: VendorPOModel = new VendorPOModel();
  public getVPIsubs: ISubscription;
  getnotessub: ISubscription;
  addnotessub: ISubscription;
  updatenotessub: ISubscription;
  noteModel: VendorNoteModel = new VendorNoteModel();

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

    let VPI: string = localStorage.getItem("SelectedVPO");
    let vpiData: any = JSON.parse(VPI);
    this.VPOModel = vpiData;
    if (this.VPOModel != null && this.VPOModel != undefined) {
      this.getVPONoteList(this.VPOModel.POId + "", VendorEntityType.VendorPO);
    }
  }

  /** 
   * call api for purchase inquiry detail.
   */
  getVPONoteList(parentId: string, parentType: number) {
    this.showLoader = true;
    this.getnotessub = this.sharedComponentService.getVendorPONotesList(parentId, parentType).subscribe(
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

  submitNote(e) {
    
    let VPIOptiId: number = this.VPOModel.POId;
    let VPINumber: number = this.VPOModel.PONumber;
    this.noteModel.NoteType = this.selectedNoteItem.value;
    this.noteModel.ParentId = undefined;
    this.noteModel.ParentType = VendorEntityType.VendorPO;
    this.noteModel.VEntityNumber = VPINumber;
    this.noteModel.VEntityOptiId = VPIOptiId+"";

    this.addnotessub = this.sharedComponentService.AddVendorPONote(this.noteModel).subscribe(
      resp => {
        this.toast.showSuccess(AppMessages.NoteAddedSuccessMsg);
        //this method is updating the status if notes updated then update inquiry status.
        //this.callPurchaseInquiryStatusUpdateAPI();
      },
      error => {
        //alert("Something went wrong");
        console.log("Error: ", error)
      },
      () => {
        this.resetModelValues();
        this.closeAddNote();
        // Get notes data.
        let VPI: string = localStorage.getItem("SelectedVPO");
        let vpiData: any = JSON.parse(VPI);
        this.VPOModel = vpiData;
        if (this.VPOModel != null && this.VPOModel != undefined) {
          this.getVPONoteList(this.VPOModel.POId + "", VendorEntityType.VendorPO);
        }
      });
    this.closeAddNote();
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
    this.lastnoteText = this.selectedNote.Notes;
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

  /**
   * close note add form
   * @param e
   */
  public closeAddNoteWindow(e) {
    this.TabNotesGridStatus = true;
    this.TabAddNotesFormStatus = false;
    this.resetModelValues();
  }

  // Format dates.
  private formatNotesDate() {
    this.noteItemsData.forEach(element => {
      element.CreatedDate = DateTimeHelper.ParseDate(element.CreatedDate); //new Date(this.datepipe.transform(element.CreatedDate, Configuration.dateFormat))
      element.ModifiedDate = DateTimeHelper.ParseDate(element.ModifiedDate);//new Date(this.datepipe.transform(element.ModifiedDate, Configuration.dateFormat))
    });
  }

  updateNote(e) {
    //GlobalResource.dirty=false;
    this.selectedNote;
    //selected note object : this.selectedNote
    this.selectedNote.NoteType = this.selectedNoteItem.value;
    this.updatenotessub = this.sharedComponentService.updateNote(this.selectedNote).subscribe(
      resp => {
        //this method is updating the status if notes updated then update inquiry status.

        let VPI: string = localStorage.getItem("SelectedVPO");
        let vpiData: any = JSON.parse(VPI);
        this.VPOModel = vpiData;
        if (this.VPOModel != null && this.VPOModel != undefined) {
          this.getVPONoteList(this.VPOModel.POId + "", VendorEntityType.VendorPO);
        }
        this.toast.showSuccess(AppMessages.NoteUpdateSuccessMsg);
      }, 
      error => {
        this.showLoader = false;
        //alert("Something went wrong");
        let VPI: string = localStorage.getItem("SelectedVPO");
        let vpiData: any = JSON.parse(VPI);
        this.VPOModel = vpiData;
        if (this.VPOModel != null && this.VPOModel != undefined) {
          this.getVPONoteList(this.VPOModel.POId + "", VendorEntityType.VendorPO);
        }
      },
      () => {
        this.closeUpdateNote(e);
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

}
