import { Component, OnInit, HostListener } from '@angular/core';
import { UIHelper } from '../helpers/ui.helpers';
import { PurchaseInquiryService } from '../services/purchase-enquiry.service';
import { ISubscription } from 'rxjs/Subscription';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isMobile: boolean;
  gridHeight: number;
  showLoader: boolean = false;
  searchRequest: string = '';
  seriesData: number[];
  public systemAdmin:any;
  getPIlistSubs:ISubscription;
  public showDefaultMsg: boolean = false;
  
  // UI Section
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // apply grid height
    this.gridHeight = UIHelper.getMainContentHeight();

    // check mobile device
    this.isMobile = UIHelper.isMobile();
  }
  // End UI Section

  constructor(private purchaseInquiryService: PurchaseInquiryService, private translate: TranslateService) { 
     
    translate.use(localStorage.getItem('appLanguage'));
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
    });
  }

  ngOnInit() {
    // check mobile device
    this.isMobile = UIHelper.isMobile();

    // Apply class on body start
    const element = document.getElementsByTagName("body")[0];
    element.className = "";
    element.classList.add("opti_body-dashboard");
    element.classList.add("opti_body-main-module");
    // Apply class on body end

    this.systemAdmin=localStorage.getItem('SystemAdmin');
    this.getPurchaseInquiryDashboardList();
    this.renderChart();
  }

  /**
   * RenderChart
  */
  public renderChart() {
    this.showLoader = true;
    setTimeout(()=>{    
      this.showLoader = false;
    }, 1000);
  }
  // public data: any[] =
  public pidashboardResp:any[]=[];

  // pie chart code start
  public internetGrowthData = [
    {  
    Data:[{value:1,category:"New"},{value:200,category:"close"}]
    // data: [{
    //   category: 'New',
    //   value: 500
    // }, {
    //   category: 'Updated',
    //   value: 700
    // }, {
    //   category: 'Cancelled',
    //   value: 50
    // }, {
    //   category: 'Draft',
    //   value: 500
    // }]
  }];

   public model: any[] = this.internetGrowthData;

  public labelContent(e: any): string {
      return `${ e.category } \n ${e.value}`;
  }

  // pie chart code end

  // yearly chart code start
  public series: any[] = [{
    name: "New",
    data: [3.907, 7.943, 7.848, 9.284, 9.263]
  }, {
    name: "Updated",
    data: [4.743, 7.295, 7.175, 6.376, 8.153]
  }, {
    name: "Cancelled",
    data: [0.010, 0.375, 1.161, 0.684, 3.7]
  },{
    name: "Draft",
    data: [1.988, 2.733, 3.994, 3.464, 4.001]
  }];
  private categories: number[] = [2002, 2003, 2004, 2005, 2006];
  // yearly chart code end


   /**
   * Method to get list of inquries from server.
   */
  public getPurchaseInquiryDashboardList() {
    this.showLoader = true;
    
    this.getPIlistSubs = this.purchaseInquiryService.getPurchaseInquiryDashboardDetail().subscribe(
      PIData => {
        if(PIData!=undefined && PIData!=null && PIData !='' ){
          this.showLoader=false;
          this.pidashboardResp=JSON.parse(PIData);
          if(this.pidashboardResp.length<1){
            this.showDefaultMsg = true;
          }
          //console.log("Length:"+this.pidashboardResp.length);
        }else{
          this.showDefaultMsg = true;
        }
        
      },
      error => {
        this.showLoader=false;
        //alert("Something went wrong");
        console.log("Error: ", error);

      },
      
    );
  }


}
