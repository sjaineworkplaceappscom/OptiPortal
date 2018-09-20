import { Component, OnInit, HostListener } from '@angular/core';
import { UIHelper } from '../../helpers/ui.helpers';
import { salesOrderAttachment } from '../../DemoData/sales-order';
import { GridComponent } from '@progress/kendo-angular-grid';
import { SalesOrder } from '../../tempmodels/sales-order';
import { ISubscription } from '../../../../node_modules/rxjs/Subscription';
import { SalesOrderService } from '../../services/sales-order.service';
import { DateTimeHelper } from '../../helpers/datetime.helper';
import { Configuration } from '../../../assets/configuration';
import { SharedComponentService } from '../../services/shared-component.service';

@Component({
  selector: 'app-sales-order-detail-attachment',
  templateUrl: './sales-order-detail-attachment.component.html',
  styleUrls: ['./sales-order-detail-attachment.component.scss']
})
export class SalesOrderDetailAttachmentComponent implements OnInit {
  imgPath = Configuration.imagePath;
  public gridData: any[];
  isMobile: boolean;
  isColumnFilter: boolean = false;
  isColumnGroup: boolean = false;
  gridHeight: number;
  showLoader: boolean = false;
  searchRequest: string = '';

  salesOrderModel: SalesOrder = new SalesOrder();
  public getSalseAttachmentubs: ISubscription;

  constructor(private salseOrderService: SalesOrderService, private sharedComponentService: SharedComponentService) { }

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


    this.salesOrderModel = JSON.parse(localStorage.getItem('SelectedSalesOrder'))
    let orderNumber: number = this.salesOrderModel.OrderNumber;
    this.getSalesOrderAttachmentList(orderNumber);

    //    this.getSalesOrderAttachmentList1();
  }

  /**
  * Method to get list of inquries from server.
 */
  public getSalesOrderAttachmentList1() {
    this.showLoader = true;
    this.gridData = salesOrderAttachment;
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
 * call api for Sales quotation detail attachment .
 */
  getSalesOrderAttachmentList(id: number) {
    this.showLoader = true;
    this.getSalseAttachmentubs = this.salseOrderService.getSalesOrderDetail(id, 3).subscribe(
      data => {

        this.showLoader = false;
        if (data != null && data != undefined) {
          this.gridData = JSON.parse(data);
          this.gridData.forEach(element => {
            element.AttachementDate = DateTimeHelper.ParseDate(element.AttachementDate);
          });

          this.showLoader = false;
        }
      }, error => {
        this.showLoader = false;
        alert("Something went wrong");
        console.log("Error: ", error)
      }, () => { }
    );
  }

  download(fileName: string) {

    let seletedAttachment = this.gridData.filter(i => i.FileName == fileName)[0];

    try {
      // Create file path from response
      let filePath: string = seletedAttachment.FullPath;//"\\\\172.16.6.20\\People\\Vaibhav\\ListofFilesRequiredForSetup.xlsx";
      if (filePath == undefined) {
        return;
      }
      this.sharedComponentService.getAtachmentFromPath(filePath)
        .subscribe(
          res => {
            if (res != undefined && res != null) {
              let fileName = res.Item1;
              let tempAttachmentId = res.Item2;

              let filepath: string = Configuration.doccumentPath + "Temp/" + tempAttachmentId + "/" + fileName;

              var a = document.createElement('a');
              document.body.appendChild(a);
              a.href = filepath;
              a.download = fileName;
              a.target = "_blank";
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
            }
          }


        );
    }
    catch (err) {
      // this.errorHandler.handledError(err, 'MsgInfoComponent.download');
    }
  }

  ngOnDestroy() {
    if (this.getSalseAttachmentubs != undefined)
      this.getSalseAttachmentubs.unsubscribe();
  }


}
