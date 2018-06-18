//===============================================================================
// © 2018 Optipro.  All rights reserved.
// Original Author: Shashank Jain
// Original Date: 10 March 2018
//==============================================================================

import { Injectable } from '@angular/core';
import { HttpHelper } from '../helpers/http.helper';
import { Router } from '@angular/router';
import { opticonstants } from '../constants';
import { RegisterRequest } from '../models/account/register-req-model';
import { UpdateCredentialModel } from '../models/account/update-credential-req-model';
import { UserModel } from '../models/account/user-model';
import { HttpHeaders } from '@angular/common/http';
import { ErrorObject } from '../models/error/error-object';
import { environment } from '../../environments/environment';
import { CommonMessages } from '../../common-messages';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = environment.baseServerAPIEndpoint;

  constructor(private httpHelper: HttpHelper, private router: Router) { }

  // Register user.
  public registerUser(registerRequest: RegisterRequest):Observable<any> {
    let url: string = this.baseUrl + "account/register";
    
   return this.httpHelper.post(url, registerRequest, null, true);   

  }

  // reset user password.
  public resetPassword(userName: string, newPassword: string):Observable<any> {
    let url: string = this.baseUrl + "account/resetpassword";
    let updateCredential: UpdateCredentialModel = new UpdateCredentialModel();
    updateCredential.userName = userName;
    updateCredential.newPassword = newPassword;

   return this.httpHelper.post(url, updateCredential, null, true);

  }

  // set user password.
  public setPassword(userModel: UserModel):Observable<any> {
    let url: string = this.baseUrl + "account/setpassword";

    return this.httpHelper.post(url, userModel, null, true);

  }

  // change user password.
  public changePassword(userName: string, oldPassword: string, newPassword: string) {
    let url: string = this.baseUrl + "account/changepassword";
    let updateCredential: UpdateCredentialModel = new UpdateCredentialModel();
    updateCredential.userName = userName;
    updateCredential.newPassword = newPassword;
    updateCredential.oldPassword = oldPassword;

    this.httpHelper.post(url, updateCredential, null, true).subscribe(
      data => {
        alert('We have sent you reset password link on your registered email id');

        this.router.navigateByUrl('/login');

      }
    )

  }


  // Login/Generat euser token.
  public async generateToken(userName: string, password: string, errobj: ErrorObject): Promise<any> {
    let error: boolean = false;
    let data: string = "username=" + userName + "&password=" + password + "&grant_type=password";
    let reqHeaders = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return await this.httpHelper.post<any>(this.baseUrl + 'token', data, reqHeaders, false).toPromise();

  }

  // Get login user detail  
  public getUserDetails(userName: string): any {
    let error: boolean = false;
    let data: string = userName;

    return this.httpHelper.put<Array<any>>(this.baseUrl + 'user/loginuser', data, null);
  }

  // Invite users 
  public inviteUsers(userEmails: string):Observable<any> {
    let error: boolean = false;
    let data: string = userEmails

    return this.httpHelper.put<Array<any>>(this.baseUrl + 'user/invite', data, null);


  }

  // Invite users 
  public rejectUsers(userEmails: string):Observable<any> {
    let error: boolean = false;
    let data: string = userEmails

    return this.httpHelper.put<Array<any>>(this.baseUrl + 'user/reject', data, null)

  }

  public getInactiveUsers() {
    return this.httpHelper.get(this.baseUrl + 'user/list/inactive', null);
  }

  public getInvitedUsers() {
    return this.httpHelper.get(this.baseUrl + 'user/list/invited', null);
  }

  public getCustomerByCode(code:string){
    return this.httpHelper.get(this.baseUrl + 'customer/'+code,null,true);
  }

  public sendResetPasswordLink(email:string){
    return this.httpHelper.put(this.baseUrl + 'user/sendresetpasswordlink',email,null);
  }

}
