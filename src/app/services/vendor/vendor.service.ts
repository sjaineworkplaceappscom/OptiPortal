import { Injectable } from '@angular/core';
import { HttpHelper } from '../../helpers/http.helper';
import { Observable } from '../../../../node_modules/rxjs';
import { Configuration } from 'src/app/helpers/Configuration';

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

}
