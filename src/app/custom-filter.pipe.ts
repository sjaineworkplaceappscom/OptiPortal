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
      return (items.Notes!=null && items.Notes.toLowerCase().indexOf(args) != -1 ) || 
      (items.NoteText!=null && items.NoteText.toLowerCase().indexOf(args) != -1 )
      

      
    });

  }

}
