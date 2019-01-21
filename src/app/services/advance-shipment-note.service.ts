import { Injectable } from '@angular/core';
import { HttpHelper } from '../helpers/http.helper';
import { Observable } from 'rxjs';
import { Configuration } from '../helpers/Configuration';

@Injectable({
  providedIn: 'root'
})
export class AdvanceShipmentNoteService {

  
  baseUrl = Configuration.baseServerAPIEndpoint;
  constructor(private httpHelper: HttpHelper) { }

   /**
   * get advance shipment list data from server.
   */
  public getAdvanceShipmentNotesList(): Observable<any> {
    let url: string = this.baseUrl + "advanceshipment/list";
    return this.httpHelper.get(url, null);
    //return null;
  } 

 
}
