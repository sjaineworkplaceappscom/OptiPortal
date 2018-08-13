import { Component, OnInit } from '@angular/core';
import { CurrentSidebarInfo } from '../../models/sidebar/current-sidebar-info';
import { ModuleName, ComponentName } from '../../enums/enums';
import { Commonservice } from '../../services/commonservice.service';


@Component({
  selector: 'app-sales-quotations-list',
  templateUrl: './sales-quotations-list.component.html',
  styleUrls: ['./sales-quotations-list.component.scss']
})
export class SalesQuotationsListComponent implements OnInit {

  constructor(private commonService:Commonservice) { }

  ngOnInit() {
  }

  openSales(){
    let currentsideBarInfo: CurrentSidebarInfo=new CurrentSidebarInfo();
    currentsideBarInfo.ComponentName=ComponentName.UpdateSales;
    currentsideBarInfo.ModuleName=ModuleName.Sales;
    currentsideBarInfo.SideBarStatus=true;    
    
    this.commonService.setCurrentSideBar(currentsideBarInfo);
  }

}
