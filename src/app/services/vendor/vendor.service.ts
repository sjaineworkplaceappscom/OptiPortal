import { Injectable } from '@angular/core';
import { HttpHelper } from '../../helpers/http.helper';
import { Observable } from 'rxjs';
import { Configuration } from '../../helpers/Configuration';
import { VendorASNModel } from 'src/app/tempmodels/vendor/vendor-asn-model';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  baseUrl = Configuration.baseServerAPIEndpoint;
  constructor(private httpHelper: HttpHelper) { 
    this.baseUrl = Configuration.baseServerAPIEndpoint;
  }

  /**
   * get List of Vendor Purchase Inquiries.
   */
  public getVendorInquiryList(): Observable<any> {
    let url: string = this.baseUrl + "vendorpurchaseinquiry/list";
    //let reqOption: RequestOptions = new RequestOptions({ method: RequestMethod.Get, headers: headers });
    return this.httpHelper.get(url, null);
  }



  /**
   * get Vendor Detail of Vendor Purchase Inquiries.
   */
  public getVendorDetailById(id: string,type:string): Observable<any> {
    let url: string = this.baseUrl + "vendorpurchaseinquiry/detail/"+id+"/"+type;
    //let reqOption: RequestOptions = new RequestOptions({ method: RequestMethod.Get, headers: headers });
    return this.httpHelper.get(url, null);
  }


 /**
   * get List of Vendor Purchase Order.
   */
  public getVendorPOList(): Observable<any> {
    let url: string = this.baseUrl + "vendorpurchaseorder/list";
    //let reqOption: RequestOptions = new RequestOptions({ method: RequestMethod.Get, headers: headers });
    return this.httpHelper.get(url, null);
  }



  /**
   * get Vendor Detail of Vendor Purchase Inquiries.
   */
  public getVendorPODetailById(id: string,type:string): Observable<any> {
    let url: string = this.baseUrl + "vendorpurchaseorder/detail/"+id+"/"+type;
    //let reqOption: RequestOptions = new RequestOptions({ method: RequestMethod.Get, headers: headers });
    return this.httpHelper.get(url, null);
  }

   /**
   * get Vendor Detail of Vendor Purchase Inquiries.
   */
  public getVendorPOUpdateList(): Observable<any> {
    let url: string = this.baseUrl + "vendorpurchaseorder/updatedlist";
    //let reqOption: RequestOptions = new RequestOptions({ method: RequestMethod.Get, headers: headers });
    return this.httpHelper.get(url, null);
  }

  public SendAck(orderId): Observable<any> {
    let url: string = this.baseUrl + "vendorpurchaseorder/sendack";
    //let reqOption: RequestOptions = new RequestOptions({ method: RequestMethod.Get, headers: headers });
    return this.httpHelper.post(url, orderId,null);
  }

  /**
   * get List of Vendor Purchase Order.
   */
  public getPaymentList(): Observable<any> {
    let url: string = this.baseUrl + "payment/list";
    //let reqOption: RequestOptions = new RequestOptions({ method: RequestMethod.Get, headers: headers });
    return this.httpHelper.get(url, null);
  }



  /**
   * get Vendor Detail of Vendor Payment.
   */
  public getPaymentDetailById(id: string,type:string): Observable<any> {
    let url: string = this.baseUrl + "payment/detail/"+id+"/"+type;
    //let reqOption: RequestOptions = new RequestOptions({ method: RequestMethod.Get, headers: headers });
    return this.httpHelper.get(url, null);
  }
  
   /**
   * Add Purchase Inquiry. 
   */
  public AddVendorASN(request: VendorASNModel): Observable<any> {
    var data: any = { 
      "ASNId": request.ASNId,
      "PORefrenceNumber": request.PORefrenceNumber,
      "Vendor": request.Vendor,
      "DeliveryDate": request.DeliveryDate,
      "ShipmentDate": request.ShipmentDate,
      "Price": request.Price,
      "TotalPrice": request.TotalPrice,
      "Discount":request.Discount,
      "WayBillNumber":request.WayBillNumber,
      "TrackingNumber":request.TrackingNumber,
      "Tax":request.Tax,
      "Frieght":request.Frieght
    }
    return this.httpHelper.post(this.baseUrl + "vendorinvoicecontent/add", data, null);
  }
}
