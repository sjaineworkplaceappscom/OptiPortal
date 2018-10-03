import { Component, OnInit, Input } from '@angular/core';
import { CurrentSidebarInfo } from '../../models/sidebar/current-sidebar-info';

@Component({
  selector: 'app-customer-contacts-add',
  templateUrl: './customer-contacts-add.component.html',
  styleUrls: ['./customer-contacts-add.component.scss']
})
export class CustomerContactsAddComponent implements OnInit {

  contactId;
  contactName;
  phone;
  email;
  address;


  public listItems = [
    { text: "Activate", value: 1 },
    { text: "Deactivate", value: 2 },
  ];
  public selectedItem = [{ text: "Activate", value: 1 }];

  @Input() currentSidebarInfo:CurrentSidebarInfo;

  constructor() { }

  ngOnInit() {
  }

}
