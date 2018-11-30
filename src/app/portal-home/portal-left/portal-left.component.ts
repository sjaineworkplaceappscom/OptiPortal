import { Component, OnInit } from '@angular/core';
import { Commonservice } from '../../services/commonservice.service';
import { Router } from '@angular/router';
import { opticonstants } from '../../constants';
import { CurrentSidebarInfo } from '../../models/sidebar/current-sidebar-info';

import { GlobalResource } from '../../helpers/global-resource';
import { ConfirmDialog } from '../../helpers/services/dialog.service';
import { Configuration } from '../../helpers/Configuration';
// import { UIHelper } from '../../helpers/ui.helpers';
import * as $ from "jquery";

@Component({
  selector: 'app-portal-left',
  templateUrl: './portal-left.component.html',
  styleUrls: ['./portal-left.component.scss']
})
export class PortalLeftComponent implements OnInit {
  imgPath = Configuration.imagePath;
  systemAdmin: string;
  constructor(private commonService: Commonservice, private router: Router,private confirmService:ConfirmDialog) { }
  selectedThemeColor: string = 'opticonstants.DEFAULTTHEMECOLOR';
  userType: number = 2;

  selectedItem: string;

  fruits = ["Banana", "Orange", "Apple", "Mango"];
  userPermission: any = [];

  ngOnInit() {

    if (typeof (Storage) !== "undefined") {
      let arr = localStorage.getItem('LoginUserPermissions');
      this.userPermission = arr.split(','); 
      // split, convert string into array string and return new array
    }

    this.commonService.currentSelectedItem.subscribe(
      data=> {
        if(data!=null && data!=undefined){
            this.selectedItem=data;
        }
      }
    )
    
    this.commonService.currentNavigatedFromValue.subscribe(
      data => {
        this.userType = data;       
      },
      error => {       
        console.log("Error: ", error)
      }
    );


    // get current url with last word
    let partsOfUrl = this.router.url.split('/');
    this.selectedItem = partsOfUrl[partsOfUrl.length - 1];

    this.systemAdmin = localStorage.getItem('SystemAdmin');
    let userDetails:any=JSON.parse(localStorage.getItem('LoginUserDetail'));

    this.userType =userDetails[0].LoginUserType;

    this.commonService.themeCurrentData.subscribe(
      data => {
        this.selectedThemeColor = data;
      }
    );

    if (this.systemAdmin == 'true') {
      this.navigate();
    }
  }

  ngOnChange() {
  }

  navigate() {
    //this.router.navigateByUrl('/approve');
    this.commonService.setNavigatedData(true);
  }


 async listClick(event, module) {
  if(this.selectedItem != module){
    $('.opti_left-nav-ul li').removeClass('active');

    // Check for unsaved data.
    // if (GlobalResource.leaveUnsavedDataConfirmation() == false) {
    //   return;
    // }

     // Check for dirty confirmation from
     let a: boolean = await this.confirmService.leaveUnsavedDataConfirmation();
     if (a == false) {
       return;
     }

    this.selectedItem = module;
     

    //if(module!='purchaseinquiry'){
    this.closeRightSidebar();

    this.resetLocalStorage(module);
    //}
    

    if(this.userType==2){
      this.router.navigate(['home/' + module]);

    }else if(this.userType==3){
      this.router.navigate(['home/vendor/' + module]);
    }else{

    }

  }
    
  }

  closeRightSidebar() {
    let currentSidebarInfo: CurrentSidebarInfo = new CurrentSidebarInfo();
    currentSidebarInfo.SideBarStatus = false;
    this.commonService.setCurrentSideBar(currentSidebarInfo);
  }

  public resetLocalStorage(module: string) {
    if (module !== 'purchaseinquiry') {
      //clear purchase inquiry item from local storage.
      localStorage.removeItem('SelectedPurchaseInquery');
      localStorage.removeItem('PurchaseinqueryId');

    }
  }


}
