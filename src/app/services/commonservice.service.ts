import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { opticonstants } from '../constants';
import { CurrentSidebarInfo } from '../models/sidebar/current-sidebar-info';
import { NotesModel } from '../models/purchaserequest/notes';


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


  // Refresh List
  private refreshPIListSub =new BehaviorSubject<any>(null);
  refreshPIListSubscriber=this.refreshPIListSub.asObservable();

  public refreshPIList(data:any){
    this.refreshPIListSub.next(data);
  }

   // Refresh List
   private notesDataSub =new BehaviorSubject<NotesModel>(null);
   currentNotesData=this.notesDataSub.asObservable();
 
   public setNotesData(data:any){
     this.notesDataSub.next(data);
   }

}
