import { Component, OnInit, Input } from '@angular/core';
import { CurrentSidebarInfo } from '../models/sidebar/current-sidebar-info';

@Component({
  selector: 'app-customer-contacts',
  templateUrl: './customer-contacts.component.html',
  styleUrls: ['./customer-contacts.component.scss']
})
export class CustomerContactsComponent implements OnInit {

  @Input() currentSidebarInfo:CurrentSidebarInfo;

  constructor() { }

  ngOnInit() {
  }

}
