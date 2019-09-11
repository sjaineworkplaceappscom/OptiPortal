import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Commonservice } from '../../services/commonservice.service';
import { Configuration } from '../../helpers/Configuration';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  imgPath = Configuration.imagePath;

  constructor(private router: Router, private commonService: Commonservice,private translate: TranslateService) {
    translate.use(localStorage.getItem('appLanguage'));
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
    });
   }

  ngOnInit() {
    const element = document.getElementsByTagName("body")[0];
    element.className = "";
    element.classList.add("opti_body-landingpage");
    element.classList.add("opti_account-module");
  }

  navigateToSignUp(value: number) {
    // Click on Customer sign up
    if (value == 1) {
      this.commonService.passCustomerUserDataToSignup('customersignup'); // Reset variable for user registration
      this.commonService.setCurrentNavigatedFromData(2);
    }
    // Click on vendor sign up
    if (value == 2) {
      this.commonService.passCustomerUserDataToSignup('vendorsignup'); // Reset variable for user registration
      this.commonService.setCurrentNavigatedFromData(3);
    }
    // Click on user signup
    if(value==3){
      this.commonService.passCustomerUserDataToSignup('usersignup');
    }
    this.router.navigateByUrl('account/signup');
  }

  navigateToSignIn(){
    this.router.navigateByUrl('account/login');
  }

}
