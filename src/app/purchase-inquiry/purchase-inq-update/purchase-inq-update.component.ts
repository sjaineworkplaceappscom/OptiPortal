import { Component, OnInit, HostListener, ViewChild, Input } from '@angular/core';
import { TempPurchaseInquiryModel } from '../../tempmodels/temppurchase-inquiry';
import { UIHelper } from '../../helpers/ui.helpers';
import { CurrentSidebarInfo } from '../../models/sidebar/current-sidebar-info';
import { Commonservice } from '../../services/commonservice.service';
import { PurchaseInquiryService } from '../../services/purchase-enquiry.service';
import { NotesModel } from '../../models/purchaserequest/notes';

@Component({
  selector: 'app-purchase-inq-update',
  templateUrl: './purchase-inq-update.component.html',
  styleUrls: ['./purchase-inq-update.component.scss']
})
export class PurchaseInqUpdateComponent implements OnInit {

  @Input() currentSidebarInfo: CurrentSidebarInfo;
  constructor(private commonService: Commonservice, private purchaseInquiryService: PurchaseInquiryService) { }

  isHome: boolean = true;
  isItems: boolean = false;
  isAttchement: boolean = false;
  isNotes: boolean = false;
  tabName: string = 'home';
  notesMasterData: NotesModel = new NotesModel();

  /**
  * This method will reset the model and date object for add form.
 */
  purchaseInquiryDetail: TempPurchaseInquiryModel = new TempPurchaseInquiryModel();

  public validUntilForUpdate: Date;
  public createdDateForUpdate: Date;
  public selectedInquiryId: string = '';

  public isEnableRefField: boolean = false;
  public isEnableStatusField: boolean = false;

  public minValidDate: Date = new Date();
  public customerName: string;
  public customerCode: string;
  public loggedInUserName: string;
  public loginUserType: number;
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
  @ViewChild('optiRightAddInquiry') optiRightAddInquiry;
  @ViewChild('optiTab') optiTab;

  // tab function
  openTab(evt, tabName) {
    this.tabName = tabName;
    UIHelper.customOpenTab(evt, tabName);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // apply width on opti_TabID
    UIHelper.getWidthOfOuterTab();
  }

  ngOnInit() {
   
    /**
     * apply width on opti_TabID
    */
    UIHelper.getWidthOfOuterTab();
    /**
     * Add active class on tab title 
    */
    this.optiTab.nativeElement.children[0].classList.add('active');

    // Set sidebar data;
    this.commonService.currentSidebarInfo.subscribe(
      currentSidebarData => {
        console.log("ngoninit subscriber");
        if (currentSidebarData != null && currentSidebarData != undefined) {
          this.purchaseInquiryDetail = currentSidebarData.RequesterData;
          if (this.purchaseInquiryDetail != null && this.purchaseInquiryDetail != undefined) {
            this.purchaseInquiryDetail.CreatedDate = new Date(this.purchaseInquiryDetail.CreatedDate);
            this.purchaseInquiryDetail.ValidTillDate = new Date(this.purchaseInquiryDetail.ValidTillDate);
            // Set notes data for inquiry
            this.notesMasterData.ParentId = this.purchaseInquiryDetail.PurchaseInquiryId;
            
            // Fire note event 
            this.commonService.setNotesData(this.notesMasterData);
          }


        }

      }
    );
    this.getStatusListForUpdateByCustomer();
    this.getUserDetails();
  }

  ngOnChange() {
    this.commonService.currentSidebarInfo.subscribe(
      currentSidebarData => {
        console.log("ngonchange subscriber");
        this.purchaseInquiryDetail = currentSidebarData.RequesterData;
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

    this.isEnableStatusField = true;
  }

  /**
  * filter the status list 
  */
  public getStatusListForUpdateByCustomer() {
    this.status = [
      { text: "New", value: 2 },
      { text: "Canceled", value: 7 }];
  }
  /**
  * UpdatePurchaseInquiry
  */
  public UpdatePurchaseInquiry() {
    this.purchaseInquiryService.UpdatePurchaseInquiry(this.purchaseInquiryDetail).subscribe(
      data => {
        console.log(data),
          this.commonService.refreshPIList(null);
      },
      error => console.log("Error: ", error),
      () => this.closeRightSidebar()
    );
  }

  /**
   * This will set the data with the draft status.
   */
  public UpdatePurchaseInquiryAsDraft(){
    let Draftstatus:any = { text: "Draft", value: 1 };
   this.purchaseInquiryDetail.Status = Draftstatus.value;
   this.purchaseInquiryService.UpdatePurchaseInquiry(this.purchaseInquiryDetail).subscribe(
     (data:any) => {
    //   debugger;
       console.log("record added:")
       this.commonService.refreshPIList(null);           
     },
     error => {
     //  debugger;
       alert("Something went wrong");            
       console.log("Error: ", error)
     }, 
     ()=> {        
       this.closeRightSidebar();
     }
     
   );

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
}
