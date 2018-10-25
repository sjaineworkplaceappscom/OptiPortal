import { Component, OnInit, Input, HostListener } from '@angular/core';
import { CurrentSidebarInfo } from '../../models/sidebar/current-sidebar-info';
import { Configuration } from '../../helpers/Configuration';
import { UIHelper } from '../../helpers/ui.helpers';
import { GridComponent } from '../../../../node_modules/@progress/kendo-angular-grid';
import { salesOrderAttachment } from '../../DemoData/sales-order';
import { CustomerContractListModel } from '../../tempmodels/Customer-Contract-list-model';
import { ISubscription } from '../../../../node_modules/rxjs/Subscription';
import { CustomerContractService } from '../../services/customer-contract.service';
import { SharedComponentService } from '../../services/shared-component.service';
import { DateTimeHelper } from '../../helpers/datetime.helper';

@Component({
  selector: 'app-customer-contracts-attachment',
  templateUrl: './customer-contracts-attachment.component.html',
  styleUrls: ['./customer-contracts-attachment.component.scss']
})
export class CustomerContractsAttachmentComponent implements OnInit {

  @Input() currentSidebarInfo: CurrentSidebarInfo;

  showGrid:boolean=true;

  imgPath = Configuration.imagePath;
  pageLimit;
  pagination:boolean;

  isMobile: boolean;
  isColumnFilterAttachementsGrid: boolean = false;
  isColumnGroup: boolean = false;
  gridHeight: number;
  showLoader: boolean = false;

  contractModel: CustomerContractListModel = new CustomerContractListModel();
  public getAttachmentubs: ISubscription;

  public gridData: any[];

  constructor(private contractService: CustomerContractService, private sharedComponentService: SharedComponentService) { }

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


    this.contractModel = JSON.parse(localStorage.getItem('SelectedContract'))
    let orderNumber: number = this.contractModel.ContractNumber;
    this.getContractAttachmentList(orderNumber);

    // this.getSalesOrderAttachmentList();
  }

   /**
   * Method to get list of inquries from server.
  */
 public getContractAttachmentList1() {
  this.showLoader = true;
  this.gridData = salesOrderAttachment;
  setTimeout(()=>{    
    this.showLoader = false;
  }, 1000);
}

onFilterChange(checkBox:any,grid:GridComponent)
{
  if(checkBox.checked==false){
    this.clearFilter(grid);
  }
}

clearFilter(grid:GridComponent){      
  //grid.filter.filters=[];
}

 /** 
 * call api for Sales quotation detail attachment .
 */
getContractAttachmentList(id: number) {
  this.showLoader = true;
  this.getAttachmentubs = this.contractService.getContractDetail(id).subscribe(
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
      //alert("Something went wrong");
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
            // a.target = "_blank";
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
  if (this.getAttachmentubs != undefined)
    this.getAttachmentubs.unsubscribe();
}

}
