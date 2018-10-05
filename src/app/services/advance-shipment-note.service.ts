import { Injectable } from '@angular/core';
import { HttpHelper } from '../helpers/http.helper';
import { Observable } from '../../../node_modules/rxjs';
import { Configuration } from '../../assets/configuration';

@Injectable({
  providedIn: 'root'
})
export class AdvanceShipmentNoteService {

  
  baseUrl = Configuration.baseServerAPIEndpoint;
  constructor(private httpHelper: HttpHelper) { }

   /**
   * get Sales Quotation list data from server.
   */
  public getAdvanceShipmentNotesList(): Observable<any> {
    let url: string = this.baseUrl + "salesquotation/list";
    return this.httpHelper.get(url, null);
    //return null;
  }

  /**
   * getSalesQuotationDetail from server.
   */
  public getAdvanceShipmentNotesDetail(id:number,type:number): Observable<any> {
    let url: string = this.baseUrl + "salesquotation/detail/"+id+"/"+type;
    return this.httpHelper.get(url, null);
  }

  /**
   * getSalesQuotationDetail from server.
   */
  public getAdvanceShipmentNotesContentDetail(id:number): Observable<any> {
    let url: string = this.baseUrl + "salesquotation/contentdetail/"+id;
    return this.httpHelper.get(url, null);
  }

    /**
   * getSalesQuotationDetail from server.
   */
  public getAdvanceShipmentNotesAttachmentDetail(id:number): Observable<any> {
    let url: string = this.baseUrl + "salesquotation/attachmentdetail/"+id;
    return this.httpHelper.get(url, null);
  }
}
