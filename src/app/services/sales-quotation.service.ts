import { Injectable } from '@angular/core';
import { Configuration } from '../../assets/configuration';
import { HttpHelper } from '../helpers/http.helper';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SalesQuotationService {

  baseUrl = Configuration.baseServerAPIEndpoint;

  constructor(private httpHelper: HttpHelper) { }

  /**
   * get Sales Quotation list data from server.
   */
  public getSalesQuotationList(): Observable<any> {
    let url: string = this.baseUrl + "salesquotation/list";
    return this.httpHelper.get(url, null);
    //return null;
  }

  /**
   * getSalesQuotationDetail from server.
   */
  public getSalesQuotationDetail(id:number,type:number): Observable<any> {
    let url: string = this.baseUrl + "salesquotation/detail/"+id+"/"+type;
    return this.httpHelper.get(url, null);
  }

  /**
   * getSalesQuotationDetail from server.
   */
  public getSalesQuotationContentDetail(id:number): Observable<any> {
    let url: string = this.baseUrl + "salesquotation/contentdetail/"+id;
    return this.httpHelper.get(url, null);
  }

    /**
   * getSalesQuotationDetail from server.
   */
  public getSalesQuotationAttachmentDetail(id:number): Observable<any> {
    let url: string = this.baseUrl + "salesquotation/attachmentdetail/"+id;
    return this.httpHelper.get(url, null);
  }
}
