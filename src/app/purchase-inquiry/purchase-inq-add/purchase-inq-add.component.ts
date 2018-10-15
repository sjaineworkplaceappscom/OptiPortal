import { Component, OnInit, ViewChild, HostListener, Input } from '@angular/core';
import { UIHelper } from '../../helpers/ui.helpers';
import { TempPurchaseInquiryModel } from '../../tempmodels/temppurchase-inquiry';
import { CurrentSidebarInfo } from '../../models/sidebar/current-sidebar-info';
import { PurchaseInquiryService } from '../../services/purchase-enquiry.service';
import { Commonservice } from '../../services/commonservice.service';
import { ModuleName, ComponentName, PurchaseInquiryStatus } from '../../enums/enums';
import { ISubscription } from 'rxjs/Subscription';
import { DateTimeHelper } from '../../helpers/datetime.helper';
import { GlobalResource } from '../../helpers/global-resource';
import { ToastService } from '../../helpers/services/toast.service';

@Component({
  selector: 'app-purchase-inq-add',
  templateUrl: './purchase-inq-add.component.html',
  styleUrls: ['./purchase-inq-add.component.scss']
})
export class PurchaseInqAddComponent implements OnInit {
  @Input() currentSidebarInfo: CurrentSidebarInfo;
  constructor(private purchaseInquiryService: PurchaseInquiryService, private commonService: Commonservice,private toast:ToastService) { }

  isHome: boolean = true;
  isItems: boolean = false;
  isAttchement: boolean = false;
  isNotes: boolean = false;
  tabName: string = 'home';
  tabStatus: boolean = false;
  showLoader:boolean=false;

public minValidDate: Date = new Date();
  public purchaseInqueryAdd: TempPurchaseInquiryModel = new TempPurchaseInquiryModel();
  public validUntilForUpdate: Date;
  public createdDateForUpdate: Date;
 
  public customerName: string;
  public customerCode: string;
  public loggedInUserName: string;
  public loginUserType: number;
  public addSub:ISubscription;

  // status section
  public defaultStatus: Array<{ text: string, value: number }> = [{ text: "New", value: PurchaseInquiryStatus.New }];

  @ViewChild('optiRightAddInquiry') optiRightAddInquiry;
  @ViewChild('optiTab') optiTab;

  // tab function
  openTab(evt, tabName, tabStatus) {
    if (tabStatus == true) {
      this.tabName = tabName;
      UIHelper.customOpenTab(evt, tabName, 'horizontal');
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // apply width on opti_TabID
    UIHelper.getWidthOfOuterTab();
  }

  valueChange(value:any){    
    GlobalResource.dirty=true;
    console.log('change in datepicker value'); 
  }

  ngOnInit() {
    // apply width on opti_TabID
    UIHelper.getWidthOfOuterTab();
    // Add active class on tab title 
    this.optiTab.nativeElement.children[0].classList.add('active');
    this.setDefaultData();
  }

  ngOnDestroy(){
    if(this.addSub!=undefined)
    this.addSub.unsubscribe();
}



  /**
* This method will reset the model and date object for add form.
*/
  private setDefaultData() {
    this.getUserDetails();

    this.purchaseInqueryAdd = new TempPurchaseInquiryModel();
    this.validUntilForUpdate = new Date();

    this.purchaseInqueryAdd.ValidTillDate = new Date();
    this.purchaseInqueryAdd.CreatedDate = new Date();
    this.purchaseInqueryAdd.CustomerName = this.customerName;
    this.purchaseInqueryAdd.CustomerCode = this.customerCode;
    this.purchaseInqueryAdd.Buyer = this.loggedInUserName;
    this.purchaseInqueryAdd.Status = PurchaseInquiryStatus.New;
  }

  private getUserDetails() {
    //for getting logged in user info from local storage.
    let userDetail: string = localStorage.getItem("LoginUserDetail");   
    let userData: any[] = JSON.parse(userDetail);
    this.loggedInUserName = userData[0].LoginUserName;
    this.customerName = userData[0].ParentName;
    this.customerCode = userData[0].ParentCode;
    this.loginUserType = userData[0].LoginUserType;    
  }

  public AddPurchaseInquiry(saveAsDraft: boolean = false) {
    GlobalResource.dirty=false;

    if (saveAsDraft == true) {
      let Draftstatus: any = { text: "Draft", value: PurchaseInquiryStatus.Draft };
      this.purchaseInqueryAdd.Status = Draftstatus.value;
    }
    
    
    //DateTimeHelper.ParseToUTC(this.purchaseInqueryAdd.ValidTillDate);
    this.purchaseInqueryAdd.ValidTillDate=DateTimeHelper.ParseToUTC(this.purchaseInqueryAdd.ValidTillDate);
    
    this.showLoader=true;
    this.addSub=this.purchaseInquiryService.AddPurchaseInquiry(this.purchaseInqueryAdd).subscribe(
      (data: any) => {  
        this.toast.ShowNotification();

        this.commonService.refreshPIList(null);
         
        localStorage.setItem("PurchaseinqueryId",data.PurchaseInquiryId);      
        localStorage.setItem("SelectedPurchaseInquery",JSON.stringify(data));         
        this.openUpdateSideBar(data); 
        this.showLoader=false;
      },
      error => {
        alert("Something went wrong");
        console.log("Error: ", error)
        this.showLoader=false;
      },
      () => {
        this.showLoader=false;
       // this.closeRightSidebar();
      }

    );

  }

/** 
* 
* @param status close right content section, will pass false
*/
  closeRightSidebar() {
    GlobalResource.dirty=false;
    let currentSidebarInfo: CurrentSidebarInfo = new CurrentSidebarInfo();
    currentSidebarInfo.SideBarStatus = false;
    this.commonService.setCurrentSideBar(currentSidebarInfo);
  }

  openUpdateSideBar(data: any){
    let currentSidebarInfo: CurrentSidebarInfo = new CurrentSidebarInfo();
    currentSidebarInfo.SideBarStatus = true,
    currentSidebarInfo.ModuleName=ModuleName.Purchase;
    currentSidebarInfo.ComponentName=ComponentName.UpdateInquery;
    currentSidebarInfo.RequesterData=data
    this.commonService.setCurrentSideBar(currentSidebarInfo);
  }

  // public show(): void {
  //     this.notificationService.show({
  //         content: 'Your data has been saved. Time for tea!',
  //         animation: { type: 'slide', duration: 400 },
  //         position: { horizontal: 'right', vertical: 'top' },
  //         type: { style: 'success', icon: true },
  //         closable: true
  //     });
  // }

}
