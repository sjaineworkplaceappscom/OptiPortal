import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customPipeItem'
})
export class CustomPipeItemPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value==null || value ==undefined)
    {
      return;
    }
    
    if (!args) {
      return value;
    }
    else {
      args = args.toLowerCase();
    }

    return value.filter(items => {
      return (items.CustomerCode!=null && items.CustomerCode.toLowerCase().indexOf(args) != -1 )||
       (items.CustomerName!=null && items.CustomerName.toLowerCase().indexOf(args) != -1) ||
        (items.StatusText!=null  && items.StatusText.toLowerCase().indexOf(args) != -1) ||
        (items.Buyer!=null  && items.Buyer.toLowerCase().indexOf(args) != -1 )||        
        (items.ReferenceNumber!=null  && items.ReferenceNumber.toLowerCase().indexOf(args) != -1);
    });
  }

}


