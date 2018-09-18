import { Component, OnInit, Input, HostListener } from '@angular/core';
import { PurchaseInquiryService } from '../../services/purchase-enquiry.service';
import { UIHelper } from '../../helpers/ui.helpers';
import { DateTimeHelper } from '../../helpers/datetime.helper';
import { TempPurchaseInquiryItemModel } from '../../tempmodels/temppurchase-inquiry-item';
import { CurrentSidebarInfo } from '../../models/sidebar/current-sidebar-info';
import { ComponentName, ModuleName } from '../../enums/enums';
import { ISubscription } from 'rxjs/Subscription';
import { Configuration } from '../../../assets/configuration';

@Component({
  selector: 'app-purchase-inq-item-list',
  templateUrl: './purchase-inq-item-list.component.html',
  styleUrls: ['./purchase-inq-item-list.component.scss']
})
export class PurchaseInqItemListComponent implements OnInit {
  imgPath = Configuration.imagePath;
  showLoader:boolean=false;

  /**
   * global variable
  */
  isMobile: boolean;
  gridHeight: number;

  /**
    * Item tab Variable
  */
  addItem:boolean = false;
  itemGrid:boolean = true;

  @Input() id:string;
   //for item grid Data
  public gridItemsData: any[] = [];

  // Subscriber
  getPIitemlistSubs:ISubscription;
  
  purchaseItemsModel: TempPurchaseInquiryItemModel = new TempPurchaseInquiryItemModel();
  constructor(private purchaseInquiryService: PurchaseInquiryService) { }

  
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // Apply Grid Height
    this.gridHeight = UIHelper.getMainContentHeight();
    // Check Mobile device
    this.isMobile = UIHelper.isMobile();
  }

  ngOnInit() {

    // Apply Grid Height
    this.gridHeight = UIHelper.getMainContentHeight();
    // Check Mobile device
    this.isMobile = UIHelper.isMobile();

    
    
    this.selectedInquiryId = 'E4F1A5AB-AEFE-4F34-847F-6252FD0C3403';
    this.getInquiryItemsData(this.selectedInquiryId);
  }

  ngOnDestroy(){
    if(this.getPIitemlistSubs!=undefined)
    this.getPIitemlistSubs.unsubscribe();
}


  /**
     * Method to get list of inquries from server.
     */
    public getInquiryItemList(inquiryId: string ){
        
      this.showLoader=true;  
      this.getPIitemlistSubs = this.purchaseInquiryService.getInquiryItemList(inquiryId).subscribe(
          inquiryItemData=>{  
             
              this.gridItemsData = JSON.parse(inquiryItemData);
              
              this.showLoader=false;
          },
          error => {
              this.showLoader = false;
              alert('Something Went Wrong')
              console.log("Error: " + error);
              // handle error.
          });

  }

     /**
     * Method to get list of inquries from server.
     */
    public getInquiryItemsData(inquiryId: string ){
      
      this.showLoader=true;  
      this.getPIitemlistSubs = this.purchaseInquiryService.getInquiryItemList(inquiryId).subscribe(
          inquiryItemData=>{        
              this.gridItemsData = JSON.parse(inquiryItemData);
              this.gridItemsData.forEach(element => {
                element.RequiredDate=DateTimeHelper.ParseDate(element.RequiredDate);
                element.RequestDate=DateTimeHelper.ParseDate(element.RequestDate);            
              });
              
          },
          error => {
            this.showLoader=false;
              alert("Something went wrong");  
              console.log("Error: " + error);          
          });
          () =>{
            this.showLoader = false;
          }

  }

  showAddItemSection(){
    let sideBaseInfo: CurrentSidebarInfo=new CurrentSidebarInfo();
    sideBaseInfo.ComponentName=ComponentName.AddInqueryItem;
    sideBaseInfo.ModuleName=ModuleName.Purchase;
    sideBaseInfo.SideBarStatus=true;
  }


   //purchaseItemsModelForUpdate: TempPurchaseInquiryItemModel = new TempPurchaseInquiryItemModel();
   requestDate: Date;
   requiredDate: Date;
   selectedItemId: string = '';
   selectedInquiryId: string = '';

  /**
   * Method will open the edit item window for selected grid item.
   * @param gridItemsData 
   * @param selection 
   * @param status 
   */
    public onItemGridDataSelection(selection, status) {
      
      //fatch and parse row value.
      const selectedData = this.gridItemsData[0];
      
      this.purchaseItemsModel = JSON.parse(JSON.stringify(selectedData));
      this.requestDate = DateTimeHelper.ParseDate(this.purchaseItemsModel.RequestDate);
      this.requiredDate = DateTimeHelper.ParseDate(this.purchaseItemsModel.RequiredDate);
      this.selectedItemId = this.purchaseItemsModel.PurchaseInquiryItemId;      
  }

}

