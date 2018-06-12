import { Component, OnInit, ViewChild } from '@angular/core';
import { RegisterRequest } from 'src/app/models/account/register-req-model';
import { AccountService } from 'src/app/services/account.service';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { CompanyDetail } from '../../models/company/companyDetail';
import { CommonMessages } from 'src/common-messages';
import {  Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Commonservice } from '../../services/commonservice.service';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  invalidRole:boolean=false;
  invalidCapcha:boolean=false;
  showLoader:boolean=false;
  registerReq: RegisterRequest = new RegisterRequest();
  userType: number;
  isSuperAdmin: boolean = false;
  companyDetail: CompanyDetail = new CompanyDetail();
  public companyId: string = '';
  randomstring = '';
  turmsOfUse:any = null;
  capchaText:string;

  public roles: Array<{ text: string, value: string }> = [
    { text: "Please Select Role", value: '0' },
    { text: "Admin", value: '41F23977-C709-4B7C-BBEE-16A539211E9C' },
    { text: "Manager", value: 'DA427D60-7B0F-446B-AA40-40D3B7F571EA' },
    { text: "User", value: 'DA427D60-7B0F-446B-AA40-40D3B7F571EB' }
  ];

  public selectedItem: { text: string, value: string } = this.roles[0];

  @ViewChild('myCanvas') myCanvas;

  // Error Bits
  invalidCompanyId: boolean = false;

  constructor(private accountService: AccountService,private router:Router,private commonService:Commonservice,) { }

  ngOnInit() {

    this. getRandomStringForCaptcha();
    this.customCaptcha(this.randomstring);
    const element = document.getElementsByTagName("body")[0];
    element.classList.add("opti_body-signup");

    this.registerReq = new RegisterRequest();

    //var systemAdmin: any=localStorage.getItem('SystemAdmin');
    this.commonService.currentNavigatedFromValue.subscribe(
      data=> {
        this.userType=data;
      }
    )
    
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

  // Click on Login button.
  submit() {

    if(this.capchaText!=this.randomstring){
        this.invalidCapcha=true;
        return;
     }
     
    if(this.selectedItem.value==this.roles[0].value){
      this.invalidRole = true;   
      return;         
    }
    else{
      this.invalidRole=false;
    }

    this.registerReq.RequesterParentCode=this.companyId;
    this.registerReq.RequesterParentType=this.userType;    
    this.showLoader=true;
    this.accountService.registerUser(this.registerReq).subscribe(
      data => {        
        this.showLoader=false;
        alert(CommonMessages.RegistrationSuccess);      
        this.router.navigateByUrl('/login');
      },
      (err:HttpErrorResponse)=>{
        alert('Something went wrong. please check console log for more detail.');
        this.showLoader=false;
        console.log(err);
      }
    );
   
  }

  // On blur of compane id
  getCompaneyDetail() {
    
    this.companyDetail=new CompanyDetail();

    // Dummy Data.
    if (this.companyId == 'C001') {      
      this.companyDetail.CompanyName = "Samsung";
      this.companyDetail.PrimaryContactEmail = "sjain@eworkplaceapps.com";
      this.companyDetail.PrimaryContactName = "Shashank Jain";
    }
    else if (this.companyId == 'C002') {
      this.companyDetail.CompanyName = "Apple";
      this.companyDetail.PrimaryContactEmail = "rpawar@eworkplaceapps.com";
      this.companyDetail.PrimaryContactName = "Rohit Pawar";
    }
    else {      
        
    }

    // this.accountService.getCustomerByCode(this.companyId).subscribe(
    //   req => {
    //     this.companyDetail = req[0];
    //     if(this.companyDetail==null || this.companyDetail==undefined){
    //       this.invalidCompanyId=true;
    //     }
    //   }
    // )

  }
  
}
