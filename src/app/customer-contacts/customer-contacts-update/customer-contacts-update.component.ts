import { Component, OnInit, Input } from '@angular/core';
import { CurrentSidebarInfo } from 'src/app/models/sidebar/current-sidebar-info';

@Component({
  selector: 'app-customer-contacts-update',
  templateUrl: './customer-contacts-update.component.html',
  styleUrls: ['./customer-contacts-update.component.scss']
})
export class CustomerContactsUpdateComponent implements OnInit {

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
