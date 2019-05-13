import { Injectable } from '@angular/core';
import { Configuration } from '../helpers/Configuration';
import { HttpHelper } from '../helpers/http.helper';
import { NotesModel } from '../models/purchaserequest/notes';
import { Observable } from 'rxjs';
import { HttpRequest, HttpHeaders, HttpClient } from '@angular/common/http';
import { SalesNoteModel } from '../tempmodels/SalesNoteModel';
import { DeliveryNoteNoteModel } from '../tempmodels/delivery-note-note-model';
import { OpenInvoicesModule } from '../open-invoices/open-invoices.module';
import { OpenInvoiceNoteModel } from '../tempmodels/open-invoice-note-model';
import { AdvanceShipmentNotesNoteModel } from '../tempmodels/advance-shipment-notes-note-model';
import { VendorNoteModel } from '../tempmodels/vendor/vendor-note-model';



@Injectable({
  providedIn: 'root'
})
export class SharedComponentService {

  baseUrl = Configuration.baseServerAPIEndpoint;

  constructor(private httpHelper: HttpHelper, private httpClient: HttpClient) {

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

  public uploadAttachment(formData: FormData): Observable<any> {

    let loginAccessToken = localStorage.getItem("AccessToken");
    let loginUserId = localStorage.getItem("LoginUserId");
    let headers = new HttpHeaders();


    headers = headers
      .set('SessionKey', loginUserId)
      .set('Authorization', 'Bearer ' + loginAccessToken);


    let req = new HttpRequest('POST', this.baseUrl + 'attachment/upload', formData, { headers });
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
    let url: string = this.baseUrl + "attachment/download/" + id;
    return this.httpHelper.get(url, null);
  }

  public getAtachmentFromPath(path: string): Observable<any> {    
    let url: string = this.baseUrl + "attachment/downloadFile/'" + path + "'";
    return this.httpHelper.get(url, null);
  }

  /**
 * Add Note.
 */
  public AddSalesQuotationNote(note: SalesNoteModel): Observable<any> {
    var data: any = {
      "Notes": note.Notes,
      "NoteType": note.NoteType,
      "EntityNumber": note.SaleNumber,
      "ParentId": note.ParentId,
      "ParentType": note.ParentType,
      "EntityOptiId": note.SalesOptiId
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
      "EntityNumber": note.SaleNumber,
      "ParentId": note.ParentId,
      "ParentType": note.ParentType,
      "EntityOptiId": note.SalesOptiId
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

  public getDeliveryNoteNotesList(id: string, type: string): Observable<any> {

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
      "EntityNumber": note.DeliveryNoteNumber,
      "ParentId": note.ParentId,
      "ParentType": note.ParentType,
      "EntityOptiId": note.DeliveryNoteOptiId
    }
    return this.httpHelper.post(this.baseUrl + 'deliverynotes/addnotes', data, null);
  }

  public getOpenInvoiceNotesList(id: string, type: string): Observable<any> {

    let url: string = this.baseUrl + "openinvoice/notelist/" + id + "/" + type;
    return this.httpHelper.get(url, null);
  }

  /**
  * Add Note.
  */
  public AddOpenInvoiceNote(note: OpenInvoiceNoteModel): Observable<any> {
    var data: any = {
      "Notes": note.Notes,
      "NoteType": note.NoteType,
      "EntityNumber": note.OpenInvoiceNoteNumber,
      "ParentId": note.ParentId,
      "ParentType": note.ParentType,
      "EntityOptiId": note.OpenInvoiceNoteOptiId
    }
    return this.httpHelper.post(this.baseUrl + 'openinvoice/addnotes', data, null);
  }

  public getASNNotesList(id: string, type: string): Observable<any> {

    let url: string = this.baseUrl + "advanceshipment/notelist/" + id + "/" + type;
    return this.httpHelper.get(url, null);
  }

  /**
  * Add Note.
  */
  public AddASNNote(note: AdvanceShipmentNotesNoteModel): Observable<any> {
    var data: any = {
      "Notes": note.Notes,
      "NoteType": note.NoteType,
      "EntityNumber": note.ASNNoteNumber,
      "ParentId": note.ParentId,
      "ParentType": note.ParentType,
      "EntityOptiId": note.ASNNoteOptiId
    }
    return this.httpHelper.post(this.baseUrl + 'advanceshipment/addnotes', data, null);
  }

  /**
   * Get List of users.
   */
  public getVendorNotesList(id: string, type: number): Observable<any> {
    let url: string = this.baseUrl + "vendorpurchaseinquiry/notelist/" + id + "/" + type;
    return this.httpHelper.get(url, null);
  }
  /**
  * Add Note.
  */
  public AddVendorNote(note: VendorNoteModel): Observable<any> {
    var data: any = {
      "Notes": note.Notes,
      "NoteType": note.NoteType,
      "EntityNumber": note.VEntityNumber,
      "ParentId": note.ParentId,
      "ParentType": note.ParentType,
      "EntityOptiId": note.VEntityOptiId
    }
    return this.httpHelper.post(this.baseUrl + 'vendorpurchaseinquiry/addnotes', data, null);
  }



  /**
    * Get List of users.
    */
  public getVendorPONotesList(id: string, type: number): Observable<any> {
    let url: string = this.baseUrl + "vendorpurchaseorder/notelist/" + id + "/" + type;
    return this.httpHelper.get(url, null);
  }
  /**
  * Add Note.
  */
  public AddVendorPONote(note: VendorNoteModel): Observable<any> {
    var data: any = {
      "Notes": note.Notes,
      "NoteType": note.NoteType,
      "EntityNumber": note.VEntityNumber,
      "ParentId": note.ParentId,
      "ParentType": note.ParentType,
      "EntityOptiId": note.VEntityOptiId
    }
    return this.httpHelper.post(this.baseUrl + 'vendorpurchaseorder/addnotes', data, null);
  }

  /**
  * Add Note.
  */
  public AddPaymentNote(note: VendorNoteModel): Observable<any> {
    var data: any = {
      "Notes": note.Notes,
      "NoteType": note.NoteType,
      "EntityNumber": note.VEntityNumber,
      "ParentId": note.ParentId,
      "ParentType": note.ParentType,
      "EntityOptiId": note.VEntityOptiId
    }
    return this.httpHelper.post(this.baseUrl + 'payment/addnotes', data, null);
  }

  /**
  * Get List of users.
  */
  public getPaymentNotesList(id: string, type: number): Observable<any> {
    let url: string = this.baseUrl + "payment/notelist/" + id + "/" + type;
    return this.httpHelper.get(url, null);
  }
}


