import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Commonservice } from 'src/app/services/commonservice.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(private router: Router, private commonService: Commonservice) { }

  ngOnInit() {
    const element = document.getElementsByTagName("body")[0];
    element.className = "";
    element.classList.add("opti_body-landingpage");
    element.classList.add("opti_account-module");
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
    this.router.navigateByUrl('/signup');
  }

  navigateToSignIn(){
    this.router.navigateByUrl('/login');
  }

}
