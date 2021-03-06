import { Component, OnInit, Input, HostListener } from '@angular/core';
import { CurrentSidebarInfo } from 'src/app/models/sidebar/current-sidebar-info';
import { GridComponent } from '@progress/kendo-angular-grid';
import { UIHelper } from '../../helpers/ui.helpers';
import { serialAndBatchList } from '../../DemoData/consign';
import { Configuration } from '../../helpers/Configuration';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { DateTimeHelper } from 'src/app/helpers/datetime.helper';
import { ISubscription } from 'rxjs/Subscription';
import { ConsignedInventoryService } from 'src/app/services/consigned-inventory.service';
import { Commonservice } from 'src/app/services/commonservice.service';
import { ConsignedInventoryModel } from 'src/app/models/ConsignedInventoryModel';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-consign-inventory-sr-batch-detail',
  templateUrl: './consign-inventory-sr-batch-detail.component.html',
  styleUrls: ['./consign-inventory-sr-batch-detail.component.scss']
})
export class ConsignInventorySRBatchDetailComponent implements OnInit {
  @Input() currentSidebarInfo: CurrentSidebarInfo;
  imgPath = Configuration.imagePath;
  public gridData: any[];
  isMobile: boolean;
  isSrBatchColumnFilter: boolean = false;
  gridHeight: number;
  showLoader: boolean = false;
  searchRequest: string = '';

  getSerialBatchlistSubs: ISubscription;

  public configX: PerfectScrollbarConfigInterface = {
    suppressScrollY: true
  };
  public BatchSerialSideBarsubs: ISubscription;
  tabName: string = 'home';
  constructor(private consignedInventoryService: ConsignedInventoryService, private commonService: Commonservice,private translate: TranslateService) { 
    translate.use(localStorage.getItem('appLanguage'));
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
    });
  }

  // UI Section
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // apply grid height
    this.gridHeight = UIHelper.getMainContentHeight();

    // check mobile device
    this.isMobile = UIHelper.isMobile();
  }
  // End UI Section

  ngOnInit() {
    // apply grid height
    this.gridHeight = UIHelper.getMainContentHeight();

    // check mobile device
    this.isMobile = UIHelper.isMobile();

    console.log('current side bar info');
    this.BatchSerialSideBarsubs = this.commonService.currentSidebarInfo.subscribe(
      currentSidebarData => {
        console.log('current side bar info');
        if (currentSidebarData != null && currentSidebarData != undefined) {
          this.showLoader = true;
          var serialbatchdetail: any = currentSidebarData.RequesterData;

          if (serialbatchdetail) {

            if (currentSidebarData.RequesterId === 'SBDetail')
              this.getSerialBatchList(serialbatchdetail,2+"");//type 2 for serial batch value    
            else if (currentSidebarData.RequesterId === 'SBTrans')
              this.getSerialBatchListForTrans(serialbatchdetail.ObjectType,serialbatchdetail.Item,serialbatchdetail.DocNum);//type 2 for serial batch value    


          }
        }
      }, error => {
        this.showLoader = false;
        //alert("Something went wrong");
        console.log("Error: ", error)
      }
    );

  }


  public getSerialBatchListForTrans(ObjectType:any,itemCode: any, docEntry): any {
    this.showLoader = true;
    this.consignedInventoryService.getSerialBatchDetailsForTransactions(ObjectType,itemCode, docEntry).subscribe(
      (data: any) => {
        if (data != null && data != undefined) {
          this.gridData = JSON.parse(data);
          this.showLoader = false;
        }
        return data;
      },
      error => {
        this.showLoader = false;
        //alert("Something went wrong");
        console.log("Error: ", error);
        localStorage.clear();
      }
    );
  }

  // tab function
  openTab(evt, tabName, tabType) {
    UIHelper.customOpenTab(evt, tabName, 'horizontal');
  }

  /**
   * Method to get list of inquries from server.
  */
  public getSrBatchList() {
    this.showLoader = true;
    this.gridData = serialAndBatchList;
    setTimeout(() => {
      this.showLoader = false;
    }, 1000);
  }

  onFilterChange(checkBox: any, grid: GridComponent) {
    if (checkBox.checked == false) {
      this.clearFilter(grid);
    }
  }

  clearFilter(grid: GridComponent) {
    //grid.filter.filters=[];
  }


  /**
   * Method to get list of inquries from server.
  */
  public getSerialBatchList(model: ConsignedInventoryModel, type: string): any {
    this.showLoader = true;
    model.Type = 2;
    this.getSerialBatchlistSubs = this.consignedInventoryService.getConsignedInventoryChildList(model, type).subscribe(
      (data: any) => {
        if (data != null && data != undefined) {
          this.gridData = JSON.parse(data);
          this.showLoader = false;
        }
        return data;
      },
      error => {
        this.showLoader = false;
        //alert("Something went wrong");
        console.log("Error: ", error);
        let lang = localStorage.getItem('appLanguage');      
        localStorage.clear();
        localStorage.setItem('appLanguage',lang);  
      }
    );
  }


  ngOnDestroy() {

    if (this.getSerialBatchlistSubs != undefined)
      this.getSerialBatchlistSubs.unsubscribe();
    if (this.BatchSerialSideBarsubs != undefined)
      this.BatchSerialSideBarsubs.unsubscribe();

  }


}
