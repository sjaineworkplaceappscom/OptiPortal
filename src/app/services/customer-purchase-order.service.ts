import { Injectable } from '@angular/core';

import { HttpHelper } from '../helpers/http.helper';
import { Observable } from 'rxjs';
import { CustomerPurchaseOrderModel } from '../tempmodels/customer-purchase-order-model';
import { Configuration } from 'src/app/helpers/Configuration';

@Injectable({
  providedIn: 'root'
})
export class CustomerPurchaseOrderService {

  baseUrl = Configuration.baseServerAPIEndpoint;

  constructor(private httpHelper: HttpHelper) {
  
  }

  /**
   * get List of Inquiries.
   */
  public getCustomerPurchaseOrderList(): Observable<any> {
    let url: string = this.baseUrl + "purchaseorder/list";
    //let reqOption: RequestOptions = new RequestOptions({ method: RequestMethod.Get, headers: headers });
    return this.httpHelper.get(url, null);
  }

  /**
   * Add Purchase Inquiry. 
   */
  public AddPurchaseOrder(request: CustomerPurchaseOrderModel): Observable<any> {
    var data: any = {
      "PurcaseOrderDate": request.PurchaseOrderDate,
      "RefrenceType": request.RefrenceType,
    }
    return this.httpHelper.post(this.baseUrl + "purchaseorder/add", data, null);
  }


  /**
  * UpdatePurchaseInquiry
  */
  public UpdatePurchaseOrder(updateOrder: CustomerPurchaseOrderModel) {
    var purchaseOrderUpdate: any = {
      "PurchaseOrderId": updateOrder.PurchaseOrderId,
      "PurcaseOrderDate": updateOrder.PurchaseOrderDate,
      "RefrenceType": updateOrder.RefrenceType
    }
    return this.httpHelper.put(this.baseUrl + 'purchaseorder/update', purchaseOrderUpdate, null);
  }



  /**
   * Get List of inqui.
   */
  public getPurchaseOrderDetail(PurchaseOrderId: string): Observable<any> {
    let url: string = this.baseUrl + "purchaseorder/detail/" + PurchaseOrderId;
    
    return this.httpHelper.get(url, null);
  }
}
