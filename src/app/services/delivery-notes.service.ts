import { Injectable } from '@angular/core';
import { Configuration } from '../../assets/configuration';
import { HttpHelper } from '../helpers/http.helper';
import { Observable } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeliveryNotesService {

  baseUrl = Configuration.baseServerAPIEndpoint;
  constructor(private httpHelper: HttpHelper) { }

   /**
   * get Sales Quotation list data from server.
   */
  public getDeliveryNotesList(): Observable<any> {
    let url: string = this.baseUrl + "deliverynotes/list";
    return this.httpHelper.get(url, null);
    //return null;
  }

  /**
   * getSalesQuotationDetail from server.
   */
  public getDeliveryNotesDetail(id:number,type:number): Observable<any> {
    let url: string = this.baseUrl + "deliverynotes/detail/"+id+"/"+type;
    return this.httpHelper.get(url, null);
  }

  // /**
  //  * getSalesQuotationDetail from server.
  //  */
  // public getDeliveryNotesContentDetail(id:number): Observable<any> {
  //   let url: string = this.baseUrl + "salesquotation/contentdetail/"+id;
  //   return this.httpHelper.get(url, null);
  // }

  //   /**
  //  * getSalesQuotationDetail from server.
  //  */
  // public getDeliveryNotesAttachmentDetail(id:number): Observable<any> {
  //   let url: string = this.baseUrl + "salesquotation/attachmentdetail/"+id;
  //   return this.httpHelper.get(url, null);
  // }
}
