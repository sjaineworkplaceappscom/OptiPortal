import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Router } from '@angular/router';
import { HttpHelper } from '../../helpers/http.helper';
import { AccountService } from '../../services/account.service';
import { LoginModel } from '../../models/account/login-model';
import { ApplicationState } from '../../helpers/ApplicationState';
import { Commonservice } from '../../services/commonservice.service';

import { CurrentSidebarInfo } from '../../models/sidebar/current-sidebar-info';
import { Configuration } from '../../helpers/Configuration';



@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  imgPath = Configuration.imagePath;
  showLoader: boolean = false;
  isError: boolean = false;

  invalidCredentialMsg: string = "";
  userName: string;
  password: string;
  randomstring = '';
  userNotExist: boolean = false;
  capchaText: string;
  invalidCapcha: boolean = false;

  isRemember: boolean = false;

  constructor(private httpHelper: HttpHelper, private accountService: AccountService, private router: Router, private commonService: Commonservice) { }

  @ViewChild('myCanvas') myCanvas;

  ngOnInit() {

    // Get cookie start
    if (this.getCookie('cookieEmail') != '' && this.getCookie('cookiePassword') != '') {
      this.userName = this.getCookie('cookieEmail');
      this.password = this.getCookie('cookiePassword');
    } else {
      this.userName = '';
      this.password = '';
    }
    // Get cookie end

    this.getRandomStringForCaptcha();
    this.customCaptcha(this.randomstring);

    const element = document.getElementsByTagName("body")[0];
    element.className = "";
    element.classList.add("opti_body-login");
    element.classList.add("opti_account-module");

  }

  changeEmailValue() {
    
    this.userNotExist = false;
   
  }
  newValue() {
    
  }

  public getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
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
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  changeValue() {

  }
  public async login() {
    // cookie code start
    if (this.isRemember == true) {
      this.setCookie('cookieEmail', this.userName, 365);
      this.setCookie('cookiePassword', this.password, 365);
    }
    // cookie code end

    let userId: string;

    //reset validation message variables.
    this.userNotExist = false;
    this.isError = false;

    if (this.capchaText != this.randomstring) {
      this.invalidCapcha = true;
      return;
    }
    this.invalidCapcha = false;
    this.showLoader = true;
    await this.accountService.getUserDetails(this.userName).subscribe(
      userData => {

          if (userData != undefined && userData != null && userData!='') {
            let resUserData = JSON.parse(userData);
            let resUserDataPermissions = resUserData.Permissions
            resUserData =resUserData.LoginUserDetail;
            this.userNotExist = false;
          
            let data = resUserData[0];

            userId = data.LoginUserId;
            this.generateLogintoken(userId, this.password, this.userName);
            var userPermissionArray = resUserDataPermissions.split(',');
           // console.log(userPermissionArray);
            localStorage.setItem('LoginUserDetail',JSON.stringify(resUserData));
            localStorage.setItem('LoginUserPermissions', resUserDataPermissions);
            
            //get permission array and check your according.
            var arr = localStorage.getItem('LoginUserPermissions');
            var arrrayItems:any[] = arr.split(',');
            for(let entry of arrrayItems){
                  //you will get all permission here.
            }

            var systemAdmin: any = false;

            if (data != null && data.LoginUserType == 4) {
              systemAdmin = true;
              //this.router.navigateByUrl('/approveusers')
            }
            localStorage.setItem("SystemAdmin", systemAdmin);
            //}
          }
          else {
            this.showLoader = false;
            this.userNotExist = true;
          }
        },
        error => {
          this.showLoader = false;
          alert("Something went wrong");
          console.log("Error: ", error)
        }
    );

  }

  // This is aprivate method to generate access token by using userid and pasword.
  private generateLogintoken(userId: string, password: string, email: string): any {

    let errobj: ErrorObject = new ErrorObject();
    let this1 = this;
    
    // Generate access token
    this.accountService.generateToken(userId, password, errobj).then(
      data => {

        //show loader false.
        this1.showLoader = false;
        localStorage.setItem('AccessToken', data.token);
        localStorage.setItem('LoginUserId', userId)
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

  navigateToResetPassword() {
    this.router.navigateByUrl('account/resetpassword');
  }


  customCaptcha(string) {
    let c = this.myCanvas.nativeElement;
    let ctx = c.getContext("2d");
    ctx.font = "15px Arial";
    ctx.clearRect(0, 0, 252, 144);
    ctx.fillStyle = "black";
    ctx.fillText(string, 15, 21);
  }

  getRandomStringForCaptcha() {
    let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    let string_length = 4;
    for (var i = 0; i < string_length; i++) {
      let rnum = Math.floor(Math.random() * chars.length);
      this.randomstring += chars.substring(rnum, rnum + 1);
    }
  }

  changeCaptcha() {
    this.randomstring = '';
    this.getRandomStringForCaptcha();
    this.customCaptcha(this.randomstring);
  }

  public closeRightSidebar() {
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
