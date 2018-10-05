import { Injectable } from '@angular/core';
import { Configuration } from '../../app/helpers/Configuration';
import { HttpHelper } from '../helpers/http.helper';
import { NotesModel } from '../models/purchaserequest/notes';
import { Observable } from 'rxjs';
import { HttpRequest, HttpHeaders, HttpClient } from '@angular/common/http';
import { SalesNoteModel } from '../tempmodels/SalesNoteModel';
import { DeliveryNoteNoteModel } from '../tempmodels/delivery-note-note-model';



@Injectable({
  providedIn: 'root'
})
export class SharedComponentService {

  baseUrl = Configuration.baseServerAPIEndpoint;

  constructor(private httpHelper: HttpHelper,private httpClient:HttpClient) {

  }


  /**
  * Get List of users.
  */
  public getNotesList(id: string, type: number): Observable<any> {
    let url: string = this.baseUrl + "note/list/" + id + "/" + type;
    return this.httpHelper.get(url, null);
  }
  /**
  * Add Note.
  */
  public AddNote(note: NotesModel): Observable<any> {
    var data: any = {
      "notes": note.Notes,
      "noteType": note.NoteType,
      "grandParentType": note.GrandParentType,
      "parentId": note.ParentId,
      "parentType": note.ParentType,
      "grantParentId": note.GrantParentId,
    }
    return this.httpHelper.post(this.baseUrl + 'note/add', data, null);
  }

  public uploadAttachment(formData:FormData): Observable<any>{   
    
    let loginAccessToken = localStorage.getItem("AccessToken");
    let loginUserId = localStorage.getItem("LoginUserId");
    let  headers = new HttpHeaders();

  
    headers = headers    
    .set('SessionKey', loginUserId)
    .set('Authorization', 'Bearer ' + loginAccessToken);

    
   let req=new HttpRequest('POST',this.baseUrl+ 'attachment/upload',formData,{headers});   
   return this.httpClient.request(req);

  }

  /**
  * Delete Note of users.
  */
  public deleteNote(id: string): Observable<any> {
    let url: string = this.baseUrl + "note/delete/" + id;
    return this.httpHelper.delete(url, id, null);
  }

  /**
 * Delete Note of users.
 */
  public updateNote(note: any): Observable<any> {
    let url: string = this.baseUrl + "note/update";
    var data: any = {
      "notes": note.Notes,
      "noteId": note.NoteId,
      "noteType": note.NoteType
    }
    return this.httpHelper.put(url, data, null);
  }

  // Get Attachment List

  public getAtachmentList(id: string, type: number): Observable<any> {
    let url: string = this.baseUrl + "attachment/list/" + id + "/" + type;
    return this.httpHelper.get(url, null);
  }

  public getAtachment(id: string): Observable<any> {
    let url: string = this.baseUrl + "attachment/download/" + id ;
    return this.httpHelper.get(url, null);
  }

  public getAtachmentFromPath(path:string): Observable<any> {
    let url: string = this.baseUrl + "attachment/downloadFile/"+path+"";
    return this.httpHelper.get(url, null);
  }

   /**
  * Add Note.
  */
 public AddSalesQuotationNote(note: SalesNoteModel): Observable<any> {
  var data: any = {
    "Notes": note.Notes,
    "NoteType": note.NoteType,
    "SalesNumber": note.SaleNumber,    
    "ParentId": note.ParentId,
    "ParentType": note.ParentType,
    "SalesOptiId": note.SalesOptiId
  }
  return this.httpHelper.post(this.baseUrl + 'salesquotation/addnotes', data, null);
}

 /**
  * Get List of users.
  */
 public getSalesQuotationNotesList(id: string, type: number): Observable<any> {
  let url: string = this.baseUrl + "salesquotation/notelist/" + id + "/" + type;
  return this.httpHelper.get(url, null);
}


  /**
  * Add Note.
  */
 public AddSalesOrderNote(note: SalesNoteModel): Observable<any> {
  var data: any = {
    "Notes": note.Notes,
    "NoteType": note.NoteType,
    "SalesNumber": note.SaleNumber,    
    "ParentId": note.ParentId,
    "ParentType": note.ParentType,
    "SalesOptiId": note.SalesOptiId
  }
  return this.httpHelper.post(this.baseUrl + 'salesorder/addnotes', data, null);
}
 /**
  * Get List of users.
  */
 public getSalesOrderNotesList(id: string, type: number): Observable<any> {
  let url: string = this.baseUrl + "salesorder/notelist/" + id + "/" + type;
  return this.httpHelper.get(url, null);
}

public getDeliveryNoteNotesList(id:string,type:string): Observable<any>{
  
  let url: string = this.baseUrl + "deliverynotes/notelist/" + id + "/" + type;
  return this.httpHelper.get(url, null);
 }

  /**
  * Add Note.
  */
 public AddDeliveryNotesNote(note: DeliveryNoteNoteModel): Observable<any> {
  var data: any = {
    "Notes": note.Notes,
    "NoteType": note.NoteType,
    "SalesNumber": note.DeliveryNoteNumber,    
    "ParentId": note.ParentId,
    "ParentType": note.ParentType,
    "SalesOptiId": note.DeliveryNoteOptiId
  }
  return this.httpHelper.post(this.baseUrl + 'deliverynotes/addnotes', data, null);
}
}


