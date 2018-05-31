import { Component, OnInit } from '@angular/core';
import { RegisterRequest } from 'src/app/models/account/register-req-model';
import { AccountService } from 'src/app/services/account.service';



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
    this.registerReq = new RegisterRequest();

    var systemAdmin:any=this.userType=localStorage.getItem('SystemAdmin');

  }

  submit() {
   
    //this.registerReq. = this.registerReq.email;
    this.accountService.registerUser(this.registerReq);
  }

}
