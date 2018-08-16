import { Injectable } from '@angular/core';
import { Configuration } from '../../assets/configuration';
import { HttpHelper } from '../helpers/http.helper';
import { NotesModel } from '../models/purchaserequest/notes';
import { Observable } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedComponentService {

  baseUrl = Configuration.baseServerAPIEndpoint;

  constructor(private httpHelper: HttpHelper) {

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
      //"grandParentType": note.GrandParentType,
      "parentId": note.ParentId,
      "parentType": note.ParentType,
      // "grantParentId": note.GrantParentId,
    }
    return this.httpHelper.post(this.baseUrl + 'note/add', data, null);
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
  public updateNote(note: NotesModel): Observable<any> {
    let url: string = this.baseUrl + "note/update";
    var data: any = {
    "notes": note.Notes,
    "noteId": note.NoteId,
    "noteType": note.NoteType}
    return this.httpHelper.put(url, data, null);
  }
}


