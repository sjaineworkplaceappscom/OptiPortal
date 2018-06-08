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
    this.accountService.getInactiveUsers().subscribe(
      (data: any) => {
        this.items = JSON.parse(data, null);
      }
    );
  }

  ngOnInit() {

  }

  approveUsers(){
      
    this.accountService.inviteUsers(this.mySelection.toString());
    
  }

}
