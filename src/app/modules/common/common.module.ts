import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ControlMessageComponent } from './components/control-message/control-message.component';
import { DebounceDirective } from './directives/debounce/debounce.directive';
import { EventService } from './services/event/event.service';

@NgModule({
  declarations: [
    ControlMessageComponent,
    DebounceDirective,
  ],
  exports: [
    ControlMessageComponent,
    DebounceDirective,
  ],
  imports: [CommonModule],
  providers: [EventService],
})
export class CustomCommonModule {
  public static forRoot(): CustomCommonModule {
    return {
      ngModule: CustomCommonModule,
      providers: [EventService],
    };
  }
}
