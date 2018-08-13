import { Component, OnInit } from '@angular/core';
import { Commonservice } from '../../services/commonservice.service';
import { Router } from '@angular/router';
import { opticonstants } from '../../constants';
// import { UIHelper } from '../../helpers/ui.helpers';

@Component({
  selector: 'app-portal-left',
  templateUrl: './portal-left.component.html',
  styleUrls: ['./portal-left.component.scss']
})
export class PortalLeftComponent implements OnInit {

  systemAdmin:string;
  constructor(private commonService: Commonservice,private router: Router) { }
  selectedThemeColor: string = 'opticonstants.DEFAULTTHEMECOLOR';

  //Already selected list in left panel
  selectedItem:string='item2';

  ngOnInit() {    
    
    this.systemAdmin=localStorage.getItem('SystemAdmin');   
     
    this.commonService.themeCurrentData.subscribe(
      data => {
        this.selectedThemeColor = data;
      }
    );
    
    if(this.systemAdmin=='true'){
      this.navigate();
    }    
  }

  ngOnChange() {
  }

  navigate(){
    //this.router.navigateByUrl('/approve');
    this.commonService.setNavigatedData(true);
  }

  
  listClick(event, newValue, module) {
      console.log(newValue);
      this.selectedItem = newValue;
      this.router.navigate(['home/'+module]);
  }
 
}
