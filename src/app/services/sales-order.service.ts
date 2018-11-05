import { Injectable } from '@angular/core';
import { HttpHelper } from '../helpers/http.helper';
import { Observable } from 'rxjs';
import { Configuration } from '../helpers/Configuration';

@Injectable({
  providedIn: 'root'
})
export class SalesOrderService {

  baseUrl = Configuration.baseServerAPIEndpoint;
  constructor(private httpHelper: HttpHelper) { }


   /**
   * get Sales Quotation list data from server.
   */
  public getSalesOrderList(): Observable<any> {
    let url: string = this.baseUrl + "salesorder/list";
    return this.httpHelper.get(url, null);
    //return null;
  }

  /**
   * getSalesQuotationDetail from server.
   */
  public getSalesOrderDetail(id:number,type:number): Observable<any> {
    
    let url: string = this.baseUrl + "salesorder/detail/"+id+"/"+type;  //1 for header tab.
    return this.httpHelper.get(url, null);
  }

  /**
   * getSalesQuotationDetail from server.
   */
  // public getSalesOrderContentDetail(id:number,type:number): Observable<any> {
  //   let url: string = this.baseUrl + "salesquotation/contentdetail/"+id+"/"+type;
  //   return this.httpHelper.get(url, null);
  // }

  /**
   * getSalesQuotationDetail from server.
   */
  // public getSalesOrderAttachmentDetail(id:number): Observable<any> {
  //   let url: string = this.baseUrl + "salesquotation/attachmentdetail/"+id;
  //   return this.httpHelper.get(url, null);
  // }

}
