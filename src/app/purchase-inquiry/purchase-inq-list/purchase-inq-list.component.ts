import { Component, OnInit } from '@angular/core';
import { PurchaseInquiryService } from '../../services/purchase-enquiry.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-purchase-inq-list',
  templateUrl: './purchase-inq-list.component.html',
  styleUrls: ['./purchase-inq-list.component.css']
})
export class PurchaseInqListComponent implements OnInit {
  showLoader:boolean=false;
  //for inquiry grid Data
  public gridData: any[]=[];
  requestId:string="id";
  constructor(private purchaseInquiryService: PurchaseInquiryService) { }
  showInq:boolean=false;
  ngOnInit() {    
    //call method to get all inquiry data.
    this.getInquiryList();
  }


  /**
   * Method to get list of inquries from server.
   */
    public getInquiryList(){
      this.purchaseInquiryService.getInquiryList().subscribe(
          inquiryData=>{     
              this.showLoader=true;  
              this.gridData=JSON.parse(inquiryData);
             // console.log("grid inquiry data"+JSON.stringify(this.gridData ));
              this.showLoader=false;
          });
  }

  btnClick(){
    this.showInq=!this.showInq;
  }
}
