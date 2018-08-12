import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DebounceDirective } from './directives/debounce/debounce.directive';
import { EventService } from './services/event/event.service';

@NgModule({
  declarations: [DebounceDirective],
  exports: [DebounceDirective],
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
