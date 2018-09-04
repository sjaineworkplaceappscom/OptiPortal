import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Router } from '@angular/router';
import { HttpHelper } from '../../helpers/http.helper';
import { AccountService } from '../../services/account.service';
import { LoginModel } from '../../models/account/login-model';
import { ApplicationState } from '../../helpers/ApplicationState';
import { Commonservice } from '../../services/commonservice.service';
import { Configuration } from '../../../assets/configuration';
import { CurrentSidebarInfo } from '../../models/sidebar/current-sidebar-info';



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
  userNotExist:boolean=false;
  capchaText: string;
  invalidCapcha:boolean=false;
  
  isRemember:boolean = false;
  
  constructor(private httpHelper: HttpHelper, private accountService: AccountService, private router: Router, private commonService: Commonservice) { }

  @ViewChild('myCanvas') myCanvas;

  ngOnInit() {

    // Get cookie start
    if(this.getCookie('cookieEmail') != '' && this.getCookie('cookiePassword') != ''){
      this.userName = this.getCookie('cookieEmail');
      this.password = this.getCookie('cookiePassword');
    }else{
      this.userName = '';
      this.password = '';
    }
    // Get cookie end

    this. getRandomStringForCaptcha();
    this.customCaptcha(this.randomstring);
        
    const element = document.getElementsByTagName("body")[0];
    element.className = "";
    element.classList.add("opti_body-login");
    element.classList.add("opti_account-module");

  }

  changeValue() {
    this.invalidCapcha = false;
    //console.log("change boolean: " + this.invalidCapcha);
  }
  
  public getCookie(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(';');
      for(var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
              c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
              return c.substring(name.length, c.length);
          }
      }
      return "";
  }

  public setCookie(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      var expires = "expires="+d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  public async login() {
debugger;
    // cookie code start
    if(this.isRemember == true){
      this.setCookie('cookieEmail', this.userName, 365);
      this.setCookie('cookiePassword', this.password, 365);
    }
    // cookie code end

    let userId: string;
    
    //reset validation message variables.
    this.userNotExist=false;
    this.isError=false;

    if (this.capchaText != this.randomstring) {
      this.invalidCapcha = true;
      return;
    }

    await this.accountService.getUserDetails(this.userName).subscribe(
      userData => {
        // jsonfy response object.
        let resUserData = JSON.parse(userData);

        if (resUserData != undefined && resUserData.length > 0) {
          
          this.userNotExist=false;
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
          this.generateLogintoken(userId, this.password, this.userName);

          localStorage.setItem('LoginUserDetail', userData);

          var systemAdmin: any = false;

          if (data != null && data.LoginUserType == 4) {
            systemAdmin = true;
            //this.router.navigateByUrl('/approveusers')
          }
          localStorage.setItem("SystemAdmin", systemAdmin);
          //}
        }
        else{
          this.userNotExist=true;
        }
      },
      error => {
        this.showLoader=false;
        alert("Something went wrong");
        console.log("Error: ", error)
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
        localStorage.setItem('AccessToken', data.token);
        localStorage.setItem('LoginUserId',userId)
        // Cloase side bar.
        this.closeRightSidebar();
        this.router.navigateByUrl(Configuration.firstHomePage);
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
    this.router.navigateByUrl('account/signup');
  }

  navigateToResetPassword(){
    this.router.navigateByUrl('account/resetpassword');
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

  public  closeRightSidebar() {
    let currentSidebarInfo: CurrentSidebarInfo = new CurrentSidebarInfo();
    currentSidebarInfo.SideBarStatus = false;
    this.commonService.setCurrentSideBar(currentSidebarInfo);
  }

}

export class ErrorObject {
  constructor() {
  }
  isError: boolean;
  error: any;
}
