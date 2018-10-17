import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  email:string;
  showLoader:boolean=false;
  constructor(private accountService:AccountService) { }

  ngOnInit() {
    const element = document.getElementsByTagName("body")[0];
    element.className = "";
    element.classList.add("opti_body-reset-password");
    element.classList.add("opti_account-module");
  }

  resetPassword(){
    this.accountService.sendResetPasswordLink(this.email).subscribe(
      data=> {
         if(data==true)       {
           alert('We have sent reset password link to your email address ('+this.email+'), please check.');
         }
      },
      error => {
        this.showLoader=false;
        //alert("Something went wrong");
        console.log("Error: ", error)
      }
    )

  
  }

}
