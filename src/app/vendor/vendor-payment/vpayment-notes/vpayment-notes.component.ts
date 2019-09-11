import { Component, OnInit, HostListener } from '@angular/core';
import { UIHelper } from '../../../helpers/ui.helpers';
import { Configuration } from '../../../helpers/Configuration';
import {paymentNotes} from '../../../DemoData/vendor-data'
import { VendorNoteModel } from '../../../tempmodels/vendor/vendor-note-model';
import { ISubscription } from '../../../../../node_modules/rxjs/Subscription';
import { PaymentModel } from '../../../tempmodels/vendor/payment-model';
import { VendorEntityType } from '../../../enums/enums';
import { SharedComponentService } from '../../../services/shared-component.service';
import { VendorService } from '../../../services/vendor/vendor.service';
import { ToastService } from '../../../helpers/services/toast.service';
import { AppMessages } from '../../../helpers/app-messages';
import { DateTimeHelper } from '../../../helpers/datetime.helper';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-vpayment-notes',
  templateUrl: './vpayment-notes.component.html',
  styleUrls: ['./vpayment-notes.component.scss']
})
export class VpaymentNotesComponent implements OnInit {

  constructor(private vendorService: VendorService, private sharedComponentService: SharedComponentService, private toast: ToastService,private translate: TranslateService) { 
    translate.use(localStorage.getItem('appLanguage'));
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
    });
  }

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

  paymentModel: PaymentModel = new PaymentModel();
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

  /**
   * Method to get list of inquries from server.
  */
 
  public getPaymentsAllNotesList() {
    this.showLoader = true;
    this.noteItemsData = paymentNotes;
    setTimeout(()=>{    
      this.showLoader = false;
    }, 1000);
  }



  ngOnInit() {
    //Apply Grid Height
    this.gridHeight = UIHelper.getMainContentHeight();
    // Check Mobile device
    this.isMobile = UIHelper.isMobile();

    let VPayment: string = localStorage.getItem("SelectedPayment");
    let vpayment: any = JSON.parse(VPayment);
    this.paymentModel = vpayment;
    if (this.paymentModel != null && this.paymentModel != undefined) {
      this.getPaymentNoteList(this.paymentModel.PaymentId + "", VendorEntityType.Payment);
    }
    
  }

  /** 
   * call api for payment notes.
   */
  getPaymentNoteList(parentId: string, parentType: number) {
    this.showLoader = true;
    this.getnotessub = this.sharedComponentService.getPaymentNotesList(parentId, parentType).subscribe(
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
    
    let VPaymentOptiId: string = this.paymentModel.PaymentId;
    let VPaymentNumber: number = this.paymentModel.PaymentNumber;
    this.noteModel.NoteType = this.selectedNoteItem.value;
    this.noteModel.ParentId = undefined;
    this.noteModel.ParentType = VendorEntityType.Payment;
    this.noteModel.VEntityNumber = VPaymentNumber;
    this.noteModel.VEntityOptiId = VPaymentOptiId+"";

    this.addnotessub = this.sharedComponentService.AddPaymentNote(this.noteModel).subscribe(
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
        let VPayment: string = localStorage.getItem("SelectedPayment");
        let vpaymentData: any = JSON.parse(VPayment);
        this.paymentModel = vpaymentData;
        if (this.paymentModel != null && this.paymentModel != undefined) {
          this.getPaymentNoteList(this.paymentModel.PaymentId + "", VendorEntityType.Payment);
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

  public updateNote(e){
 //GlobalResource.dirty=false;
 this.selectedNote;
 //selected note object : this.selectedNote
 this.selectedNote.NoteType = this.selectedNoteItem.value;
 this.updatenotessub = this.sharedComponentService.updateNote(this.selectedNote).subscribe(
   resp => {
     //this method is updating the status if notes updated then update inquiry status.

     let VPayment: string = localStorage.getItem("SelectedPayment");
     let vpaymentData: any = JSON.parse(VPayment);
     this.paymentModel = vpaymentData;
     if (this.paymentModel != null && this.paymentModel != undefined) {
       this.getPaymentNoteList(this.paymentModel.PaymentId + "", VendorEntityType.Payment);
     }
     this.toast.showSuccess(AppMessages.NoteUpdateSuccessMsg);
   }, 
   error => {
     this.showLoader = false;
     //alert("Something went wrong");
     let VPayment: string = localStorage.getItem("SelectedPayment");
     let vpaymentData: any = JSON.parse(VPayment);
     this.paymentModel = vpaymentData;
     if (this.paymentModel != null && this.paymentModel != undefined) {
       this.getPaymentNoteList(this.paymentModel.PaymentId + "", VendorEntityType.Payment);
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
