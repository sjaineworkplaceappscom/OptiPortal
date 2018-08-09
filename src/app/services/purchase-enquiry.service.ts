import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpHelper } from '../helpers/http.helper';
import { Observable } from '../../../node_modules/rxjs/Observable';
import { RequestOptions } from '../../../node_modules/@angular/http';
import { TempPurchaseInquiryModel } from '../tempmodels/temppurchase-inquiry';
import { Configuration } from '../../assets/configuration';
import { TempPurchaseInquiryItemModel } from '../tempmodels/temppurchase-inquiry-item';

@Injectable({
  providedIn: 'root'
})
export class PurchaseInquiryService {
  baseUrl = Configuration.baseServerAPIEndpoint;
  
  constructor(private httpHelper:HttpHelper) { 

  }

  /**
   * get List of users
   */
  public getInquiryList():Observable<any> {    
    let url: string = this.baseUrl + "purchaseinquiry/list";
  //let reqOption: RequestOptions = new RequestOptions({ method: RequestMethod.Get, headers: headers });
   return this.httpHelper.get(url,null);   
  }

  /**
   * Add Purchase Inquiry.
   */
  public AddPurchaseInquiry(request: TempPurchaseInquiryModel):Observable<any> {
    var data: any = {
      "CustomerId": request.CustomerCode,
      "CustomerName": request.CustomerName,
      "Status": request.Status,
      "Buyer": request.Buyer,
      "ValidUntil": request.ValidTillDate,
      "Refrence": request.ReferenceNumber
    }
    return this.httpHelper.post(this.baseUrl + "purchaseinquiry/add",data,null);
  }


   /**
   * Get List of users.
   */
  public getInquiryItemList(inquiryId:string):Observable<any> {    
    let url: string = this.baseUrl + "purchaseinquiryitem/list/"+inquiryId;
    return this.httpHelper.get(url,null);   
  }


  /**
   * Add Purchase Inquiry Item.
   */
 public AddPurchaseInquiryItem(request: TempPurchaseInquiryItemModel) {
  var data: any = {
  "PurchaseInquiryId": request.PurchaseInquiryId,
  "CustomerItemIdOrDescription": request.CustomerItemCode,
  "ItemDescription": request.Description,
  "Quantitiy": request.Quantity,
  "Unit": request.Unit,
  "Requester": request.Requester,
  "RequestDate": request.RequestDate,
  "RequiredDate": request.RequiredDate,
  "ShipToLocation": request.ShipToLocation
  }
  return this.httpHelper.post(this.baseUrl + 'purchaseinquiryitem/add',data,null);
  }
}
