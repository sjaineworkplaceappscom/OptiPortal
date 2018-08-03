import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpHelper } from '../helpers/http.helper';
import { Observable } from '../../../node_modules/rxjs/Observable';
import { RequestOptions } from '../../../node_modules/@angular/http';
import { TempPurchaseInquiryModel } from '../tempmodels/temppurchase-inquiry';

@Injectable({
  providedIn: 'root'
})
export class PurchaseEnquiryService {
  baseUrl = environment.baseServerAPIEndpoint;
  
  constructor(private httpHelper:HttpHelper) { 

  }

  /**
   * get List of users
   */

  public getEnquiryList():Observable<any> {    
    let url: string = this.baseUrl + "purchaseinquiry/list";
  //let reqOption: RequestOptions = new RequestOptions({ method: RequestMethod.Get, headers: headers });
   return this.httpHelper.get(url,null);   
  }

  /**
   * AddPurchaseInquiry
   */
  public AddPurchaseInquiry(request: TempPurchaseInquiryModel):Observable<any> {
    var data: any = {
      "customerId": request.Customer,
      "customerName": request.Name,
      "status": request.Status,
      "buyer": request.BuyerCreatedBy,
      "validUntil": request.ValidUntil,
      "refrence": request.Reference
    }
    return this.httpHelper.post(this.baseUrl + "purchaseinquiry/add",data,null);
  }
}
