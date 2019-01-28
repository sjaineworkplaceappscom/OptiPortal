import { Injectable } from '@angular/core';
import { Configuration } from '../helpers/Configuration';
import { HttpHelper } from '../helpers/http.helper';
import { Observable } from 'rxjs';
import { ConsignedInventoryModel } from '../models/ConsignedInventoryModel';

@Injectable({
  providedIn: 'root'
})
export class ConsignedInventoryService {

  baseUrl = Configuration.baseServerAPIEndpoint;
  constructor(private httpHelper: HttpHelper) { }


  /**
   * get Consigned Inventory list data from server.
   */
  public getConsignedInventoryMasterList(): Observable<any> {
    let url: string = this.baseUrl + "consignedinventory/master/list";
    return this.httpHelper.get(url, null);
  } 

  /**
   * get Consigned Inventory list data from server.
   */
  public getConsignedInventoryChildList(model:ConsignedInventoryModel,type:string): Observable<any> {
    let url: string = this.baseUrl + "consignedinventory/child/list";//+model.Item+"/"+model.WareHouse+"/"+model.Bin+"/"+type;
    return this.httpHelper.put(url,model, null);
  } 

  /**
   * get serial batch detail data from server.
   */
  public getSerialBatchDetail(): Observable<any> {
    let url: string = this.baseUrl + "consignedinventory/serialbatch";
    return this.httpHelper.get(url, null);
  } 

  /**
   * get serial batch detail data from server.
   */
  public getSerialBatchDetails(item:string,warehouse:string,bin:string,type:string): Observable<any> {
    let url: string = this.baseUrl +"consignedinventory/child/list/"+item+"/"+warehouse+"/"+bin+"/"+type;
    return this.httpHelper.get(url, null);
  } 
  /**
   * get Inventory detail data from server.
   */
  public getInventoryDetail(): Observable<any> {
    let url: string = this.baseUrl + "getserialbatch/list";
    return this.httpHelper.get(url, null);
  } 
}
