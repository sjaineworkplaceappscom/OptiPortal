import { Component, OnInit, HostListener } from '@angular/core';
import { UIHelper } from '../../../helpers/ui.helpers';
import { Configuration } from '../../../helpers/Configuration';
import { vpiNotes } from '../../../DemoData/vendor-data';
import { SalesNoteModel } from '../../../tempmodels/SalesNoteModel';
import { VendorService } from 'src/app/services/vendor/vendor.service';
import { VendorPurchaseInquiryModel } from 'src/app/tempmodels/vendor/vendor-purchase-inquiry-model';
import { ISubscription } from 'rxjs/Subscription';
import { SharedComponentService } from 'src/app/services/shared-component.service';
import { ToastService } from 'src/app/helpers/services/toast.service';
import { VendorNoteModel } from 'src/app/tempmodels/vendor/vendor-note-model';
import { VendorEntityType } from 'src/app/enums/enums';
import { AppMessages } from 'src/app/helpers/app-messages';
import { DateTimeHelper } from 'src/app/helpers/datetime.helper';
import { GlobalResource } from 'src/app/helpers/global-resource';

@Component({
  selector: 'app-vendor-pi-notes',
  templateUrl: './vendor-pi-notes.component.html',
  styleUrls: ['./vendor-pi-notes.component.scss']
})
export class VendorPiNotesComponent implements OnInit {

  
  public gridData: any[];

  VPIModel: VendorPurchaseInquiryModel = new VendorPurchaseInquiryModel();
  public getVPIsubs: ISubscription;
  getnotessub: ISubscription;
  addnotessub: ISubscription;
  updatenotessub: ISubscription;
  constructor(private vendorService:VendorService,private sharedComponentService: SharedComponentService,private toast:ToastService) { }

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
  noteModel: VendorNoteModel = new VendorNoteModel();
  
  public noteTypes: Array<{ text: string, value: number }> = [
    { text: "General ", value: 1 },
    { text: "Rejected", value: 2 },
    { text: "Partial accepted", value: 3 }
  ];

  public selectedNoteItem: { text: string, value: number } = this.noteTypes[0];

  ngOnInit() {
    //Apply Grid Height
    this.gridHeight = UIHelper.getMainContentHeight();
    // Check Mobile device
    this.isMobile = UIHelper.isMobile();

    //this.getvpiNotesList();
    let VPI: string = localStorage.getItem("SelectedVPI");
    let vpiData: any = JSON.parse(VPI);
    this.VPIModel = vpiData;
    if(this.VPIModel!=null && this.VPIModel != undefined){
      this.getVPINoteList(this.VPIModel.InquiryId+"",VendorEntityType.VendorPI);
    }
  }

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
  public getvpiNotesList() {
    this.showLoader = true;
    this.noteItemsData = vpiNotes;
    setTimeout(()=>{    
      this.showLoader = false;
    }, 1000);
  }

  

   /** 
    * call api for purchase inquiry detail.
    */
   getVPINoteList(parentId: string, parentType: number) {
     
    this.showLoader = true;
    this.getnotessub = this.sharedComponentService.getVendorNotesList(parentId, parentType).subscribe(
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

  changeDiv(e){
    GlobalResource.dirty=true;
      console.log('notes div changes');
  }
  
  submitNote(e) {
    
    let VPIOptiId: number = this.VPIModel.InquiryId;
    let VPINumber: number = this.VPIModel.InquiryNumber;
    this.noteModel.NoteType = this.selectedNoteItem.value;
    this.noteModel.ParentId = undefined;
    this.noteModel.ParentType = VendorEntityType.VendorPI;
    this.noteModel.VPINumber = VPINumber;
    this.noteModel.VPIOptiId = VPIOptiId.toString();

    this.addnotessub = this.sharedComponentService.AddVendorNote(this.noteModel).subscribe(
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
        let VPI: string = localStorage.getItem("SelectedVPI");
        let vpiData: any = JSON.parse(VPI);
        this.VPIModel = vpiData;
        if(this.VPIModel!=null && this.VPIModel != undefined){
          this.getVPINoteList(this.VPIModel.InquiryId+"",VendorEntityType.VendorPI);
        }
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
    
        let VPI: string = localStorage.getItem("SelectedVPI");
        let vpiData: any = JSON.parse(VPI);
        this.VPIModel = vpiData;
        if(this.VPIModel!=null && this.VPIModel != undefined){
          this.getVPINoteList(this.VPIModel.InquiryId+"",VendorEntityType.VendorPI);
        }
        this.toast.showSuccess(AppMessages.NoteUpdateSuccessMsg); 

      },
      error => {
        this.showLoader = false;
        //alert("Something went wrong");
        let VPI: string = localStorage.getItem("SelectedVPI");
        let vpiData: any = JSON.parse(VPI);
        this.VPIModel = vpiData;
        if(this.VPIModel!=null && this.VPIModel != undefined){
          this.getVPINoteList(this.VPIModel.InquiryId+"",VendorEntityType.VendorPI);
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
