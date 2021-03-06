import { Injectable } from '@angular/core';
import { HttpHelper } from '../helpers/http.helper';
import { Observable } from 'rxjs/Observable';
import { TempPurchaseInquiryModel } from '../tempmodels/temppurchase-inquiry';

import { TempPurchaseInquiryItemModel } from '../tempmodels/temppurchase-inquiry-item';
import { Configuration } from '../helpers/Configuration';


@Injectable({
  providedIn: 'root'
})
export class PurchaseInquiryService {  
  baseUrl: string=Configuration.baseServerAPIEndpoint;

  constructor(private httpHelper: HttpHelper) {
    this.baseUrl = Configuration.baseServerAPIEndpoint;
  }

  /**
   * get List of Inquiries.
   */
  public getInquiryList(): Observable<any> {
    let url: string = this.baseUrl + "purchaseinquiry/list";
    //let reqOption: RequestOptions = new RequestOptions({ method: RequestMethod.Get, headers: headers });
    return this.httpHelper.get(url, null);
  }

  /**
   * Add Purchase Inquiry. 
   */
  public AddPurchaseInquiry(request: TempPurchaseInquiryModel): Observable<any> {
    var data: any = {
      "CustomerId": request.CustomerCode,
      "CustomerName": request.CustomerName,
      "Status": request.Status,
      "Buyer": request.Buyer,
      "ValidUntil": request.ValidTillDate,
      "Refrence": request.ReferenceNumber
    }
    return this.httpHelper.post(this.baseUrl + "purchaseinquiry/add", data, null);
  }


  /**
  * Get List of users.
  */
  public getInquiryItemList(inquiryId: string): Observable<any> {
    let url: string = this.baseUrl + "purchaseinquiryitem/list/" + inquiryId;
    return this.httpHelper.get(url, null);
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
      "Status": request.Status,
      "Unit": request.Unit,
      "Requester": request.Requester,
      "RequestDate": request.RequestDate,
      "RequiredDate": request.RequiredDate,
      "ShipToLocation": request.ShipToLocation
    }
    return this.httpHelper.post(this.baseUrl + 'purchaseinquiryitem/add', data, null);
  }

  /**
   * Update Purchase Inquiry Item.
   */
  public UpdatePurchaseInquiryItem(request: TempPurchaseInquiryItemModel) {

    var data: any = {
      "CustomerItemCode": request.CustomerItemCode,
      "PurchaseInquiryId": request.PurchaseInquiryId,
      "PurchaseInquiryItemId": request.PurchaseInquiryItemId,
      "ItemDescription": request.Description,
      "Quantitiy": request.Quantity,
      "Unit": request.Unit,
      "Status": request.Status,
      "Requester": request.Requester,
      "RequestDate": request.RequestDate,
      "RequiredDate": request.RequiredDate,
      "ShipToLocation": request.ShipToLocation
    }
    return this.httpHelper.put(this.baseUrl + 'purchaseinquiryitem/update', data, null);
  }

  /**
  * UpdatePurchaseInquiry
  */
  public UpdatePurchaseInquiry(updateInquiry: TempPurchaseInquiryModel) {
    var purchaseInquiryUpdate: any = {
      "PurchaseInquiryId": updateInquiry.PurchaseInquiryId,
      "ValidUntil": updateInquiry.ValidTillDate,
      "Status": updateInquiry.Status
    }
    return this.httpHelper.put(this.baseUrl + 'purchaseinquiry/update', purchaseInquiryUpdate, null);
  }



  /**
* Get List of users.
*/
  public getInquiryDetail(inquiryId: string): Observable<any> {
    let url: string = this.baseUrl + "purchaseinquiry/detail/" + inquiryId;
    return this.httpHelper.get(url, null);
  }

  /**
* Get List of users.
*/
  public getPurchaseInquiryDashboardDetail(): Observable<any> {
    let url: string = this.baseUrl + "purchaseinquiry/dashboarddetail";
    return this.httpHelper.get(url, null);
  }
}
