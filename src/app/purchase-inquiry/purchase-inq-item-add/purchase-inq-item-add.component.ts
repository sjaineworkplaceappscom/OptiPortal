import { Component, OnInit, Input, HostListener } from '@angular/core';
import { TempPurchaseInquiryItemModel } from '../../tempmodels/temppurchase-inquiry-item';
import { TempPurchaseInquiryModel } from '../../tempmodels/temppurchase-inquiry';
import { CurrentSidebarInfo } from '../../models/sidebar/current-sidebar-info';
import { PurchaseInquiryService } from '../../services/purchase-enquiry.service';
import { UIHelper } from '../../helpers/ui.helpers';
import { DateTimeHelper } from '../../helpers/datetime.helper';
import { Commonservice } from '../../services/commonservice.service';

@Component({
  selector: 'app-purchase-inq-item-add',
  templateUrl: './purchase-inq-item-add.component.html',
  styleUrls: ['./purchase-inq-item-add.component.scss']
})
export class PurchaseInqItemAddComponent implements OnInit {

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
  tabName: string = 'home';
  
  

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // Apply Grid Height
    this.gridHeight = UIHelper.getMainContentHeight();
    // Check Mobile device
    this.isMobile = UIHelper.isMobile();
  }
  receivedPIModel:TempPurchaseInquiryModel;
  receivedPurchaseInquiryId:string;
  // store item grid data.
  gridItemsData = [];

  public minValidDate: Date = new Date();
  purchaseItemsModel: TempPurchaseInquiryItemModel = new TempPurchaseInquiryItemModel();
  showLoader:boolean=false;

  selectedThemeColor: string = 'opticonstants.DEFAULTTHEMECOLOR';
  
  @Input() currentSidebarInfo: CurrentSidebarInfo;

  constructor(private purchaseInquiryService: PurchaseInquiryService, private commonService: Commonservice) { }
<<<<<<< HEAD
  ngOnChange() {
    this.commonService.currentItemData.subscribe(
      (data: TempPurchaseInquiryModel) => {
          this.receivedPIModel=data;
          this.receivedPurchaseInquiryId = this.receivedPIModel.PurchaseInquiryId
          console.log("received parent id at piia onchange:"+this.receivedPurchaseInquiryId);
      },
      error => {
          this.showLoader=false;
          alert("Something went wrong");
          console.log("Error: ", error)
      }
  );
  }
=======
  

>>>>>>> c6afd0eb0ace35304862d5ef8d6cc8aeca70dad3
  ngOnInit() {
    /**
     * Apply Grid Height
    */
    this.gridHeight = UIHelper.getMainContentHeight();
        
    /**
      * Check Mobile device
    */
    this.isMobile = UIHelper.isMobile();
<<<<<<< HEAD
=======
   

    // GET current theme colour
    this.commonService.themeCurrentData.subscribe(
      data => {
        this.selectedThemeColor = data;
      }
    );

>>>>>>> c6afd0eb0ace35304862d5ef8d6cc8aeca70dad3

    this.commonService.currentItemData.subscribe(
      (data: TempPurchaseInquiryModel) => {
          this.receivedPIModel=data;
          this.receivedPurchaseInquiryId = this.receivedPIModel.PurchaseInquiryId
          console.log("received parent id at piia:"+this.receivedPurchaseInquiryId);
      },
      error => {
          this.showLoader=false;
          alert("Something went wrong");
          console.log("Error: ", error)
      }
  );

  this.getInquiryItemsData(this.receivedPurchaseInquiryId);
  }

  showItemsGrid(){
    this.addItem = false;
    this.itemGrid = true;
  }

  showItemForm(){
    this.addItem = true;
    this.itemGrid = false;
  }

  showAddItemSection(){
    this.showItemForm();
    this.resetDefaultItemData();
  }

  // AddPurchaseInquiryItem(){
  //   this.showItemsGrid();
  // }

  addItemtagain(){
    this.showItemsGrid();
  }

  closeItemForm(){
    this.showItemsGrid();
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
      //let selectedItem = gridItemsData.data.data[selection.index];
      //const selectedData = selection.selectedRows[0].dataItem;
      const selectedData = this.gridItemsData[0];
      
      this.purchaseItemsModel = JSON.parse(JSON.stringify(selectedData));
      this.requestDate = DateTimeHelper.ParseDate(this.purchaseItemsModel.RequestDate);
      this.requiredDate = DateTimeHelper.ParseDate(this.purchaseItemsModel.RequiredDate);
      this.purchaseItemsModel.RequestDate = this.requestDate;
      this.purchaseItemsModel.RequiredDate = this.requiredDate;
      this.selectedItemId = this.purchaseItemsModel.PurchaseInquiryItemId;
      this.showItemForm();
      
      
  }


   /**
     * Method to get list of inquries from server.
     */
    public getInquiryItemsData(inquiryId: string ){
      console.log("in getInquiryItemList");
      this.showLoader=true;  
      this.purchaseInquiryService.getInquiryItemList(inquiryId).subscribe(
          inquiryItemData=>{        
              this.gridItemsData = JSON.parse(inquiryItemData);
              this.gridItemsData.forEach(element => {
                element.RequiredDate=DateTimeHelper.ParseDate(element.RequiredDate);
                element.RequestDate=DateTimeHelper.ParseDate(element.RequestDate);            
              });
             // console.log("grid item data" + JSON.stringify(this.gridItemsData));
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

    /**
     * When click on save 
     */
    public OnSave() {debugger;

      this.AddPurchaseInquiryItem();
      this.addItem = false;
      this.itemGrid = true;
    }

    /**
     * when click on save and new
     */
    public OnSaveAndNew() {
      this.AddPurchaseInquiryItem();
      this.addItem = true;
      this.itemGrid = false;
    }

     /**
     * AddPurchaseInquiryItem
     */
    public AddPurchaseInquiryItem() {
      this.purchaseItemsModel.PurchaseInquiryId = this.receivedPurchaseInquiryId;
     this.purchaseInquiryService.AddPurchaseInquiryItem(this.purchaseItemsModel).subscribe(
         data => {
           this.getInquiryItemsData(this.receivedPurchaseInquiryId);
           console.log(data)
         },
         error => 
        {
           this.showLoader=false;
           alert('Something went wrong');
           console.log("Error: " + error);
        }
     );
    }

  // tab code start
  
  openTab(evt, tabName) {
    this.tabName = tabName;
    UIHelper.customOpenTab(evt, tabName, 'vertical');
  }
  // tab code end
    /**
* This method will reset the model and date object for add form.
*/
  private resetDefaultItemData() {

    this.purchaseItemsModel = new TempPurchaseInquiryItemModel();
    this.purchaseItemsModel.RequestDate = new Date();
    this.purchaseItemsModel.RequiredDate = new Date();
    // this.purchaseItemsModel.CustomerItemCode= '';
    // this.purchaseItemsModel.Unit = '';
  }

}
