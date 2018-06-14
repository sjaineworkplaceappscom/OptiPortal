import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Router } from '@angular/router';
import { HttpHelper } from '../../helpers/http.helper';
import { AccountService } from '../../services/account.service';
import { LoginModel } from '../../models/account/login-model';
import { ApplicationState } from '../../helpers/ApplicationState';
import { Commonservice } from '../../services/commonservice.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  showLoader: boolean = false;
  isError: boolean = false;
  invalidCredentialMsg: string = "";
  userName: string;
  password: string;
  randomstring = '';

  constructor(private httpHelper: HttpHelper, private accountService: AccountService, private router: Router, private commonService: Commonservice) { }

  @ViewChild('myCanvas') myCanvas;

  ngOnInit() {

    this. getRandomStringForCaptcha();
    this.customCaptcha(this.randomstring);

    this.userName = '';
    this.password = '';
    

    const element = document.getElementsByTagName("body")[0];
    element.className = "";
    element.classList.add("opti_body-login");

  }

  public async login(userName: string, password: string) {
    let userId: string;
    userName = this.userName;
    password = this.password;

    await this.accountService.getUserDetails(userName).subscribe(
      userData => {
        // jsonfy response object.
        let resUserData = JSON.parse(userData);
        if (resUserData != undefined && resUserData.length > 0) {
          // // Multiteenet 
          // if (resUserData.length > 1) {
          //   ApplicationState.SharedData = resUserData;
          //   let loginModel: LoginModel = new LoginModel();
          //   loginModel.AuthData = resUserData;
          //   loginModel.Password = password;

          //   // Pass data to tennant selection component.
          //   // this.commonService.shareAuthData(loginModel);
          //   this.commonService.setAuthCurrentValue(loginModel);
          //   this.router.navigateByUrl('/tenantselection');
          // }
          // // single tenanat
          // else {
          let data = resUserData[0];

          userId = data.LoginUserId;
          this.generateLogintoken(userId, password, userName);

          localStorage.setItem('LoginUserDetail', userData);

          var systemAdmin: any = false;

          if (data != null && data.LoginUserType == 4) {
            systemAdmin = true;
          }
          localStorage.setItem("SystemAdmin", systemAdmin);
          //}
        }
      }
    );


  }

  // This is aprivate method to generate access token by using userid and pasword.
  private generateLogintoken(userId: string, password: string, email: string): any {

    let errobj: ErrorObject = new ErrorObject();
    let this1 = this;
    this.showLoader = true;
    // Generate access token
    this.accountService.generateToken(userId, password, errobj).then(
      data => {
        //show loader false.
        this1.showLoader = false;
        localStorage.setItem('AccessToken', data.access_token);

        this.router.navigateByUrl('/home');
      }
    ).catch(
      (err: HttpErrorResponse) => {
        this.isError = true;
        this1.showLoader = false;
      }
    );
  }


  navigateToSignUp(value: number) {
    // Click on Customer sign up
    if (value == 1) {
      this.commonService.setCurrentNavigatedFromData(2);
    }
    // Click on vendor sign up
    if (value == 2) {
      this.commonService.setCurrentNavigatedFromData(3);
    }
    this.router.navigateByUrl('/signup');
  }

  navigateToResetPassword(){
    this.router.navigateByUrl('/resetpassword');
  }


  customCaptcha(string){
    let c = this.myCanvas.nativeElement;
    let ctx = c.getContext("2d");
    ctx.font = "15px Arial";
    ctx.clearRect(0, 0, 252, 144);
    ctx.fillStyle = "black";
    ctx.fillText(string, 15, 21);
  }

  getRandomStringForCaptcha(){
      let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
      let string_length = 4;
      for (var i=0; i<string_length; i++) {
        let rnum = Math.floor(Math.random() * chars.length);
        this.randomstring += chars.substring(rnum,rnum+1);
      }
  }

  changeCaptcha(){
    this.randomstring = '';
    this.getRandomStringForCaptcha();
    this.customCaptcha(this.randomstring);
  }

}

export class ErrorObject {
  constructor() {
  }
  isError: boolean;
  error: any;
}
