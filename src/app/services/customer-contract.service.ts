import { Injectable } from '@angular/core';
import { Configuration } from '../helpers/Configuration';
import { HttpHelper } from '../helpers/http.helper';
import { Observable } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerContractService {

  baseUrl = Configuration.baseServerAPIEndpoint;
  constructor(private httpHelper: HttpHelper) { }

   /**
   * get Customer Contract list data from server.
   */
  public getCustomerContractList(): Observable<any> {
    let url: string = this.baseUrl + "customercontract/list";
    return this.httpHelper.get(url, null);
    //return null;
  }
}
