import { Directive, forwardRef, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appMinAuthors]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => MinAuthorsDirective),
    multi: true,
  }],
})
export class MinAuthorsDirective implements Validator {

  @Input()
  public appMinAuthors = 0;

  validate = (control: AbstractControl): { [key: string]: any } | null => {
    return control.value && control.value.length >= this.appMinAuthors
      ? null : { minAuthors: { requiredLength: this.appMinAuthors } };
  }

}
