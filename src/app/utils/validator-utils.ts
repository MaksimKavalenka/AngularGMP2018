import { AbstractControl, ValidatorFn } from '@angular/forms';
import * as moment from 'moment';

import { ValidationUtils } from './validation-utils';

export abstract class ValidatorUtils {

  public static dateRegexpValidator(regexp: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return regexp && moment(control.value, regexp.toUpperCase(), true).isValid() ? null : { regexp: { regexp, value: control.value } };
    };
  }

  public static minAuthorsValidator(minAuthors: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return control.value && control.value.length >= minAuthors
        ? null : { minAuthors: { requiredLength: minAuthors } };
    };
  }

  public static numberValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return ValidationUtils.isNumber(control.value) ? null : { notNumber: { value: control.value } };
    };
  }

}
