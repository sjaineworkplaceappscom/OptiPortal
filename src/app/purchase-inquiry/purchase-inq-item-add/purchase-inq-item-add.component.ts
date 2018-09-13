import { Component, OnInit, Input, HostListener } from '@angular/core';
import { TempPurchaseInquiryItemModel } from '../../tempmodels/temppurchase-inquiry-item';
import { TempPurchaseInquiryModel } from '../../tempmodels/temppurchase-inquiry';
import { CurrentSidebarInfo } from '../../models/sidebar/current-sidebar-info';
import { PurchaseInquiryService } from '../../services/purchase-enquiry.service';
import { UIHelper } from '../../helpers/ui.helpers';
import { DateTimeHelper } from '../../helpers/datetime.helper';
import { Commonservice } from '../../services/commonservice.service';
import { NotesModel } from '../../models/purchaserequest/notes';
import { CustomerEntityType, PurchaseInquiryStatus, PurchaseInquiryItemStatus, OperationType } from '../../enums/enums';
import { ISubscription } from 'rxjs/Subscription';

import * as $ from "jquery";
import { AttachmentDetail } from '../../models/AttchmentDetail';

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
  isCancelStatus: boolean = false;

  // to disable all feilds when status is cancelled
  IsItemStatusCancel: boolean = false;

  addItem: boolean = false;
  itemGrid: boolean = true;
  tabName: string = 'home';

  isFromGrid = false;
  addOperationInProgress: boolean = false;


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
  public minValidDate: Date = DateTimeHelper.ParseDate(new Date());

  purchaseItemsModel: TempPurchaseInquiryItemModel = new TempPurchaseInquiryItemModel();
  showLoader: boolean = false;

  selectedThemeColor: string = 'opticonstants.DEFAULTTHEMECOLOR';
  // status section
  public statusValues: Array<{ text: string, value: number }> = [
    { text: "New", value: PurchaseInquiryItemStatus.New },
    { text: "Updated", value: PurchaseInquiryItemStatus.Updated },
    { text: "Cancelled", value: PurchaseInquiryItemStatus.Cancelled }
  ];

  //dropdown diable flag
  public IsStatusDisbale: boolean = false;

  // Subscriber
  itemSub: ISubscription;
  additemSub: ISubscription;
  getitemSub: ISubscription;
  updateitemSub: ISubscription;
  updatePISub: ISubscription;

  @Input() currentSidebarInfo: CurrentSidebarInfo;

  constructor(private purchaseInquiryService: PurchaseInquiryService, private commonService: Commonservice) {
  }

  ngOnDestroy() {
    if (this.itemSub != undefined)
      this.itemSub.unsubscribe();

    if (this.additemSub != undefined)
      this.additemSub.unsubscribe();

    if (this.getitemSub != undefined)
      this.getitemSub.unsubscribe();

    if (this.updateitemSub != undefined)
      this.updateitemSub.unsubscribe();

    if (this.updatePISub != undefined)
    this.updatePISub.unsubscribe();
  }

  ngOnInit() {
    //console.log("onInit selectedItemId:" + this.selectedItemId);
    // Apply Grid Height
    this.gridHeight = UIHelper.getMainContentHeight();
    // Check Mobile device
    this.isMobile = UIHelper.isMobile();
    
    //get status of selected inquiry for disabling or enabling  forms
    let inquiryDetail: string = localStorage.getItem("SelectedPurchaseInquery");
    if (inquiryDetail != null && inquiryDetail != undefined) {
      let inquiryData: any = JSON.parse(inquiryDetail);
      let inquiryStatus = inquiryData.Status;
      if (inquiryStatus == PurchaseInquiryStatus.Cancelled) {
        this.isCancelStatus = true;
        this.purchaseItemsModel.Status = PurchaseInquiryStatus.New;
      }
    }

    // GET current theme colour
    this.commonService.themeCurrentData.subscribe(
      data => {
        this.selectedThemeColor = data;
      }
    );
    this.itemSub = this.commonService.currentItemData.subscribe(
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
    // Set home tab active on click on any record
    $('#opti_ItemHomeTabID').click();
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
    this.selectedItemId = '';

    //reset data source when new intem added.
    this.statusValues = [
      { text: "New", value: PurchaseInquiryItemStatus.New },
      { text: "Cancelled", value: PurchaseInquiryItemStatus.Cancelled }
    ];

    this.showItemForm();
    this.resetDefaultItemData();

    this.IsStatusDisbale = true;
    this.IsItemStatusCancel = false;
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
    this.addOperationInProgress = false;

    this.isFromGrid = true;
    const selectedData = this.gridItemsData[selection.index];

    // store item data in local storage
    localStorage.setItem("SelectedPurchaseInquiryItem", JSON.stringify(selectedData));

    this.purchaseItemsModel = JSON.parse(JSON.stringify(selectedData));
    this.requestDate = DateTimeHelper.ParseDate(this.purchaseItemsModel.RequestDate);
    this.requiredDate = DateTimeHelper.ParseDate(this.purchaseItemsModel.RequiredDate);

    this.purchaseItemsModel.RequestDate = this.requestDate;
    this.purchaseItemsModel.RequiredDate = this.requiredDate;
    this.selectedItemId = this.purchaseItemsModel.PurchaseInquiryItemId;
    

    // On selection of item check if status is cancel or not 
    if (this.purchaseItemsModel.Status == PurchaseInquiryItemStatus.Cancelled) {
      this.purchaseItemsModel.Status = PurchaseInquiryItemStatus.Cancelled;
      this.IsStatusDisbale = true;
      this.IsItemStatusCancel = true;
    }
    else if (this.purchaseItemsModel.Status == PurchaseInquiryItemStatus.Updated) {
      this.statusValues = [
        { text: "Updated", value: PurchaseInquiryItemStatus.Updated },
        { text: "Cancelled", value: PurchaseInquiryItemStatus.Cancelled }];
      this.purchaseItemsModel.Status = PurchaseInquiryItemStatus.Updated;
    }
    else {
      this.statusValues = [
        { text: "New", value: PurchaseInquiryItemStatus.New },
        { text: "Cancelled", value: PurchaseInquiryItemStatus.Cancelled }];
      this.IsStatusDisbale = false;
      this.IsItemStatusCancel = false;
    }
    this.showItemForm();


  }


  /**
    * Method to get list of inquries from server.
    */
  public getInquiryItemsData(inquiryId: string) {
    this.showLoader = true;
    this.getitemSub = this.purchaseInquiryService.getInquiryItemList(inquiryId).subscribe(
      inquiryItemData => {
        this.showLoader = false;
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
  public OnSaveOperationClick(saveAndNew: boolean = false) {



    if (this.selectedItemId != '') { //case of update PI
      // On selection of item check if status is cancel or not 
      if (this.purchaseItemsModel.Status == PurchaseInquiryItemStatus.Cancelled) {
        this.purchaseItemsModel.Status = PurchaseInquiryItemStatus.Cancelled;
        this.IsStatusDisbale = true;
        this.IsItemStatusCancel = true;
      }
      // when item status is update 
      else if (this.purchaseItemsModel.Status == PurchaseInquiryItemStatus.Updated) {
        this.statusValues = [
          { text: "Updated", value: PurchaseInquiryItemStatus.Updated },
          { text: "Cancelled", value: PurchaseInquiryItemStatus.Cancelled }];
        this.purchaseItemsModel.Status = PurchaseInquiryItemStatus.Updated;

      }
      // if status is already new 
      else if (this.purchaseItemsModel.Status == PurchaseInquiryItemStatus.New) {
        this.statusValues = [
          { text: "Updated", value: PurchaseInquiryItemStatus.Updated },
          { text: "Cancelled", value: PurchaseInquiryItemStatus.Cancelled }];
        this.purchaseItemsModel.Status = PurchaseInquiryItemStatus.Updated;

      }
      else {
        this.statusValues = [
          { text: "New", value: PurchaseInquiryItemStatus.New },
          { text: "Cancelled", value: PurchaseInquiryItemStatus.Cancelled }];
        this.IsStatusDisbale = false;
      }
      // when status is cancelled and click on saveandnew
      if (saveAndNew == true) {
        this.IsItemStatusCancel = false;
      }
      this.UpdatePurchaseInquiryItem(saveAndNew);
    }
    else { // case of add PI
      this.AddPurchaseInquiryItem(saveAndNew);
    }
    // if (this.isFromGrid) {
    //   this.UpdatePurchaseInquiryItem();
    // } else {
    //   this.AddPurchaseInquiryItem();
    // }
  }

  /**
  * AddPurchaseInquiryItem
  */
  public AddPurchaseInquiryItem(saveAndNew: boolean = false) {
    this.purchaseItemsModel.PurchaseInquiryId = this.receivedPurchaseInquiryId;
    this.showLoader = true;
    
    this.additemSub = this.purchaseInquiryService.AddPurchaseInquiryItem(this.purchaseItemsModel).subscribe(
      data => {
        //this.gridItemsData = JSON.parse(data);
        //this.purchaseItemsModel = JSON.parse(data);
        //this method is updating the status if notes updated then update inquiry status.
        this.callPurchaseInquiryStatusUpdateAPI();
        let tempData: any = data;
        this.purchaseItemsModel = tempData;
        this.purchaseItemsModel.RequiredDate = DateTimeHelper.ParseDate(this.purchaseItemsModel.RequiredDate);
        this.purchaseItemsModel.RequestDate = DateTimeHelper.ParseDate(this.purchaseItemsModel.RequestDate);
        this.getInquiryItemsData(this.receivedPurchaseInquiryId);
        
        if (saveAndNew) {
          //reset data source when new intem added.
          this.statusValues = [
            { text: "New", value: PurchaseInquiryItemStatus.New },
            { text: "Cancelled", value: PurchaseInquiryItemStatus.Cancelled }
          ];
          this.selectedItemId = '';
          this.resetValuesAndShowForm();
          this.purchaseItemsModel.Status = PurchaseInquiryItemStatus.New;
          this.IsStatusDisbale = true;
        } else {
          this.selectedItemId = this.purchaseItemsModel.PurchaseInquiryItemId
          //this.showItemsGrid();
          this.addOperationInProgress = false;
          this.statusValues = [
            { text: "New", value: PurchaseInquiryItemStatus.New },
            { text: "Cancelled", value: PurchaseInquiryItemStatus.Cancelled }];
          this.IsStatusDisbale = false;
        }
        this.showLoader = false;
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
    this.showLoader = true;
    this.updateitemSub = this.purchaseInquiryService.UpdatePurchaseInquiryItem(this.purchaseItemsModel).subscribe(
      data => {
        //this method is updating the status if notes updated then update inquiry status.
        this.callPurchaseInquiryStatusUpdateAPI();
        let tempData: any = data;
        this.purchaseItemsModel = tempData;
        this.purchaseItemsModel.RequiredDate = DateTimeHelper.ParseDate(this.purchaseItemsModel.RequiredDate);
        this.purchaseItemsModel.RequestDate = DateTimeHelper.ParseDate(this.purchaseItemsModel.RequestDate);
        this.getInquiryItemsData(this.receivedPurchaseInquiryId);

        if (saveAndNew) {
          //reset data source when new intem added.
          this.statusValues = [
            { text: "New", value: PurchaseInquiryItemStatus.New },
            { text: "Cancelled", value: PurchaseInquiryItemStatus.Cancelled }
          ];
          this.selectedItemId = '';
          this.resetValuesAndShowForm();
          this.purchaseItemsModel.Status = PurchaseInquiryItemStatus.New;
          this.IsStatusDisbale = true;
          // this.IsItemStatusCancel = false;
        } else {

          this.selectedItemId = this.purchaseItemsModel.PurchaseInquiryItemId;
          //if user click on save and status was new then save it with updated status.
          if (this.purchaseItemsModel.Status == PurchaseInquiryItemStatus.New) {

            this.statusValues = [
              { text: "Updated", value: PurchaseInquiryItemStatus.Updated },
              { text: "Cancelled", value: PurchaseInquiryItemStatus.Cancelled }];
            this.purchaseItemsModel.Status = PurchaseInquiryItemStatus.Updated;
          }
          // we can reassign the selectedItemId value here
          //   this.showItemsGrid();
          // this.showItemsGrid();        
        }
        this.showLoader = false;
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

  /**
  * call api for update status of inquiry. 
  */
  callPurchaseInquiryStatusUpdateAPI() {
    let purchaseInquiryDetail: TempPurchaseInquiryModel = new TempPurchaseInquiryModel();
    //check from local storage.
    if (parseInt(localStorage.getItem("OperationType")) == OperationType.Update) {
      purchaseInquiryDetail = JSON.parse(localStorage.getItem('SelectedPurchaseInquery'));
      if (purchaseInquiryDetail.Status == PurchaseInquiryStatus.New) {
        purchaseInquiryDetail.Status = PurchaseInquiryStatus.Updated;
        this.updatePISub = this.purchaseInquiryService.UpdatePurchaseInquiry(purchaseInquiryDetail).subscribe(
          data => {
            localStorage.setItem("SelectedPurchaseInquery",JSON.stringify(data)); 
            
             purchaseInquiryDetail = JSON.parse( localStorage.getItem('SelectedPurchaseInquery'));
            this.commonService.refreshPIList(null);
            // localStorage.setItem('SelectedPurchaseInquery', JSON.stringify(data));
          }, error => {
            this.commonService.refreshPIList(null);
          }, () => { }
        );
      }
    }
  }

  // tab code start
  openTab(evt, tabName) {
    if (this.addOperationInProgress == true) {
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
    else if (tabName == 'attachement') {
      let attachmentdata: AttachmentDetail = new AttachmentDetail();
      attachmentdata.ParentId = this.purchaseItemsModel.PurchaseInquiryItemId;
      attachmentdata.ParentType = CustomerEntityType.PurchaseInquiryItem;

      attachmentdata.GrandParentId = this.receivedPurchaseInquiryId;
      attachmentdata.GrandParentType = CustomerEntityType.PurchaseInquiry;

      this.commonService.setAttachementItemData(attachmentdata);
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
    this.purchaseItemsModel.Status = PurchaseInquiryItemStatus.New;
    this.addOperationInProgress = true;

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

