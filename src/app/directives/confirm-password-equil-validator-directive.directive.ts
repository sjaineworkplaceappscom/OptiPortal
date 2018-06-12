import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appConfirmPasswordEquilValidator]',
  providers:[{
    provide: NG_VALIDATORS, useExisting: ConfirmPasswordEquilValidatorDirectiveDirective,
    multi: true
  }]
})
export class ConfirmPasswordEquilValidatorDirectiveDirective implements Validator {
   @Input() appConfirmPasswordEquilValidator: string;
   constructor(){
    console.log("constructor called validator")
}
  validate(control: AbstractControl):{[key:string]: any} | null{
    console.log("inside validate method");
    
    const controlToCompair = control.parent.get(this.appConfirmPasswordEquilValidator);
    if(controlToCompair && controlToCompair.value != control.value){
      console.log('in if conditon');
      return {'notEqual': true};
    }
    return null;

  }

}
