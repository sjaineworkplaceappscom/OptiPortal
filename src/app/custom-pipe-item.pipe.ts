import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customPipeItem'
})
export class CustomPipeItemPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    else {
      args = args.toLowerCase();
    }

    // "Inquiry":1,
    // "Customer":"Cust001",
    // "Name":"Samsung",
    // "Status":"Approved",
    // "CreatedDate":"02/07/2018",
    // "BuyerCreatedBy":"Ankur Sharma",
    // "ValidUntil":"10/07/2018",
    // "Reference":"ENQ653"
    return value.filter(items => {
      return items.Customer.toLowerCase().indexOf(args) != -1 ||
        items.Name.toLowerCase().indexOf(args) != -1 ||
        items.Status.toLowerCase().indexOf(args) != -1 ||
        items.BuyerCreatedBy.toLowerCase().indexOf(args) != -1 ||
        items.Reference.toLowerCase().indexOf(args) != -1;

    });
  }

}


