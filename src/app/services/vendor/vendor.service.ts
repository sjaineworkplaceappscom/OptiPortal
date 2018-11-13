import { Injectable } from '@angular/core';
import { HttpHelper } from '../../helpers/http.helper';
import { Observable } from 'rxjs';
import { Configuration } from '../../helpers/Configuration';

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

}
