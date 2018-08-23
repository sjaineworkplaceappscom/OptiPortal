import { Component, OnInit, Input, HostListener } from '@angular/core';
import { TempPurchaseInquiryItemModel } from '../../tempmodels/temppurchase-inquiry-item';
import { TempPurchaseInquiryModel } from '../../tempmodels/temppurchase-inquiry';
import { CurrentSidebarInfo } from '../../models/sidebar/current-sidebar-info';
import { PurchaseInquiryService } from '../../services/purchase-enquiry.service';
import { UIHelper } from '../../helpers/ui.helpers';
import { DateTimeHelper } from '../../helpers/datetime.helper';
import { Commonservice } from '../../services/commonservice.service';
import { NotesModel } from '../../models/purchaserequest/notes';
import { CustomerEntityType, PurchaseInquiryStatus } from '../../enums/enums';
import { ISubscription } from '../../../../node_modules/rxjs/Subscription';

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
  isCancelStatus:boolean = false;
  addItem: boolean = false;
  itemGrid: boolean = true;
  tabName: string = 'home';

  isFromGrid = false;
  addOperationInProgress:boolean=false;
  

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // Apply Grid Height
    this.gridHeight = UIHelper.getMainContentHeight();
    // Check Mobile device
    this.isMobile = UIHelper.isMobile();
  }
  receivedPIModel: TempPurchaseInquiryModel;
  receivedPurchaseInquiryId: string;
  // store item grid data.
  gridItemsData = [];

  public minValidDate: Date = new Date();
  purchaseItemsModel: TempPurchaseInquiryItemModel = new TempPurchaseInquiryItemModel();
  showLoader: boolean = false;

  selectedThemeColor: string = 'opticonstants.DEFAULTTHEMECOLOR';

  // Subscriber
  itemSub:ISubscription;
  additemSub:ISubscription;
  getitemSub:ISubscription;
  updateitemSub:ISubscription;

  @Input() currentSidebarInfo: CurrentSidebarInfo;

  constructor(private purchaseInquiryService: PurchaseInquiryService, private commonService: Commonservice) {     
  }

  ngOnDestroy(){
    if(this.itemSub!=undefined)
    this.itemSub.unsubscribe();

    if(this.additemSub!=undefined)
    this.additemSub.unsubscribe();

    if(this.getitemSub!=undefined)
    this.getitemSub.unsubscribe();

    if(this.updateitemSub!=undefined)
    this.updateitemSub.unsubscribe();
}

  ngOnInit() {
    console.log("onInit selectedItemId:"+this.selectedItemId);
    // Apply Grid Height
    this.gridHeight = UIHelper.getMainContentHeight();
    // Check Mobile device
    this.isMobile = UIHelper.isMobile();
    //debugger;
    //get status of selected inquiry for disabling or enabling  forms
    let inquiryDetail: string= localStorage.getItem("SelectedPurchaseInquery");
    if(inquiryDetail !=null && inquiryDetail!=undefined){
    let inquiryData: any = JSON.parse(inquiryDetail);
    let inquiryStatus = inquiryData.Status;
    if(inquiryStatus == PurchaseInquiryStatus.Cancelled){
      this.isCancelStatus = true;
    }
  }

    // GET current theme colour
    this.commonService.themeCurrentData.subscribe(
      data => {
        this.selectedThemeColor = data;
      }
    );

    this.itemSub=this.commonService.currentItemData.subscribe(
      (data: TempPurchaseInquiryModel) => {
        this.receivedPIModel = data;
        this.receivedPurchaseInquiryId = this.receivedPIModel.PurchaseInquiryId        
        this.getInquiryItemsData(this.receivedPurchaseInquiryId);
        this.showItemsGrid();
      },
      error => {
        this.showLoader = false;
        alert("Something went wrong");
        console.log("Error: ", error)
      }
    );
  }



  /**
   * show grid for item.
   */
  showItemsGrid() {
    this.addItem = false;
    this.itemGrid = true;
  }

  /**
   * show form for item.
   */
  showItemForm() {
    this.addItem = true;
    this.itemGrid = false;
    // this.addOperationInProgress=true;
  }

  /**
   * open a new form from save and new.
   */
  showAddItemSection() {
    console.log("at showAddItemSection  selectedItemId:"+this.selectedItemId);
    //validation on form
    this.showItemForm();
    this.resetDefaultItemData();
  }

  /**
   * method reset model values and show item form.
   */
  resetValuesAndShowForm() {
    this.resetDefaultItemData();
    this.showItemForm();
  }

  closeItemForm() {
    //reset selected item id on cancel button click.
    this.selectedItemId = '';
    this.showItemsGrid();
   // this.resetDefaultItemData();
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
    // set false for grid item only
    this.addOperationInProgress=false;

    this.isFromGrid = true;
    const selectedData = this.gridItemsData[selection.index];
    this.purchaseItemsModel = JSON.parse(JSON.stringify(selectedData));
    this.requestDate = DateTimeHelper.ParseDate(this.purchaseItemsModel.RequestDate);
    this.requiredDate = DateTimeHelper.ParseDate(this.purchaseItemsModel.RequiredDate);

    this.purchaseItemsModel.RequestDate = this.requestDate;
    this.purchaseItemsModel.RequiredDate = this.requiredDate;
    this.selectedItemId = this.purchaseItemsModel.PurchaseInquiryItemId;
    console.log("at onItemGridDataSelection  selectedItemId:"+this.selectedItemId);
    this.showItemForm();
  }


  /**
    * Method to get list of inquries from server.
    */
  public getInquiryItemsData(inquiryId: string) {    
    this.showLoader = true;

    this.getitemSub=this.purchaseInquiryService.getInquiryItemList(inquiryId).subscribe(
      inquiryItemData => {
        this.showLoader=false;
        this.gridItemsData = JSON.parse(inquiryItemData);
        this.gridItemsData.forEach(element => {
          element.RequiredDate = DateTimeHelper.ParseDate(element.RequiredDate);
          element.RequestDate = DateTimeHelper.ParseDate(element.RequestDate);
        });
        
      },
      error => {
        this.showLoader = false;
        alert("Something went wrong");
        console.log("Error: " + error);
      });
    () => {
      this.showLoader = false;
    }

  }

  /**
   * When click on save 
   */
  public OnSaveClick() {
    
    if (this.isFromGrid) {
      this.UpdatePurchaseInquiryItem();
    } else {
      this.AddPurchaseInquiryItem();
    }
  }

  /**
   * when click on save and new.
   */
  public OnSaveAndNew() {    
    
    if (this.isFromGrid) {
      this.UpdatePurchaseInquiryItem(true);
    } else {
      this.AddPurchaseInquiryItem(true);
    }
  }

  /**
  * AddPurchaseInquiryItem
  */
  public AddPurchaseInquiryItem(saveAndNew: boolean = false) {
    this.purchaseItemsModel.PurchaseInquiryId = this.receivedPurchaseInquiryId;    
    this.showLoader=true;
    
    this.additemSub=this.purchaseInquiryService.AddPurchaseInquiryItem(this.purchaseItemsModel).subscribe(
      data => {
        //this.gridItemsData = JSON.parse(data);
        //this.purchaseItemsModel = JSON.parse(data);
        
        let tempData: any = data;
        this.purchaseItemsModel = tempData;
        this.purchaseItemsModel.RequiredDate = DateTimeHelper.ParseDate(this.purchaseItemsModel.RequiredDate);
        this.purchaseItemsModel.RequestDate = DateTimeHelper.ParseDate(this.purchaseItemsModel.RequestDate);
        this.getInquiryItemsData(this.receivedPurchaseInquiryId);
        //console.log(data)
        if (saveAndNew) {
          this.resetValuesAndShowForm()
        } else { 
           //this.showItemsGrid();
           this.addOperationInProgress=false;
        }
        this.showLoader=false;
      },
      error => {
        this.showLoader = false;
        alert('Something went wrong');
        console.log("Error: " + error);
      },
      () => {
        this.isFromGrid = false
       
       // this.addOperationInProgress=false;
      }
    );
  }


  /**
 * UpdatePurchaseInquiryItem
 */
  public UpdatePurchaseInquiryItem(saveAndNew: boolean = false) {
    this.purchaseItemsModel.PurchaseInquiryId = this.receivedPurchaseInquiryId;
    this.showLoader=true;
    this.updateitemSub=this.purchaseInquiryService.UpdatePurchaseInquiryItem(this.purchaseItemsModel).subscribe(
      data => {
        
        this.getInquiryItemsData(this.receivedPurchaseInquiryId);
        
        if (saveAndNew) {
          this.resetValuesAndShowForm()
        } else {
          //   this.showItemsGrid();
         // this.showItemsGrid();        
        }
        this.showLoader=false;
      },
      error => {
        this.showLoader = false;
        alert('Something went wrong');
        console.log("Error: " + error);
      },
      () => {
        this.isFromGrid = false
      }
    );
  }

  // tab code start
  openTab(evt, tabName) {
    if(this.addOperationInProgress==true)
    {
      return;
    }
    if (tabName == 'notes') {
      
      let notedata: NotesModel = new NotesModel();
      notedata.ParentId = this.purchaseItemsModel.PurchaseInquiryItemId;
      notedata.ParentType = CustomerEntityType.PurchaseInquiryItem;

      notedata.GrantParentId = this.receivedPurchaseInquiryId;
      notedata.GrandParentType = CustomerEntityType.PurchaseInquiry;

      this.commonService.setNotesItemData(notedata);
    }

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
    this.addOperationInProgress=true;
   
  }

  // setNotesModel(parentId, grandParentId) {
  //   let notesModel: NotesModel = new NotesModel();
  //   notesModel.GrantParentId = grandParentId;
  //   notesModel.GrandParentType = CustomerEntityType.PurchaseInquiry;
  //   notesModel.ParentType = CustomerEntityType.PurchaseInquiryItem;
  //   notesModel.ParentId = parentId;
  //   this.commonService.setNotesItemData(notesModel);
  // }
}

