import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { UserModel } from 'src/app/models/account/user-model';


@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss']
})
export class SetPasswordComponent implements OnInit {
  userId: string;
  userLoginEmail: string;
  userModel: UserModel = new UserModel();
  constructor(private route: ActivatedRoute, private accountService: AccountService) { }

  ngOnInit() {

    const element = document.getElementsByTagName("body")[0];
    element.classList.add("opti_body-set-password");

    this.route.queryParams.subscribe(
      param => {
        //this.userId=param['userId'];
        this.userLoginEmail = param['userLoginEmail'];
        this.userId = param['userId'];

      }
    );
  }
 
  setPassword() {
    this.userModel.UserName = this.userId;
    this.userModel.Email = this.userLoginEmail;
    this.accountService.setPassword(this.userModel);
  }


}
