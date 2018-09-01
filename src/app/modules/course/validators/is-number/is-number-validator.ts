import { AbstractControl } from '@angular/forms';
import { ValidationUtils } from '../../../../utils/validation-utils';

export function isNumberValidator(control: AbstractControl): { [key: string]: any } | null {
  return ValidationUtils.isNumber(control.value) ? null : { notNumber: { value: control.value } };
}
