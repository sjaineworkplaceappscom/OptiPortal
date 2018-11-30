import { Component, OnInit, Input } from '@angular/core';
import { ISubscription } from '../../../../../node_modules/rxjs/Subscription';
import { Contact } from '../../../tempmodels/contact';
import { CurrentSidebarInfo } from '../../../models/sidebar/current-sidebar-info';
import { Commonservice } from '../../../services/commonservice.service';
import { ContactService } from '../../../services/contact.service';
import { ConfirmDialog } from '../../../helpers/services/dialog.service';
import { ToastService } from '../../../helpers/services/toast.service';
import { AppMessages } from '../../../helpers/app-messages';
import { GlobalResource } from '../../../helpers/global-resource';

@Component({
  selector: 'app-vcontact-update',
  templateUrl: './vcontact-update.component.html',
  styleUrls: ['./vcontact-update.component.scss']
})
export class VcontactUpdateComponent implements OnInit {
  isDisableStatusField:boolean=false;
  contactId;
  contactName;
  phone;
  email;
  address;

  showLoader: boolean = false;
  public listItems = [
    { text: "Activate", value: 1 },
    { text: "Deactivate", value: 2 },
  ];

   // status section
   public defaultStatus: Array<{ text: string, value: number }> = [{ text: "Activate", value: 1 }];


  public selectedItem = [{ text: "Activate", value: 1 }];
  public sideBarsubs: ISubscription;
  public getContactsubs: ISubscription;
  public updateContactSub: ISubscription;
  public contactModel: Contact = new Contact();

  @Input() currentSidebarInfo: CurrentSidebarInfo;
  constructor(private commonService: Commonservice, private contactService: ContactService, private confirmService: ConfirmDialog,private toast:ToastService) { }

  ngOnInit() {
    
    this.sideBarsubs = this.commonService.currentSidebarInfo.subscribe(
      currentSidebarData => {
        console.log('contact updatesubs subs');
        if (currentSidebarData != null && currentSidebarData != undefined) {
          this.showLoader = true;
          this.contactModel = currentSidebarData.RequesterData;
          if (this.contactModel != null) {
            this.callContactDetailAPI(this.contactModel.ContactId + "");
          } else {
          }
        }
      },
      error => {
        this.showLoader = false;
        alert("Something went wrong");
        console.log("Error: ", error)
      }
    );
    //this.setDefaultData(); 
  }

  /** 
    * call api for contact detail.
    */
  callContactDetailAPI(id: string) {
    this.showLoader = true;
    this.getContactsubs = this.contactService.getContactDetail(id).subscribe(
      data => {
        this.showLoader = false;
        let dataArray: any[] = JSON.parse(data);
        this.contactModel = dataArray[0];
       // this.contactModel.=DateTimeHelper.ParseToUTC(this.purchaseInquiryDetail.ValidTillDate);
        localStorage.setItem("SelectedContact", JSON.stringify(this.contactModel));
      }, error => {
        this.showLoader = false;
        alert("Something went wrong");
        console.log("Error: ", error)
      }, () => { }
    );
  }

  UpdateContactData() {
    this.showLoader = true;
    GlobalResource.dirty = false;
    this.updateContactSub = this.contactService.UpdateContact(this.contactModel).subscribe(
      data => {
        this.showLoader = false;
        this.commonService.refreshContactList(true);
        //if after save user set status to cancelled then we have to disable all functionality.
        localStorage.setItem("SelectedContact", JSON.stringify(this.contactModel));
        this.toast.showSuccess(AppMessages.ContactUpdateSuccessMsg);
      },
      error => {
        //alert("Something went wrong");
        console.log("Error: ", error)
        this.showLoader = false;
      },
      () => { this.showLoader = false; }
    );
  }

   /**
* This method will reset the model and date object for add form.
*/
private setDefaultData() {
  this.contactModel = new Contact();
  this.contactModel.Status = this.selectedItem[0].value;
}



    /** 
  * 
  * @param status close right content section, will pass false
  */
    closeRightSidebar() {
      
      let currentSidebarInfo: CurrentSidebarInfo = new CurrentSidebarInfo();
      currentSidebarInfo.SideBarStatus = false;
      this.commonService.setCurrentSideBar(currentSidebarInfo);
    }

  
  valueChange(value: any) {
    GlobalResource.dirty = true;
    console.log('change in datepicker value');

  }
  changeDiv(e) {
    GlobalResource.dirty = true;
    console.log('change in div value');
  }

  ngOnDestroy() {
    if (this.sideBarsubs != undefined)
      this.sideBarsubs.unsubscribe();

    if (this.updateContactSub != undefined)
    this.updateContactSub.unsubscribe();

    if (this.getContactsubs != undefined)
    this.getContactsubs.unsubscribe();
  }

}
