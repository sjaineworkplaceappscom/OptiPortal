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
  
  constructor(private httpHelper:HttpHelper) { 

  }


   /**
   * Get List of users.
   */
  public getNotesList(id:string,type:number):Observable<any> {    
    let url: string = this.baseUrl + "note/list/"+id+"/"+type;
    return this.httpHelper.get(url,null);   
  }
   /**
   * Add Note.
   */
 public AddNote(note: NotesModel) {
  var data: any = {
  "notes": note.Notes,
  "noteType": note.NoteType,
  "grandParentType": note.GrandParentType,
  "parentId": note.ParentId,
  "parentType": note.ParentType,
  "grantParentId": note.GrantParentId,
  }
  debugger;
  return this.httpHelper.post(this.baseUrl + 'note/add',data,null);
  }
}