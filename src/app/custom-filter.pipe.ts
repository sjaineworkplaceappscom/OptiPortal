import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customFilter'
})
export class CustomFilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    
    if (!args) {
      return value;
    }
    else {
      args=args.toLowerCase();
    }
   
    return value.filter(items => { 
      
      // Notes
      return (items.Notes!=null && items.Notes.toLowerCase().indexOf(args) != -1 ) ||       
      (items.NoteText!=null && items.NoteText.toLowerCase().indexOf(args) != -1 )||

      //Sales Order
      (items.OrderNumber!=null && items.OrderNumber.toString().toLowerCase().indexOf(args) != -1 ) ||
      (items.Remark!=null && items.Remark.toLowerCase().indexOf(args) != -1 ) ||
      (items.SalesEmployee!=null && items.SalesEmployee.toLowerCase().indexOf(args) != -1 ) ||
      (items.Owner!=null && items.Owner.toLowerCase().indexOf(args) != -1 ) ||
      (items.Total!=null && items.Total.toLowerCase().indexOf(args) != -1 ) ||
      (items.Servicetype!=null && items.Servicetype.toLowerCase().indexOf(args) != -1 ) ||
      (items.Status!=null && items.Status.toString().toLowerCase().indexOf(args) != -1 ) ||
      (items.Branch!=null && items.Branch.toLowerCase().indexOf(args) != -1 ) ||
      (items.DeliveryDate!=null && items.DeliveryDate.toString().toLowerCase().indexOf(args) != -1 ) ||
      (items.DocumentDate!=null && items.DocumentDate.toString().toLowerCase().indexOf(args) != -1 ) ||

      //Sales Qutation
      (items.QuotationNumber!=null && items.QuotationNumber.toString().toLowerCase().indexOf(args) != -1 ) ||
      (items.Remark!=null && items.Remark.toLowerCase().indexOf(args) != -1 ) ||
      (items.SalesEmployee!=null && items.SalesEmployee.toLowerCase().indexOf(args) != -1 ) ||
      (items.Owner!=null && items.Owner.toLowerCase().indexOf(args) != -1 ) ||
      (items.Total!=null && items.Total.toLowerCase().indexOf(args) != -1 ) ||
      (items.Servicetype!=null && items.Servicetype.toLowerCase().indexOf(args) != -1 ) ||
      (items.Status!=null && items.Status.toString().toLowerCase().indexOf(args) != -1 ) ||
      (items.Branch!=null && items.Branch.toLowerCase().indexOf(args) != -1 ) ||
      (items.QuotationDate!=null && items.QuotationDate.toString().toLowerCase().indexOf(args) != -1 ) ||
      (items.Duedate!=null && items.Duedate.toString().toLowerCase().indexOf(args) != -1 ) ||
      (items.DocumentDate!=null && items.DocumentDate.toString().toLowerCase().indexOf(args) != -1 ) ||

      // DeleiveryNotes       
       (items.DeliveryNumber!=null && items.DeliveryNumber.toString().toLowerCase().indexOf(args) != -1 ) ||
       (items.ShipDate!=null && items.ShipDate.toString().toLowerCase().indexOf(args) != -1 ) ||
       (items.DeliveredDate!=null && items.DeliveredDate.toString().toLowerCase().indexOf(args) != -1 ) ||
       (items.WayBillNumber!=null && items.WayBillNumber.toLowerCase().indexOf(args) != -1 ) ||
       (items.TrackingNumber!=null && items.TrackingNumber.toLowerCase().indexOf(args) != -1 ) ||
       (items.ModeOfShipment!=null && items.ModeOfShipment.toLowerCase().indexOf(args) != -1 ) ||
       (items.ShippingMethod!=null && items.ShippingMethod.toLowerCase().indexOf(args) != -1 ) ||
       (items.PackingSlipNumber!=null && items.PackingSlipNumber.toLowerCase().indexOf(args) != -1 ) ||
       (items.ShipToLocation!=null && items.ShipToLocation.toString().toLowerCase().indexOf(args) != -1 ) ||
       (items.TotalPrice!=null && items.TotalPrice.toString().toLowerCase().indexOf(args) != -1 ) ||

       // AdvanceShipmentNotes       
       (items.ASNNumber!=null && items.ASNNumber.toString().toLowerCase().indexOf(args) != -1 ) ||
       (items.DeliveryNumber!=null && items.DeliveryNumber.toString().toLowerCase().indexOf(args) != -1 ) ||
       (items.ShipDate!=null && items.ShipDate.toString().toLowerCase().indexOf(args) != -1 ) ||
       (items.ExpectedDeliveryDate!=null && items.ExpectedDeliveryDate.toString().toLowerCase().indexOf(args) != -1 ) ||
       (items.WayBillNumber!=null && items.WayBillNumber.toLowerCase().indexOf(args) != -1 ) ||
       (items.TrackingNumber!=null && items.TrackingNumber.toLowerCase().indexOf(args) != -1 ) ||
       (items.ModeOfShipment!=null && items.ModeOfShipment.toLowerCase().indexOf(args) != -1 ) ||
       (items.ShippingMethod!=null && items.ShippingMethod.toLowerCase().indexOf(args) != -1 ) ||
       (items.PackingSlipNumber!=null && items.PackingSlipNumber.toString().toLowerCase().indexOf(args) != -1 ) ||
       (items.ShipToLocation!=null && items.ShipToLocation.toString().toLowerCase().indexOf(args) != -1 ) ||
       (items.TotalPrice!=null && items.TotalPrice.toString().toLowerCase().indexOf(args) != -1 ) ||

       // OpenInvoice       
       (items.InvoiceNumber!=null && items.InvoiceNumber.toString().toLowerCase().indexOf(args) != -1 ) ||
       (items.InvoiceDate!=null && items.InvoiceDate.toString().toLowerCase().indexOf(args) != -1 ) ||
       (items.DueDate!=null && items.DueDate.toString().toLowerCase().indexOf(args) != -1 ) ||
       (items.Amount!=null && items.Amount.toLowerCase().indexOf(args) != -1 ) ||
       (items.Freight!=null && items.Freight.toLowerCase().indexOf(args) != -1 ) ||
       (items.Tax!=null && items.Tax.toLowerCase().indexOf(args) != -1 ) ||
       (items.TotalAmount!=null && items.TotalAmount.toLowerCase().indexOf(args) != -1 ) ||
       (items.BillToAddress!=null && items.BillToAddress.toLowerCase().indexOf(args) != -1 ) ||
       (items.ContactPerson!=null && items.ContactPerson.toString().toLowerCase().indexOf(args) != -1 ) ||

      // CPO
      (items.PurchaseOrderNumber!=null && items.PurchaseOrderNumber.toString().toLowerCase().indexOf(args) != -1 ) ||
      (items.RefrenceTypeText!=null && items.RefrenceTypeText.toLowerCase().indexOf(args) != -1 ) ||
      (items.PurchaseOrderDate!=null && items.PurchaseOrderDate.toString().toLowerCase().indexOf(args) != -1 ) ||
      (items.RefrenceNumber!=null && items.RefrenceNumber.toLowerCase().indexOf(args) != -1 ) ||
      
      // contact       
      (items.ContactName!=null && items.ContactName.toString().toLowerCase().indexOf(args) != -1 ) ||
      (items.PhoneNumber!=null && items.PhoneNumber.toString().toLowerCase().indexOf(args) != -1 ) ||
      (items.ContactEmail!=null && items.ContactEmail.toString().toLowerCase().indexOf(args) != -1 ) ||
      (items.Address!=null && items.Address.toLowerCase().indexOf(args) != -1 ) ||
      (items.StatusText!=null && items.StatusText.toString().toLowerCase().indexOf(args) != -1 )
    });

  }

}
