import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHelper } from '../helpers/http.helper';
import { Configuration } from '../helpers/Configuration';


@Injectable({
  providedIn: 'root'
})
export class OpenInvoiceService {

  baseUrl = Configuration.baseServerAPIEndpoint;
  constructor(private httpHelper: HttpHelper) { }


   /**
   * get Sales Quotation list data from server.
   */
  public getOpenInvoiceList(): Observable<any> {
    let url: string = this.baseUrl + "openinvoice/list";
    return this.httpHelper.get(url, null);
    //return null;
  }

  /**
   * getSalesQuotationDetail from server.
   */
  public getOpenInvoiceDetail(id:number,type:number): Observable<any> {
    
    let url: string = this.baseUrl + "openinvoice/detail/"+id+"/"+type;  //1 for header tab.
    return this.httpHelper.get(url, null);
  }

  
}
