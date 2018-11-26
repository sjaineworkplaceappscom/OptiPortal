import { Component, OnInit, Input } from '@angular/core';
import { CurrentSidebarInfo } from '../../../models/sidebar/current-sidebar-info';

@Component({
  selector: 'app-vasn-add',
  templateUrl: './vasn-add.component.html',
  styleUrls: ['./vasn-add.component.scss']
})
export class VasnAddComponent implements OnInit {

  @Input() currentSidebarInfo:CurrentSidebarInfo;

  constructor() { }

  ngOnInit() {
  }

}
