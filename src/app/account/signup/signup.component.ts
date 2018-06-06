import { Component, OnInit, ViewChild } from '@angular/core';
import { RegisterRequest } from 'src/app/models/account/register-req-model';
import { AccountService } from 'src/app/services/account.service';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';




@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  registerReq: RegisterRequest = new RegisterRequest();
   userType:any='';
   isSuperAdmin:boolean=false;

  constructor(private accountService: AccountService) { }

  ngOnInit() {

    const element = document.getElementsByTagName("body")[0];
    element.classList.add("opti_body-signup");

    this.registerReq = new RegisterRequest();

    var systemAdmin:any=this.userType=localStorage.getItem('SystemAdmin');

  }

  submit() {
   
    //this.registerReq. = this.registerReq.email;
    this.accountService.registerUser(this.registerReq);
  }

  public roles: Array<{ text: string, value: number }> = [
    { text: "Please Select Role", value: 1 },
    { text: "Female", value: 2 },
    { text: "Other", value: 3 }
];

public role: { text: string, value: number } = { text: "Please Select Role", value: 1 };



}
