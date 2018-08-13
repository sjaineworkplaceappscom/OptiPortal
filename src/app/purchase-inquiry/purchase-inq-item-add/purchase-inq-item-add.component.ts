import { Component, OnInit, HostListener } from '@angular/core';
import { TempPurchaseInquiryItemModel } from '../../tempmodels/temppurchase-inquiry-item';
import { TempPurchaseInquiryModel } from '../../tempmodels/temppurchase-inquiry';
import { UIHelper } from '../../helpers/ui.helpers';

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

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    /**
     * Apply Grid Height
    */
    this.gridHeight = UIHelper.getMainContentHeight();
      
    /**
     * Check Mobile device
    */
      this.isMobile = UIHelper.isMobile();
  }


  constructor() { }

  ngOnInit() {
    /**
     * Apply Grid Height
    */
    this.gridHeight = UIHelper.getMainContentHeight();
        
    /**
      * Check Mobile device
    */
      this.isMobile = UIHelper.isMobile();
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
  }

  AddPurchaseInquiryItem(){
    this.showItemsGrid();
  }

  addItemtagain(){
    this.showItemsGrid();
  }

  closeItemForm(){
    this.showItemsGrid();
  }



}
