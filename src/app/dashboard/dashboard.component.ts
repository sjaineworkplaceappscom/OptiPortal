import { Component, OnInit, HostListener } from '@angular/core';
import { UIHelper } from '../helpers/ui.helpers';

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
  
  // UI Section
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // apply grid height
    this.gridHeight = UIHelper.getMainContentHeight();

    // check mobile device
    this.isMobile = UIHelper.isMobile();
  }
  // End UI Section

  constructor() { }

  ngOnInit() {
    // check mobile device
    this.isMobile = UIHelper.isMobile();

    // Apply class on body start
    const element = document.getElementsByTagName("body")[0];
    element.className = "";
    element.classList.add("opti_body-dashboard");
    element.classList.add("opti_body-main-module");
    // Apply class on body end

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

}
