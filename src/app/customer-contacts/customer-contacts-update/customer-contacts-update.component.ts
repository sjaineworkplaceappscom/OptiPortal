import { Component, OnInit, Input } from '@angular/core';
import { CurrentSidebarInfo } from 'src/app/models/sidebar/current-sidebar-info';
import { ISubscription } from '../../../../node_modules/rxjs/Subscription';
import { ConfirmDialog } from '../../helpers/services/dialog.service';
import { ContactService } from '../../services/contact.service';
import { Commonservice } from '../../services/commonservice.service';
import { ContactModel } from '../../tempmodels/contact-model';
import { GlobalResource } from '../../helpers/global-resource';

@Component({
  selector: 'app-customer-contacts-update',
  templateUrl: './customer-contacts-update.component.html',
  styleUrls: ['./customer-contacts-update.component.scss']
})
export class CustomerContactsUpdateComponent implements OnInit {

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
  public contactModel: ContactModel = new ContactModel();

  @Input() currentSidebarInfo: CurrentSidebarInfo;
  constructor(private commonService: Commonservice, private contactService: ContactService, private confirmService: ConfirmDialog) { }

  ngOnInit() {
    // Set sidebar data;
    console.log('ccu');
    this.sideBarsubs = this.commonService.currentSidebarInfo.subscribe(
      currentSidebarData => {
        
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
    this.setDefaultData(); 
  }

  /** 
    * call api for contact detail.
    */
  callContactDetailAPI(id: string) {
    // console.log("Update:data from LocalStorage:" + JSON.stringify(localStorage.getItem('SelectedPurchaseInquery')));
    this.showLoader = true;
    this.getContactsubs = this.contactService.getContactDetail(id).subscribe(
      data => {
        this.showLoader = false;
        let dataArray: any[] = JSON.parse(data);
        this.contactModel = dataArray[0];
        //this.contactModel.=DateTimeHelper.ParseToUTC(this.purchaseInquiryDetail.ValidTillDate);
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
    this.updateContactSub = this.contactService.UpdateContact(this.contactModel).subscribe(
      data => {
        this.showLoader = false;
        this.commonService.refreshContactList(null);
        //if after save user set status to cancelled then we have to disable all functionality.
        localStorage.setItem("SelectedContact", JSON.stringify(this.contactModel));
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
  this.contactModel = new ContactModel();
  this.contactModel.Status = this.selectedItem[0].value;
}



    /** 
  * 
  * @param status close right content section, will pass false
  */
    closeRightSidebar() {
      GlobalResource.dirty = false;
      let currentSidebarInfo: CurrentSidebarInfo = new CurrentSidebarInfo();
      currentSidebarInfo.SideBarStatus = false;
      this.commonService.setCurrentSideBar(currentSidebarInfo);
    }

  valueChange(value: any) {
    GlobalResource.dirty = true;
  }


}
