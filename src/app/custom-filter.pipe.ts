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
      (items.Status!=null && items.Status.toLowerCase().indexOf(args) != -1 ) ||
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
      (items.Status!=null && items.Status.toLowerCase().indexOf(args) != -1 ) ||
      (items.Branch!=null && items.Branch.toLowerCase().indexOf(args) != -1 ) ||
      (items.QuotationDate!=null && items.QuotationDate.toString().toLowerCase().indexOf(args) != -1 ) ||
      (items.Duedate!=null && items.Duedate.toString().toLowerCase().indexOf(args) != -1 ) ||
      (items.DocumentDate!=null && items.DocumentDate.toString().toLowerCase().indexOf(args) != -1 ) 

      
    });

  }

}
