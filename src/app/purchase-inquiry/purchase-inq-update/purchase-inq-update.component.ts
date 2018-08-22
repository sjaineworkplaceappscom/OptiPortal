import { Component, OnInit, HostListener, ViewChild, Input } from '@angular/core';
import { TempPurchaseInquiryModel } from '../../tempmodels/temppurchase-inquiry';
import { UIHelper } from '../../helpers/ui.helpers';
import { CurrentSidebarInfo } from '../../models/sidebar/current-sidebar-info';
import { Commonservice } from '../../services/commonservice.service';
import { PurchaseInquiryService } from '../../services/purchase-enquiry.service';
import { NotesModel } from '../../models/purchaserequest/notes';
import { CustomerEntityType, PurchaseInquiryStatus } from '../../enums/enums';
import { ISubscription } from '../../../../node_modules/rxjs-compat/Subscription';

@Component({
  selector: 'app-purchase-inq-update',
  templateUrl: './purchase-inq-update.component.html',
  styleUrls: ['./purchase-inq-update.component.scss']
})
export class PurchaseInqUpdateComponent implements OnInit {

  @Input() currentSidebarInfo: CurrentSidebarInfo;
  constructor(private commonService: Commonservice, private purchaseInquiryService: PurchaseInquiryService) { }

  isCancelStatus: boolean = false;
  isHome: boolean = true;
  isItems: boolean = false;
  isAttchement: boolean = false;
  isNotes: boolean = false;
  tabName: string = 'home';
  notesMasterData: NotesModel = new NotesModel();
  inquiryModelForItems: TempPurchaseInquiryModel = new TempPurchaseInquiryModel();
  showLoader: boolean = false;
  /**
  * This method will reset the model and date object for add form.
 */
  purchaseInquiryDetail: TempPurchaseInquiryModel = new TempPurchaseInquiryModel();

  public validUntilForUpdate: Date;
  public createdDateForUpdate: Date;
  public selectedInquiryId: string = '';

  public isEnableRefField: boolean = false;
  public isDisableStatusField: boolean = false;

  public minValidDate: Date = new Date();
  public customerName: string;
  public customerCode: string;
  public loggedInUserName: string;
  public loginUserType: number;
  public isDisableSaveAsDraft = false;
  public isDisableSave = false;
  // status section
  public status: Array<{ text: string, value: number }> = [
    { text: "Draft", value: 1 },
    { text: "New", value: 2 },
    { text: "Revised", value: 3 },
    { text: "Approved", value: 4 },
    { text: "Partial Approved", value: 5 },
    { text: "Rejected", value: 6 },
    { text: "Canceled", value: 7 },
    { text: "Closed", value: 8 }
  ];

  public sideBarsubs:ISubscription;
  public updatePISub:ISubscription;

  @ViewChild('optiRightAddInquiry') optiRightAddInquiry;
  @ViewChild('optiTab') optiTab;

  // tab function
  openTab(evt, tabName) {
    
    if(tabName=='notes')
    this.commonService.setNotesData(this.notesMasterData);

    if(tabName=='items')
    this.commonService.setItemsData(this.inquiryModelForItems);

      // Set default condition for purchase inquiery attachment
    if(tabName=='attachement')  
    this.commonService.setPurchaseInquiryAttachmentGrid(true);

    this.tabName = tabName;
    
    UIHelper.customOpenTab(evt, tabName, 'horizontal');
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // apply width on opti_TabID
    UIHelper.getWidthOfOuterTab();
  }

  ngOnDestroy(){
    if(this.sideBarsubs!=undefined)
    this.sideBarsubs.unsubscribe();

    if(this.updatePISub!=undefined)
    this.updatePISub.unsubscribe();
}

  ngOnInit() {
    // apply width on opti_TabID
    UIHelper.getWidthOfOuterTab();
    // Add active class on tab title 

    this.optiTab.nativeElement.children[0].classList.add('active');
    //get status of selected inquiry for disabling or enabling  forms
    let inquiryDetail: string = localStorage.getItem("SelectedPurchaseInquery");
    
    if (inquiryDetail != null && inquiryDetail != undefined) {
      let inquiryData: any = JSON.parse(inquiryDetail);
      let inquiryStatus = inquiryData.Status;
      if (inquiryStatus == PurchaseInquiryStatus.Canceled) {
        this.isCancelStatus = true;
      }
    }

    // Set sidebar data;
    this.sideBarsubs=this.commonService.currentSidebarInfo.subscribe(

      currentSidebarData => {
        if (currentSidebarData != null && currentSidebarData != undefined) {

          this.showLoader = true;

          this.purchaseInquiryDetail = currentSidebarData.RequesterData;

          if (this.purchaseInquiryDetail != null && this.purchaseInquiryDetail != undefined) {

            this.purchaseInquiryDetail.CreatedDate = new Date(this.purchaseInquiryDetail.CreatedDate);
            this.purchaseInquiryDetail.ValidTillDate = new Date(this.purchaseInquiryDetail.ValidTillDate);
            
            this.getStatusListForUpdateByCustomer();
            this.getUserDetails();

            // Set notes data for inquiry
            this.notesMasterData.ParentId = this.purchaseInquiryDetail.PurchaseInquiryId;
            this.notesMasterData.ParentType = CustomerEntityType.PurchaseInquiry;

            // Set items data for inquiry items.
            this.inquiryModelForItems.PurchaseInquiryId = this.purchaseInquiryDetail.PurchaseInquiryId;

            //this.openTab(null,'home');

            // Fire note event 
            //this.commonService.setNotesData(this.notesMasterData);

            //Fire event for items.
            //this.commonService.setItemsData(this.inquiryModelForItems);

            this.showLoader = false;
          }
        }
      },
      error => {
        this.showLoader = false;
        alert("Something went wrong");
        console.log("Error: ", error)
      }

    );

  }

  ngOnChange() {
    this.sideBarsubs=this.commonService.currentSidebarInfo.subscribe(
      currentSidebarData => {

        this.purchaseInquiryDetail = currentSidebarData.RequesterData;
      },
      error => {
        // this.showLoader=false;
        alert("Something went wrong");
        console.log("Error: ", error)
      }
    );
  }

  private getUserDetails() {
    //for getting logged in user info from local storage.
    let userDetail: string = localStorage.getItem("LoginUserDetail");
    let userData: any[] = JSON.parse(userDetail);
    this.loggedInUserName = userData[0].LoginUserName;
    this.customerName = userData[0].ParentName;
    this.customerCode = userData[0].ParentCode;
    this.loginUserType = userData[0].LoginUserType;
    this.setFlagsForUpdate();
  }



  setFlagsForUpdate() {
    if (this.loginUserType == 2 || this.loginUserType == 3) {
      this.isEnableRefField = false;
    } else {
      this.isEnableRefField = true;
    }

  }

  /**
  * filter the status list according to last selected status.
  */
  public getStatusListForUpdateByCustomer() {

    if (this.purchaseInquiryDetail.Status == 1) {
      this.status = [
        { text: "Draft", value: 1 },
        { text: "New", value: 2 },
        { text: "Canceled", value: 7 }];

    } else {
      if (this.purchaseInquiryDetail.Status == 7) {
        // user can not do anyting only view all things are disabled.
        this.isDisableSave = true;
        this.isDisableSaveAsDraft = true;
        this.isDisableStatusField = true;
      } else {
        //means status is new.
        this.isDisableSaveAsDraft = true;
        this.status = [
          { text: "New", value: 2 },
          { text: "Canceled", value: 7 }];
      }

    }

  }
  /**
  * UpdatePurchaseInquiry
  */
  public UpdatePurchaseInquiry(saveAsDraft: boolean = false) {
    // if No draft then disable draft button.
    if (this.purchaseInquiryDetail.Status != 1) {
      this.isDisableSaveAsDraft = true;
    }


    //save as draft click
    // Draft status
    if (saveAsDraft) {
      let Draftstatus: any = { text: "Draft", value: 1 };
      this.purchaseInquiryDetail.Status = Draftstatus.value;
    }
    else {
      //save click
      if (this.purchaseInquiryDetail.Status == 1) {
        this.purchaseInquiryDetail.Status = 2;
      }
    }

    this.showLoader = true;
    this.updatePISub=this.purchaseInquiryService.UpdatePurchaseInquiry(this.purchaseInquiryDetail).subscribe(
      data => {
        this.showLoader = false;
        this.commonService.refreshPIList(null);

      },
      error => {
        alert("Something went wrong");
        console.log("Error: ", error)
        this.showLoader = false;
      },
      () => { this.showLoader = false; }

      // () => this.closeRightSidebar()
    );
  }

  // Unused
  /**
   * This will set the data with the draft status.
   */
  // public UpdatePurchaseInquiryAsDraft() {


  //   this.purchaseInquiryService.UpdatePurchaseInquiry(this.purchaseInquiryDetail).subscribe(
  //     (data: any) => {
  //       //   debugger;
  //       console.log("record added:")
  //       this.commonService.refreshPIList(null);
  //     },
  //     error => {
  //       //  debugger;
  //       alert("Something went wrong");
  //       console.log("Error: ", error)
  //     },
  //     () => {
  //       //this.closeRightSidebar();
  //     }

  //   );

  // }

  /**
* 
* @param status close right content section, will pass false
*/
  closeRightSidebar() {
    let currentSidebarInfo: CurrentSidebarInfo = new CurrentSidebarInfo();
    currentSidebarInfo.SideBarStatus = false;
    this.commonService.setCurrentSideBar(currentSidebarInfo);
  }
}
