import { Component, OnInit, ViewChild } from '@angular/core';
import { RegisterRequest } from 'src/app/models/account/register-req-model';
import { AccountService } from 'src/app/services/account.service';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { CompanyDetail } from '../../models/company/companyDetail';




@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  registerReq: RegisterRequest = new RegisterRequest();
  userType: any = '';
  isSuperAdmin: boolean = false;
  companyDetail: CompanyDetail = new CompanyDetail();

  randomstring = '';
  @ViewChild('myCanvas') myCanvas;

  // Error Bits
  invalidCompanyId: boolean = false;

  public CompanyId: string = '';

  constructor(private accountService: AccountService) { }


  ngOnInit() {
    this. getRandomStringForCaptcha();
    this.customCaptcha(this.randomstring);
    const element = document.getElementsByTagName("body")[0];
    element.classList.add("opti_body-signup");

    this.registerReq = new RegisterRequest();

    var systemAdmin: any = this.userType = localStorage.getItem('SystemAdmin');

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

  submit() {
    //this.registerReq. = this.registerReq.email;
    this.registerReq.RequesterParentCode=this.CompanyId;
    this.registerReq.RequesterParentType=2;    
    this.accountService.registerUser(this.registerReq);
  }

  getCompaneyDetail() {
    this.invalidCompanyId=false;
    this.companyDetail=new CompanyDetail();
    // Dummy Data.
    if (this.CompanyId == 'C001') {      
      this.companyDetail.CompanyName = "Samsung";
      this.companyDetail.PrimaryContactEmail = "sjain@eworkplaceapps.com";
      this.companyDetail.PrimaryContactName = "Shashank Jain";
    }
    else if (this.CompanyId == 'C002') {
      this.companyDetail.CompanyName = "Apple";
      this.companyDetail.PrimaryContactEmail = "rpawar@eworkplaceapps.com";
      this.companyDetail.PrimaryContactName = "Rohit Pawar";
    }
    else {
      
        this.invalidCompanyId=true;
    }

    // this.accountService.getCustomerByCode(this.CompanyId).subscribe(
    //   req => {
    //     this.companyDetail = req[0];
    //     if(this.companyDetail==null || this.companyDetail==undefined){
    //       this.invalidCompanyId=true;
    //     }
    //   }
    // )

  }

  public roles: Array<{ text: string, value: string }> = [
    { text: "Please Select Role", value: '0' },
    { text: "Admin", value: '41F23977-C709-4B7C-BBEE-16A539211E9C' },
    { text: "Manager", value: 'DA427D60-7B0F-446B-AA40-40D3B7F571EA' },
    { text: "User", value: 'DA427D60-7B0F-446B-AA40-40D3B7F571EB' }
  ];

  public role: { text: string, value: string } = { text: "Please Select Role", value: '0' };



}
