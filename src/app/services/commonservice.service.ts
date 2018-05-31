import { Injectable } from '@angular/core';
import { Subject ,BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn:'root'
})
export class CommonserviceService {

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


  private authData1=new BehaviorSubject<any>(null);
  authCurrentValue=this.authData1.asObservable()

  public setAuthCurrentValue(data:any){
    this.authData1.next(data);
  }

}
