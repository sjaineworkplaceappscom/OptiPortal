import { Component, OnInit, HostListener } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { UIHelper } from '../../helpers/ui.helpers';
import { Configuration } from '../../helpers/configuration';

@Component({
  selector: 'app-approve-users',
  templateUrl: './approve-users.component.html',
  styleUrls: ['./approve-users.component.scss']
})
export class ApproveUsersComponent implements OnInit {
  imgPath = Configuration.imagePath;
  isMobile: boolean;
   items: Array<any>;
  private approveList:any;
  public mySelection: number[] = [];
  gridHeight: number;
  isColumnApprovedUserFilter: boolean = false;
  isColumnApprovedUserGroup: boolean = false;
  disableBtn:boolean=false;

  constructor(private accountService: AccountService) {
    
  }

  ngOnInit() {
    // apply grid height
    this.gridHeight = UIHelper.getMainContentHeight();
    
    // check mobile device
    this.isMobile = UIHelper.isMobile();

    this.getInactiveUsersData();    
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // apply grid height
    this.gridHeight = UIHelper.getMainContentHeight();
      
    // check mobile device
    this.isMobile = UIHelper.isMobile();
  }

  approveUsers(){   

    if(this.mySelection.toString()==null || this.mySelection.toString() == ''){
      alert('Please select any user to Approve.');
      return;
    }
    this.disableBtn=true;   
   // console.log(this.mySelection.toString());
    this.accountService.inviteUsers(this.mySelection.toString()).subscribe(
      data => {
        this.disableBtn=false;
        alert('User(s) Approved successfully.');
        this.getInactiveUsersData();
      },
      error => {
        this.disableBtn=false;
        //this.showLoader=false;
        alert("Something went wrong");
        console.log("Error: ", error)
      }
    );
    
  }

  rejectUsers(){   
    if(this.mySelection.toString()==null || this.mySelection.toString() == ''){
      alert('Please select any user to Reject.');
      return;
    }
    this.disableBtn=true;   
   // console.log(this.mySelection.toString());
    this.accountService.rejectUsers(this.mySelection.toString()).subscribe(
      data => {
        this.disableBtn=false;   
        alert('User(s) Rejected successfully.');
        this.getInactiveUsersData();
      },
      error => {
        this.disableBtn=false;   
        //this.showLoader=false;
        alert("Something went wrong");
        console.log("Error: ", error)
      }
    );

    
  }

  getInactiveUsersData(){

    this.accountService.getInactiveUsers().subscribe(
      (data: any) => {
        this.items = JSON.parse(data, null);
       
        if(this.items.length==undefined || this.items.length<=0){
          this.disableBtn=true;
        }
        else{
          this.disableBtn=false;
        }
      },
      error => {
        //this.showLoader=false;
        alert("Something went wrong");
        console.log("Error: ", error)
      }
    );
  }

}
