import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-approve-users',
  templateUrl: './approve-users.component.html',
  styleUrls: ['./approve-users.component.scss']
})
export class ApproveUsersComponent implements OnInit {
  private items: Array<any>;
  private approveList:any;
  public mySelection: number[] = [];
  constructor(private accountService: AccountService) {
    
  }

  ngOnInit() {
    this.getInactiveUsersData();    
  }

  approveUsers(){      
    this.accountService.inviteUsers(this.mySelection.toString()).subscribe(
      data => {
        alert('User(s) Approved successfully.');
        this.getInactiveUsersData();
      }
    );
   
    
  }

  rejectUsers(){      
    this.accountService.rejectUsers(this.mySelection.toString()).subscribe(
      data => {
        alert('User(s) Rejected successfully.');
        this.getInactiveUsersData();
      }
    );

    
  }

  getInactiveUsersData(){
    this.accountService.getInactiveUsers().subscribe(
      (data: any) => {
        this.items = JSON.parse(data, null);
      }
    );
  }

}
