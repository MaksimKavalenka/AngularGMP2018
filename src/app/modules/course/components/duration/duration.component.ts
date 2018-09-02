import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { DefaultControlValueAccessor } from '../../../common/entities/controlValueAccessor';

@Component({
  selector: 'app-duration',
  templateUrl: './duration.component.html',
  styleUrls: ['./duration.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DurationComponent),
    multi: true,
  }],
})
export class DurationComponent extends DefaultControlValueAccessor {

  @Input()
  public required = false;

  @Input()
  public appNumber = false;

}
