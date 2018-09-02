import { Directive, forwardRef, Input } from '@angular/core';
import { NG_VALIDATORS, Validator } from '@angular/forms';

import { ValidatorUtils } from '../../../../utils/validator-utils';

@Directive({
  selector: '[appNumber]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => NumberDirective),
    multi: true,
  }],
})
export class NumberDirective implements Validator {

  @Input()
  public appNumber: any;

  validate = ValidatorUtils.numberValidator();

}
