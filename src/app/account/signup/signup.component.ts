import { Component, OnInit, ViewChild } from '@angular/core';
import { RegisterRequest } from 'src/app/models/account/register-req-model';
import { AccountService } from 'src/app/services/account.service';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { CompanyDetail } from '../../models/company/companyDetail';
import { CommonMessages } from 'src/common-messages';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Commonservice } from '../../services/commonservice.service';
import { PurchaseInquiryItemModel } from '../../models/purchaserequest/purchase-inquiry-item';
import { NotesModel } from '../../models/purchaserequest/notes';
import { PurchaseInquiryModel } from '../../models/purchaserequest/purchase-inquiry';
import { Jsonp } from '@angular/http';




@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  invalidRole: boolean = false;
  invalidCapcha: boolean = false;
  showLoader: boolean = false;
  registerReq: RegisterRequest = new RegisterRequest();
  userType: number = 2;
  isSuperAdmin: boolean = false;
  companyDetail: CompanyDetail = new CompanyDetail();
  public companyId: string = '';
  randomstring = '';
  turmsOfUse: any = null;
  capchaText: string;
  emailRegex: string = "/^(([^[]()[\]\\.,;:\s@\"]+(\.[^[]()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/";
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

  constructor(private accountService: AccountService, private router: Router, private commonService: Commonservice, ) {
    //this.generatePurchaseRequestData();
  }

  ngOnInit() {

    this.getRandomStringForCaptcha();
    this.customCaptcha(this.randomstring);

    const element = document.getElementsByTagName("body")[0];
    element.className = "";
    element.classList.add("opti_body-signup");
    element.classList.add("opti_account-module");

    this.registerReq = new RegisterRequest();

    // let localUsreType: any = localStorage.getItem("UserType");
    // if (localUsreType == null || localUsreType == undefined) {

    // }
    // else {
    //   this.userType = parseInt(localUsreType);
    // }

    //var systemAdmin: any=localStorage.getItem('SystemAdmin');
    this.commonService.currentNavigatedFromValue.subscribe(
      data => {
        this.userType = data;
       //localStorage.setItem("UserType", this.userType.toString());
      }
    )

  }

  customCaptcha(string) {
    let c = this.myCanvas.nativeElement;
    let ctx = c.getContext("2d");
    ctx.font = "15px Arial";
    ctx.clearRect(0, 0, 252, 144);
    ctx.fillStyle = "black";

    ctx.fillText(string, 15, 21);
  }
  getRandomStringForCaptcha() {
    let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    let string_length = 4;
    for (var i = 0; i < string_length; i++) {
      let rnum = Math.floor(Math.random() * chars.length);
      this.randomstring += chars.substring(rnum, rnum + 1);
    }
  }

  changeCaptcha() {
    this.randomstring = '';
    this.getRandomStringForCaptcha();
    this.customCaptcha(this.randomstring);
  }

  // Click on Login button.
  submit() {

    if (this.capchaText != this.randomstring) {
      this.invalidCapcha = true;
      return;
    }

    if (this.selectedItem.value == this.roles[0].value) {
      this.invalidRole = true;
      return;
    }
    else {
      this.invalidRole = false;
    }

    this.registerReq.RequesterParentCode = this.companyId;
    this.registerReq.RequesterParentType = this.userType;
    this.showLoader = true;
    this.accountService.registerUser(this.registerReq).subscribe(
      data => {
        this.showLoader = false;
        alert(CommonMessages.RegistrationSuccess);
        this.router.navigateByUrl('/login');
      },
      (err: HttpErrorResponse) => {
        alert('Something went wrong. please check console log for more detail.');
        this.showLoader = false;
        console.log(err);
      }
    );

  }

  changeValue() {
    this.invalidCapcha = false;
    console.log("change boolean: " + this.invalidCapcha);
  }

  // On blur of compane id
  getCompaneyDetail() {
    if (this.companyId == null || this.companyId == '') {
      return null;
    }

    this.companyDetail = new CompanyDetail();

    if (this.userType == 2) {
      this.showLoader = true;
      this.accountService.getCustomerByCode(this.companyId).subscribe(
        (req: any) => {
          req = JSON.parse(req, null);
          this.showLoader = false;
          this.companyDetail = req[0];
          if (this.companyDetail == null || this.companyDetail == undefined) {
            this.invalidCompanyId = true;
          }
        }
        ,
        (err: HttpErrorResponse) => {
          alert('Something went wrong. please check console log for more detail.');
          this.showLoader = false;
          this.invalidCompanyId = false;
          console.log(err);
        }
      );

    }
    else if (this.userType == 3) {
      this.showLoader = true;
      this.accountService.getVendorByCode(this.companyId).subscribe(
        (req: any) => {
          req = JSON.parse(req, null);
          this.showLoader = false;
          this.companyDetail = req[0];
          if (this.companyDetail == null || this.companyDetail == undefined) {
            this.invalidCompanyId = true;
          }
        }
        ,
        (err: HttpErrorResponse) => {
          alert('Something went wrong. please check console log for more detail.');
          this.showLoader = false;
          this.invalidCompanyId = false;
          console.log(err);
        }
      );
    }
  }

  //this method is for testing purpose.
  public generatePurchaseRequestData(): void {

    let purchaseInquiryModel: PurchaseInquiryModel = new PurchaseInquiryModel();
    // Purchase Item 1--- 
    let purchaseInquiryItemModel: PurchaseInquiryItemModel = new PurchaseInquiryItemModel();
    purchaseInquiryItemModel.Comments = "This item is for lab use purpose";
    purchaseInquiryItemModel.CustomerItemIdOrDescription = "top board item id123";
    purchaseInquiryItemModel.ItemDescription = "8gb Ram, core-i5 processor, 512gb HD machine";
    purchaseInquiryItemModel.PurchaseInquiryItemlId = 340;
    purchaseInquiryItemModel.Quantitiy = 5;
    purchaseInquiryItemModel.RequestDate = "20/06/2018";
    purchaseInquiryItemModel.Requester = "Ankur Sharma";
    purchaseInquiryItemModel.RequiredDate = "28/06/2018";
    purchaseInquiryItemModel.ShipToLocation = "Indore";
    purchaseInquiryItemModel.Unit = "number";
    //notes reference with this item 
    let note1Model: NotesModel = new NotesModel();
    note1Model.NoteDescription = "Use for future reference for same item";
    note1Model.NoteId = "452";
    let note2Model: NotesModel = new NotesModel();
    note2Model.NoteDescription = "Use for future reference for same item";
    note2Model.NoteId = "452";
    purchaseInquiryItemModel.notesList = [note1Model, note2Model];

    purchaseInquiryModel.Buyer = "Shashank Jain";
    purchaseInquiryModel.CreatedDate = "20/06/2018";
    purchaseInquiryModel.CustomerId = 241;
    purchaseInquiryModel.CustomerName = "Basecamp startups";
    purchaseInquiryModel.InquiryId = 258;
    purchaseInquiryModel.InquiryStatus = "New";
    purchaseInquiryModel.ModifiedBy = "Shashank jain";
    purchaseInquiryModel.ModifiedDate = "20/06/2018";
    purchaseInquiryModel.PurchaseEnquiryItemList = [purchaseInquiryItemModel];
    purchaseInquiryModel.ReferenceId = "4018";
    purchaseInquiryModel.ValidUntil = "01/07/2018";

    let reqnote1Model: NotesModel = new NotesModel();
    reqnote1Model.NoteDescription = "Use for future reference for same item";
    reqnote1Model.NoteId = "452";
    let reqnote2Model: NotesModel = new NotesModel();
    reqnote2Model.NoteDescription = "Use for future reference for same item";
    reqnote2Model.NoteId = "452";
    purchaseInquiryModel.NotesList = [reqnote1Model, reqnote2Model];

    //convert model to json
    let jsonString: string = JSON.stringify(purchaseInquiryModel);
    //console.log("Json response:" + jsonString);
  }

}
