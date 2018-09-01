import { Directive, Input, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator } from '@angular/forms';

import { isNumberValidator } from '../../validators/is-number/is-number-validator';

@Directive({
  selector: '[appIsNumber]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => IsNumberDirective),
    multi: true,
  }],
})
export class IsNumberDirective implements Validator {

  @Input('appIsNumber')
  public isNumber: any;

  validate = isNumberValidator;

}
