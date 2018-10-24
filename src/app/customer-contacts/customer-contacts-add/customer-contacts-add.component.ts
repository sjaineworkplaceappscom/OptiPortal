import { Component, OnInit, Input } from '@angular/core';
import { CurrentSidebarInfo } from '../../models/sidebar/current-sidebar-info';
import { GlobalResource } from '../../helpers/global-resource';
import { ISubscription } from '../../../../node_modules/rxjs/Subscription';
import { ContactService } from '../../services/contact.service';
import { Commonservice } from '../../services/commonservice.service';
import { ToastService } from '../../helpers/services/toast.service';
import { ContactModel } from '../../tempmodels/contact-model';
import { AppMessages } from '../../helpers/app-messages';
import { Contact } from '../../tempmodels/contact';

@Component({
  selector: 'app-customer-contacts-add',
  templateUrl: './customer-contacts-add.component.html',
  styleUrls: ['./customer-contacts-add.component.scss']
})
export class CustomerContactsAddComponent implements OnInit {

  contactId;
  contactName;
  phone;
  email;
  address;

  public addSub: ISubscription;
  public listItems = [
    { text: "Activate", value: 1 },
    { text: "Deactivate", value: 2 },
  ];
  public selectedItem = [{ text: "Activate", value: 1 }];
  showLoader: boolean = false;
  @Input() currentSidebarInfo: CurrentSidebarInfo;
  public contactModel: Contact = new Contact();
  constructor(private contactService: ContactService, private commonService: Commonservice, private toast: ToastService) { }

  ngOnInit() {
    this.setDefaultData();
  }

  valueChange(value: any) {
    GlobalResource.dirty = true;
    
  }
  changeDiv(e) { 
    GlobalResource.dirty = true;
  }

  public AddContact() {
    this.showLoader = true;
    GlobalResource.dirty = false;
    this.addSub = this.contactService.AddContact(this.contactModel).subscribe(
      (data: any) => {
        this.showLoader = false;
        this.toast.showSuccess(AppMessages.ContactAddedSuccessMsg);
        this.commonService.refreshContactList(true);
        //localStorage.setItem("SelectedContactInquery", JSON.stringify(data)); comment for abhi k lea.
        this.closeRightSidebar();

      },
      error => {
        alert("Something went wrong");
        console.log("Error: ", error)
        this.showLoader = false;
      },
      () => {
        this.showLoader = false;
        // this.closeRightSidebar();
      }
    );
  }


  /**
 * This method will reset the model and date object for add form.
 */  
  private setDefaultData() {
    this.contactModel = new Contact();
    this.contactModel.Status = this.selectedItem[0].value;
    this.contactModel.ContactName = '';
    this.contactModel.ContactEmail = '';
    this.contactModel.Address = '';
    this.contactModel.PhoneNumber = '';
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

  ngOnDestroy() {
    if (this.addSub != undefined)
      this.addSub.unsubscribe();
  }

}
