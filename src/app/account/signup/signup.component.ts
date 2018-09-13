import { Component, OnInit, ViewChild } from '@angular/core';
import { RegisterRequest } from '../../models/account/register-req-model';
import { AccountService } from '../../services/account.service';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { CompanyDetail } from '../../models/company/companyDetail';
import { CommonMessages } from '../../../common-messages';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Commonservice } from '../../services/commonservice.service';
import { PurchaseInquiryItemModel } from '../../models/purchaserequest/purchase-inquiry-item';
import { NotesModel } from '../../models/purchaserequest/notes';
import { PurchaseInquiryModel } from '../../models/purchaserequest/purchase-inquiry';
import { Jsonp } from '@angular/http';




@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  invalidRole: boolean = false;
  invalidCapcha: boolean = false;
  showLoader: boolean = false;
  registerReq: RegisterRequest = new RegisterRequest();
  userType: number = 2;
  isSuperAdmin: boolean = false;
  companyDetail: CompanyDetail = new CompanyDetail();
  public companyId: string = '';
  randomstring = '';
  turmsOfUse: any = null;
  capchaText: string;
  emailRegex: string = "/^(([^[]()[\]\\.,;:\s@\"]+(\.[^[]()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/";
  // public roles: Array<{ text: string, value: string }> = [
  //   { text: "Please Select Role", value: '0' },
  //   { text: "Admin", value: '41F23977-C709-4B7C-BBEE-16A539211E9C' },
  //   { text: "Manager", value: 'DA427D60-7B0F-446B-AA40-40D3B7F571EA' },
  //   { text: "User", value: 'DA427D60-7B0F-446B-AA40-40D3B7F571EB' }
  // ];
  public roles: Array<{ text: string,value:string }> = [{ text: "Please Select Role", value: '0' }];
 
  public selectedItem: { text: string, value: string } = this.roles[0];
  public isEnableRole: boolean = false;

  public emailAlredayExists: boolean = false;
  @ViewChild('myCanvas') myCanvas;

  // Error Bits
  invalidCompanyId: boolean = false;

  UserRegData: string = '';

  constructor(private accountService: AccountService, private router: Router, private commonService: Commonservice, ) {
    //this.generatePurchaseRequestData();
  }

  ngOnInit() {

    this.getRandomStringForCaptcha();
    this.customCaptcha(this.randomstring);

    const element = document.getElementsByTagName("body")[0];
    element.className = "";
    element.classList.add("opti_body-signup");
    element.classList.add("opti_account-module");

    this.registerReq = new RegisterRequest();

    // let localUsreType: any = localStorage.getItem("UserType");
    // if (localUsreType == null || localUsreType == undefined) {

    // }
    // else {
    //   this.userType = parseInt(localUsreType);
    // }

    //var systemAdmin: any=localStorage.getItem('SystemAdmin');
    this.commonService.currentNavigatedFromValue.subscribe(
      data => {
        this.userType = data;
        //localStorage.setItem("UserType", this.userType.toString());
      },
      error => {
        this.showLoader = false;
        alert("Something went wrong");
        console.log("Error: ", error)
      }
    );

    // pass data from landing to signup (customer user)
    this.commonService.getcustomerUserDataSub.subscribe(
      data => {
        this.UserRegData = data;
      }
    );

    console.log(this.UserRegData);


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

  // Click on Login button.
  submit() {
    
    if (this.capchaText != this.randomstring) {
      this.invalidCapcha = true;
      return;
    }

    if (this.selectedItem.value == this.roles[0].value) {
      this.invalidRole = true;
      return;
    }
    else {
      this.invalidRole = false;
    }
    this.registerReq.CustomerCode = this.companyDetail.CustomerCode;
    this.registerReq.CustomerName = this.companyDetail.CustomerName;
    this.registerReq.CustomerWebsite = this.companyDetail.CustomerWebsite;
    this.registerReq.PrimaryContactEmail = this.companyDetail.PrimaryContactEmail;
    this.registerReq.PrimaryContactPhone = this.companyDetail.PrimaryContactPhone;
    this.registerReq.PrimaryContactName = this.companyDetail.PrimaryContactName;
    this.registerReq.RequesterParentCode = this.companyId;
    this.registerReq.RequesterParentType = this.userType;
    this.registerReq.RequesterRole = this.selectedItem.value;
    this.showLoader = true;
    
    this.accountService.registerUser(this.registerReq).subscribe(

      data => {
        this.showLoader = false;
        alert(CommonMessages.RegistrationSuccess);
        this.router.navigateByUrl('/login');
        this.emailAlredayExists = false;
      },
      (err: HttpErrorResponse) => {
        console.log(err);
        if (err.toString() == "Given email alreday exists.") {
          this.showLoader = false;
          this.emailAlredayExists = true;
        }
        else {

          alert('Something went wrong. please check console log for more detail.');
          this.showLoader = false;
          console.log(err);
        }
      },
      () => {
        this.emailAlredayExists = false;
      }
    );

  }

  changeValue() {
    this.invalidCapcha = false;
    //console.log("change boolean: " + this.invalidCapcha);
  }

  // On blur of compane id
  getCompaneyDetail() {
    
    if (this.companyId == null || this.companyId == '') {
      return null;
    }
    
    this.companyDetail = new CompanyDetail();

    if (this.userType == 2) {
      this.showLoader = true;
      this.accountService.getCustomerByCode(this.companyId).subscribe(
        (req: any) => {
          
          req = JSON.parse(req, null);
          this.showLoader = false;
          this.companyDetail = req.CustomerInfo[0];
          this.companyDetail.CustomerCode = this.companyId;
          let rolesArray: any[] = req.CustomerRoles;
          this.roles = [{ text: "Please Select Role", value: '0' }]
          for (var v in rolesArray) // for acts as a foreach  
          {   
            this.roles.push({text: rolesArray[v].Roles, value: rolesArray[v].Roles});  
          }  
          console.log(this.roles); 
          if(this.roles.length>1){this.isEnableRole = true;}
          this.invalidCompanyId = false;
          if (this.companyDetail == null || this.companyDetail == undefined) {
            this.invalidCompanyId = true;
            this.companyDetail = new CompanyDetail();
          }
        }
        ,
        (err: HttpErrorResponse) => {
          alert('Something went wrong. please check console log for more detail.');
          this.showLoader = false;
          this.invalidCompanyId = false;
          console.log(err);
        }
      );

    }
    else if (this.userType == 3) {
      this.showLoader = true;
      this.accountService.getVendorByCode(this.companyId).subscribe(
        (req: any) => {
          req = JSON.parse(req, null);
          this.showLoader = false;
          this.companyDetail = req[0];
          this.invalidCompanyId = false;
          if (this.companyDetail == null || this.companyDetail == undefined) {
            this.invalidCompanyId = true;
          }
        }
        ,
        (err: HttpErrorResponse) => {
          alert('Something went wrong. please check console log for more detail.');
          this.showLoader = false;
          this.invalidCompanyId = false;
          console.log(err);
        }  
      ); 
    }
  }

}
