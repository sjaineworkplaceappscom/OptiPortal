import { Injectable } from '@angular/core';
import { HttpHelper } from '../helpers/http.helper';
import { Observable } from 'rxjs';
import { Configuration } from '../../assets/configuration';

@Injectable({
  providedIn: 'root'
})
export class SalesOrderService {

  baseUrl = Configuration.baseServerAPIEndpoint;
  constructor(private httpHelper: HttpHelper) { }

  public getSalesQuotationList(): Observable<any> {
    let url: string = this.baseUrl + "methodName";
    this.httpHelper.get(url, null);
    return null;
  }

}
