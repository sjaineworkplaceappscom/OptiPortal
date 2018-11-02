import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-vendor-dashboard',
  templateUrl: './vendor-dashboard.component.html',
  styleUrls: ['./vendor-dashboard.component.scss']
})
export class VendorDashboardComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  pillist(){
    this.router.navigate(['home/vendor/vpinquery/list']);
  }

}
