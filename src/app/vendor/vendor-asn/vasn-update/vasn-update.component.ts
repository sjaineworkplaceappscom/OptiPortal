import { Component, OnInit, Input } from '@angular/core';
import { CurrentSidebarInfo } from '../../../models/sidebar/current-sidebar-info';

@Component({
  selector: 'app-vasn-update',
  templateUrl: './vasn-update.component.html',
  styleUrls: ['./vasn-update.component.scss']
})
export class VasnUpdateComponent implements OnInit {

  @Input() currentSidebarInfo:CurrentSidebarInfo;

  constructor() { }

  ngOnInit() {
  }

}
