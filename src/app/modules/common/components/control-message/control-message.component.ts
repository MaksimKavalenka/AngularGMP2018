import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-control-message',
  templateUrl: './control-message.component.html',
  styleUrls: ['./control-message.component.css'],
})
export class ControlMessageComponent {

  @Input()
  public control: FormControl;

  public get errorMessage() {
    if (this.control) {
      for (const propertyName in this.control.errors) {
        if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
          return this.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
        }
      }
    }
    return null;
  }

  private getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    const config = {
      required: 'Required',
      minlength: `Minimum length is ${validatorValue.requiredLength}`,
      maxlength: `Maximum length is ${validatorValue.requiredLength}`,
      notNumber: `The value is not a number: ${validatorValue.value}`,
      regexp: `The value does not fit into regexp: ${validatorValue.regexp}`,
    };
    return config[validatorName];
  }

}
