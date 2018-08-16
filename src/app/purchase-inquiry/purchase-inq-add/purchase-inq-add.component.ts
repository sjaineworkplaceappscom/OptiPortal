import { Component, OnInit, ViewChild, HostListener, Input } from '@angular/core';
import { UIHelper } from '../../helpers/ui.helpers';
import { TempPurchaseInquiryModel } from '../../tempmodels/temppurchase-inquiry';
import { CurrentSidebarInfo } from '../../models/sidebar/current-sidebar-info';
import { PurchaseInquiryService } from '../../services/purchase-enquiry.service';
import { Commonservice } from '../../services/commonservice.service';
@Component({
  selector: 'app-purchase-inq-add',
  templateUrl: './purchase-inq-add.component.html',
  styleUrls: ['./purchase-inq-add.component.scss']
})
export class PurchaseInqAddComponent implements OnInit {
  @Input() currentSidebarInfo: CurrentSidebarInfo;
  constructor(private purchaseInquiryService: PurchaseInquiryService, private commonService: Commonservice) { }

  isHome: boolean = true;
  isItems: boolean = false;
  isAttchement: boolean = false;
  isNotes: boolean = false;
  tabName: string = 'home';
  tabStatus:boolean = false;

  public minValidDate: Date = new Date();
  public purchaseInqueryAdd: TempPurchaseInquiryModel = new TempPurchaseInquiryModel();
  public validUntilForUpdate: Date;
  publiccreatedDateForUpdate: Date;

  public customerName: string;
  public customerCode: string;
  public loggedInUserName: string;
  public loginUserType: number;
  // status section
  public status: Array<{ text: string, value: number }> = [{ text: "New", value: 2 }];

  @ViewChild('optiRightAddInquiry') optiRightAddInquiry;
  @ViewChild('optiTab') optiTab;

  // tab function
  openTab(evt, tabName, tabStatus) {
    if(tabStatus == true){
      this.tabName = tabName;
      UIHelper.customOpenTab(evt, tabName);
    }
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

    this.setDefaultData();

  }




  /**
* This method will reset the model and date object for add form.
*/
  setDefaultData() {
    this.getUserDetails();

    this.purchaseInqueryAdd = new TempPurchaseInquiryModel();
    this.validUntilForUpdate = new Date();

    this.purchaseInqueryAdd.ValidTillDate = new Date();
    this.purchaseInqueryAdd.CreatedDate = new Date();
    this.purchaseInqueryAdd.CustomerName = this.customerName;
    this.purchaseInqueryAdd.CustomerCode = this.customerCode;
    this.purchaseInqueryAdd.Buyer = this.loggedInUserName;
    this.purchaseInqueryAdd.Status = 2;
    //this.setFlagsForAdd();  
  }

  private getUserDetails() {
    //for getting logged in user info from local storage.
    let userDetail: string = localStorage.getItem("LoginUserDetail");
    let userData: any[] = JSON.parse(userDetail);
    this.loggedInUserName = userData[0].LoginUserName;
    this.customerName = userData[0].CustomerName;
    this.customerCode = userData[0].CustomerCode;
    this.loginUserType = userData[0].LoginUserType;
  }

  public AddPurchaseInquiry() {
    this.purchaseInquiryService.AddPurchaseInquiry(this.purchaseInqueryAdd).subscribe(
      (data:any) => {
        console.log("record added:")
        this.commonService.refreshPIList(null);           
      },
      error => {
        alert("Something went wrong");            
        console.log("Error: ", error)
      },
      ()=> {        
        this.closeRightSidebar();
      }
      
    );

  }
  /**
   * This will set the data with the draft status.
   */
  public AddPurchaseInquiryAsDraft(){
     let Draftstatus:any = { text: "Draft", value: 1 };
    this.purchaseInqueryAdd.Status = Draftstatus.value;
    this.purchaseInquiryService.AddPurchaseInquiry(this.purchaseInqueryAdd).subscribe(
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
