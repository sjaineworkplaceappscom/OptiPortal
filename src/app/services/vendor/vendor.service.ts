import { Injectable } from '@angular/core';
import { HttpHelper } from '../../helpers/http.helper';
import { Observable } from 'rxjs';
import { Configuration } from '../../helpers/Configuration';
import { VendorASNModel } from 'src/app/tempmodels/vendor/vendor-asn-model';
import { VendorASNContentModel } from 'src/app/tempmodels/vendor/vendor-asn-content-model';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  baseUrl = Configuration.baseServerAPIEndpoint;
  constructor(private httpHelper: HttpHelper) { 
    this.baseUrl = Configuration.baseServerAPIEndpoint;
  }

  /**
   * get List of vendor purchase inquiries.
   */
  public getVendorInquiryList(): Observable<any> {
    let url: string = this.baseUrl + "vendorpurchaseinquiry/list";
    //let reqOption: RequestOptions = new RequestOptions({ method: RequestMethod.Get, headers: headers });
    return this.httpHelper.get(url, null);
  }



  /**
   * get Vendor Detail of Vendor Purchase Inquiries.
   */
  public getVendorDetailById(id: string,type:string): Observable<any> {
    let url: string = this.baseUrl + "vendorpurchaseinquiry/detail/"+id+"/"+type;
    //let reqOption: RequestOptions = new RequestOptions({ method: RequestMethod.Get, headers: headers });
    return this.httpHelper.get(url, null);
  }


 /**
   * get List of vendor purchase order.
   */
  public getVendorPOList(): Observable<any> {
    let url: string = this.baseUrl + "vendorpurchaseorder/list";
    //let reqOption: RequestOptions = new RequestOptions({ method: RequestMethod.Get, headers: headers });
    return this.httpHelper.get(url, null);
  }



  /**
   * get Vendor detail of vendor purchase order .
   */
  public getVendorPODetailById(id: string,type:string): Observable<any> {
    let url: string = this.baseUrl + "vendorpurchaseorder/detail/"+id+"/"+type;
    //let reqOption: RequestOptions = new RequestOptions({ method: RequestMethod.Get, headers: headers });
    return this.httpHelper.get(url, null);
  }

   /**
   * get Vendor detail of Vendor updated purchase order .
   */
  public getVendorPOUpdateList(): Observable<any> {
    let url: string = this.baseUrl + "vendorpurchaseorder/updatedlist";
    //let reqOption: RequestOptions = new RequestOptions({ method: RequestMethod.Get, headers: headers });
    return this.httpHelper.get(url, null);
  }

  public SendAck(orderId): Observable<any> {
    let url: string = this.baseUrl + "vendorpurchaseorder/sendack";
    //let reqOption: RequestOptions = new RequestOptions({ method: RequestMethod.Get, headers: headers });
    return this.httpHelper.post(url, orderId,null);
  }

  /**
   * get List of Vendor Payment.
   */
  public getPaymentList(): Observable<any> {
    let url: string = this.baseUrl + "payment/list";
    //let reqOption: RequestOptions = new RequestOptions({ method: RequestMethod.Get, headers: headers });
    return this.httpHelper.get(url, null);
  }



  /**
   * get payment detail by id.
   */
  public getPaymentDetailById(id: string,type:string): Observable<any> {
    let url: string = this.baseUrl + "payment/detail/"+id+"/"+type;
    //let reqOption: RequestOptions = new RequestOptions({ method: RequestMethod.Get, headers: headers });
    return this.httpHelper.get(url, null);
  }
  
   /**
   * Add ASN. 
   */
  public AddVendorASN(request: VendorASNModel): Observable<any> {
    var data: any = { 
      "ASNId": request.ASNId,
      "PORefrenceNumber": request.POReferenceNumber,
      "Vendor": request.Vendor,
      "DeliveryDate": request.DeliveryDate,
      "ShipmentDate": request.ShipmentDate,
      "Price": request.Price,
      "TotalPrice": request.TotalPrice,
      "Discount":request.Discount,
      "WayBillNumber":request.WayBillNumber,
      "TrackingNumber":request.TrackingNumber,
      "Tax":request.Tax,
      "Frieght":request.Freight
    }
    return this.httpHelper.post(this.baseUrl + "vendorinvoicecontent/add", data, null);
  }


  /**
   * get Vendor ASN List.
   */
  public getVendorASNList(): Observable<any> {
    let url: string = this.baseUrl + "vendorasn/list";
    //let reqOption: RequestOptions = new RequestOptions({ method: RequestMethod.Get, headers: headers });
    return this.httpHelper.get(url, null);
  }

  /**
   * get Vendor ASN Detail.
   */
  public getVendorASNDetail(asnId:string): Observable<any> {
    let url: string = this.baseUrl + "vendorasn/detail/"+ asnId;
    //let reqOption: RequestOptions = new RequestOptions({ method: RequestMethod.Get, headers: headers });
    return this.httpHelper.get(url, null);
  }
  /**
   * Add Vendor ASN. 
   */
  public UpdateVASN(request: VendorASNModel): Observable<any> {
    var data: any = {
      "ASNId": request.ASNId,
      "PORefrenceNumber": request.POReferenceNumber,
      "Vendor": request.Vendor,
      "DeliveryDate": request.DeliveryDate,
      "ShipmentDate": request.ShipmentDate,
      "Price": request.Price,
      "TotalPrice": request.TotalPrice,
      "Discount": request.Discount,
      "WayBillNumber": request.WayBillNumber,
      "TrackingNumber": request.TrackingNumber,
      "Tax": request.Tax,
      "Frieght": request.Freight,
    }
    return this.httpHelper.put(this.baseUrl + "vendorasn/update", data, null);
  }
  

   /**
   * get Vendor ASN content list.
   */
  public getVendorASNContentList(asnId:string): Observable<any> {
    let url: string = this.baseUrl + "vendorasncontent/list/"+ asnId;
    //let reqOption: RequestOptions = new RequestOptions({ method: RequestMethod.Get, headers: headers });
    return this.httpHelper.get(url, null);
  }

   /**
   * Add ASN Content. 
   */
  public AddVendorASNContent(request: VendorASNContentModel): Observable<any> {
    var data: any = { 
      "ASNId": request.ASNId,
      "LineNumber": request.LineNumber,
      "Item": request.Item,
      "DeliveryDate": request.DeliveryDate,
      "UnitPrice": request.UnitPrice,
      "TotalPrice": request.TotalPrice,
      "Quantity":request.Quantity,
      "UOM":request.UOM,
      "TaxCode":request.TaxCode,
      "ShipToAddress":request.ShipToAddress,
      "BillToAddress":request.BillToAddress
    }
    return this.httpHelper.post(this.baseUrl + "vendorasncontent/add", data, null);
  }


   /**
   * Update Vendor ASN. need to change parameters
   */
  public UpdateVASNContent(request: VendorASNContentModel): Observable<any> {
    var data: any = {
      "ASNContentId": request.ASNContentId,
      "ASNId": request.ASNId,
      "LineNumber": request.LineNumber,
      "Item": request.Item,
      "DeliveryDate": request.DeliveryDate,
      "UnitPrice": request.UnitPrice,
      "TotalPrice": request.TotalPrice,
      "Quantity": request.Quantity,
      "UOM": request.UOM,
      "TaxCode": request.TaxCode,
      "ShipToAddress": request.ShipToAddress,
      "BillToAddress": request.BillToAddress,
    }
     
    return this.httpHelper.put(this.baseUrl + "vendorasncontent/update", data, null);
  }
}
