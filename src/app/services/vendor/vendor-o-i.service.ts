import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/helpers/Configuration';
import { HttpHelper } from 'src/app/helpers/http.helper';
import { Observable } from 'rxjs';
import { VendorOIModel } from 'src/app/tempmodels/vendor/vendor-OI-model';

@Injectable({
  providedIn: 'root'
})
export class VendorOIService {


  baseUrl = Configuration.baseServerAPIEndpoint;
  constructor(private httpHelper: HttpHelper) { 
    this.baseUrl = Configuration.baseServerAPIEndpoint;
  }

   /**
   * get List of Vendor Open Invoice.
   */
  public getVendorOIList(): Observable<any> {
    let url: string = this.baseUrl + "vendoropeninvoice/list";
    //let reqOption: RequestOptions = new RequestOptions({ method: RequestMethod.Get, headers: headers });
    return this.httpHelper.get(url, null);
  }

  /**
   * Add Purchase Inquiry. 
   */
  public AddOpenInvoice(request: VendorOIModel): Observable<any> {
    var data: any = {
      "InvoiceId": request.InvoiceId,
      "PORefrenceNumber": request.PORefrenceNumber,
      "Vendor": request.Vendor,
      "InvoiceDate": request.InvoiceDate,
      "InvoiceAmount": request.InvoiceAmount,
      "PaymentDueDate": request.PaymentDueDate,
      "Status": request.Status,
    }
    return this.httpHelper.post(this.baseUrl + "vendoropeninvoice/add", data, null);
  }

}
