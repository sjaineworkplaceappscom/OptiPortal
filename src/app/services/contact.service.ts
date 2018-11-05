import { Injectable } from '@angular/core';
import { Configuration } from '../helpers/Configuration';
import { HttpHelper } from '../helpers/http.helper';
import { Observable } from 'rxjs';
import { ContactModel } from '../tempmodels/contact-model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  baseUrl = Configuration.baseServerAPIEndpoint;
  constructor(private httpHelper: HttpHelper) { }

   /**
   * get Customer Contract list data from server.
   */
  public getCustomerContactList(): Observable<any> {
    let url: string = this.baseUrl + "contact/list";
    return this.httpHelper.get(url, null);
  }

   /**
  * Add Note.
  */
 public AddContact(contactModel: ContactModel): Observable<any> {
  
  var data: any = {
    
    "ContactName": contactModel.ContactName,
    "ContactEmail": contactModel.ContactEmail,
    "Address": contactModel.Address,
    "Status": contactModel.Status,
    "PhoneNumber": contactModel.PhoneNumber,
    
  }
  return this.httpHelper.post(this.baseUrl + 'contact/add', data, null);
}

 /**
* Get List of users.
*/
  public getContactDetail(contactId: string): Observable<any> {
    let url: string = this.baseUrl + "contact/detail/" + contactId;
    return this.httpHelper.get(url, null);
  }

  /**
  * UpdateContact
  */
 public UpdateContact(contactModel: ContactModel) {
  var contactUpdate: any = {
    "ContactId": contactModel.ContactId,
    "ContactName": contactModel.ContactName,
    "ContactEmail": contactModel.ContactEmail,
    "Address": contactModel.Address,
    "Status": contactModel.Status,
    "PhoneNumber": contactModel.PhoneNumber,
  }
  return this.httpHelper.put(this.baseUrl + 'contact/update', contactUpdate, null);
}
} 
