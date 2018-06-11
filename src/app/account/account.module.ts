import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { ApproveUsersComponent } from './approve-users/approve-users.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AccountComponent, ApproveUsersComponent]
})
export class AccountModule { }
