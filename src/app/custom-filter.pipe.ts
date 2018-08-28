import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customFilter'
})
export class CustomFilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    debugger;
    if (!args) {
      return value;
    }
    else {
      args=args.toLowerCase();
    }
   
    return value.filter(items => {      
      return (items.Notes!=null && items.Notes.toLowerCase().indexOf(args) != -1 )
      
    });

  }

}
