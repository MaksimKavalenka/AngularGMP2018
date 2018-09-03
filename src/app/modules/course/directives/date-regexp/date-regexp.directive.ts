import { Directive, forwardRef, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import * as moment from 'moment';

@Directive({
  selector: '[appDateRegexp]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => DateRegexpDirective),
    multi: true,
  }],
})
export class DateRegexpDirective implements Validator {

  @Input()
  public appDateRegexp: string;

  validate = (control: AbstractControl): { [key: string]: any } | null => {
    return this.appDateRegexp && moment(control.value, this.appDateRegexp, true).isValid()
      ? null : { regexp: { regexp: this.appDateRegexp, value: control.value } };
  }

}
