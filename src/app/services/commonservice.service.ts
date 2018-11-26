import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { opticonstants } from '../constants';
import { CurrentSidebarInfo } from '../models/sidebar/current-sidebar-info';
import { NotesModel } from '../models/purchaserequest/notes';
import { TempPurchaseInquiryModel } from '../tempmodels/temppurchase-inquiry';
import { AttachmentDetail } from '../models/AttchmentDetail';



@Injectable({
  providedIn: 'root'
})
export class Commonservice {

  constructor() { } 
  // Declaration
  private commonData = new Subject<any>();
  commonData$ = this.commonData.asObservable();

  // Methods
  public ShareData(data: any) {
    this.commonData.next(data);
  }

  private authData = new Subject<any>();
  authData$ = this.authData.asObservable();

  public shareAuthData(data: any) {
    this.authData.next(this.authData);
  }


  private authData1 = new BehaviorSubject<any>(null);
  authCurrentValue = this.authData1.asObservable();

  public setAuthCurrentValue(data: any) {
    this.authData1.next(data);
  }

  // for Seeting color of theme.
  private themeData = new BehaviorSubject<any>(opticonstants.DEFAULTTHEMECOLOR);
  themeCurrentData = this.themeData.asObservable();

  public setThemeData(data: any) {
    this.themeData.next(data);
  }

  // For opening content from left navigation links.
  private navigatedData = new BehaviorSubject<boolean>(false);
  currentNavigatedData = this.navigatedData.asObservable();

  public setNavigatedData(navigationLink: boolean) {
    this.navigatedData.next(navigationLink);
  }

  // For signup navigation link
  private navigatedFromData = new BehaviorSubject<number>(2);
  currentNavigatedFromValue = this.navigatedFromData.asObservable();

  public setCurrentNavigatedFromData(value: number) {
    this.navigatedFromData.next(value);
  }

  // sidebar code
  private isRigntSideBarOpenData=new BehaviorSubject<boolean>(false);
  currentSideBarOpenStatus=this.isRigntSideBarOpenData.asObservable();

  public setRightSidebarStatus(open:boolean){
    this.isRigntSideBarOpenData.next(open);
  }


  // SideBar Observer
  private sidebarSubject =new BehaviorSubject<CurrentSidebarInfo>(null);
  currentSidebarInfo=this.sidebarSubject.asObservable();


  public setCurrentSideBar(currentSidebarInfoValue:CurrentSidebarInfo){
    this.sidebarSubject.next(currentSidebarInfoValue);
  }

  // Refresh List CPO
  private refreshCPOListSub =new BehaviorSubject<any>(null);
  refreshCPOListSubscriber=this.refreshCPOListSub.asObservable();

  public refreshCPOList(data:any){
    this.refreshCPOListSub.next(data);
  }


  // Refresh List
  private refreshPIListSub =new BehaviorSubject<any>(null);
  refreshPIListSubscriber=this.refreshPIListSub.asObservable();

  public refreshPIList(data:any){
    this.refreshPIListSub.next(data);
  }

   // Refresh List
   private notesDataSub =new BehaviorSubject<NotesModel>(null);
   currentNotesData=this.notesDataSub.asObservable();
 
   public setNotesData(data:NotesModel){
     this.notesDataSub.next(data);
   }

   private notesItemDataSub =new BehaviorSubject<NotesModel>(null);
   currentNotesItemData=this.notesItemDataSub.asObservable();
 
   public setNotesItemData(data:NotesModel){
     this.notesItemDataSub.next(data);
   }
   
   // send inquiry id to item list.
   private itemDataSub =new BehaviorSubject<TempPurchaseInquiryModel>(null);
   currentItemData=this.itemDataSub.asObservable();
 
   public setItemsData(data:TempPurchaseInquiryModel){
     this.itemDataSub.next(data);
   }

   // for Seeting color of theme.
   private purchaseInquiryAttachmentGrid = new BehaviorSubject<any>(true);
   purchaseInquiryAttachmentGridStatus = this.purchaseInquiryAttachmentGrid.asObservable();

   public setPurchaseInquiryAttachmentGrid(data: any) {
      this.purchaseInquiryAttachmentGrid.next(data);
   }



   private attachmentItemDataSub =new BehaviorSubject<AttachmentDetail>(null);
   currentAttachmentItemData=this.attachmentItemDataSub.asObservable();
 
   public setAttachementItemData(data:AttachmentDetail){
     this.attachmentItemDataSub.next(data);
   }

  //  share data between landing and signup page
   private customerUserDataSub =new BehaviorSubject<any>(null);
   getcustomerUserDataSub=this.customerUserDataSub.asObservable();
 
   public passCustomerUserDataToSignup(data:any){
     this.customerUserDataSub.next(data);
   }


   // Refresh List
  private refreshContactListSub =new BehaviorSubject<any>(null);
  refreshContactListSubscriber=this.refreshContactListSub.asObservable();

  public refreshContactList(data:any){
    this.refreshContactListSub.next(data);
  }


   // Refresh List
   private refreshVPIListSub =new BehaviorSubject<any>(null);
   refreshVPIListSubscriber=this.refreshVPIListSub.asObservable();
 
   public refreshVPIList(data:any){
     this.refreshVPIListSub.next(data);
   }

   // Refresh List
   private refreshVPOUpdatedListSub =new BehaviorSubject<any>(null);
   refreshVPOUpdatedListSubscriber=this.refreshVPOUpdatedListSub.asObservable();
 
   public refreshVPOUpdatedList(data:any){
     this.refreshVPOUpdatedListSub.next(data);
   }

   // Refresh List
  private refreshVOIListSub =new BehaviorSubject<any>(null);
  refreshVOIListSubscriber=this.refreshVOIListSub.asObservable();

  public refreshVOIList(data:any){
    this.refreshVOIListSub.next(data);
  }


   // Refresh List
   private closeAddFormShowGridSub =new BehaviorSubject<any>(null);
   closeAddFormShowGridSubscriber=this.closeAddFormShowGridSub.asObservable();
 
   public closeAddShowGridEvent(data:any){
     this.closeAddFormShowGridSub.next(data);
   }
 
}
