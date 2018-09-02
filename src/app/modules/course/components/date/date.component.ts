import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { DefaultControlValueAccessor } from '../../../common/entities/controlValueAccessor';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DateComponent),
    multi: true,
  }],
})
export class DateComponent extends DefaultControlValueAccessor {

  @Input()
  public required = false;

  @Input()
  public appDateRegexp = null;

}
