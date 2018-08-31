import { Component, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.css'],
})
export class ToolboxComponent {

  private static readonly SEARCH_CHARS_MIN_BOUND: number = 3;

  private searchSubject: BehaviorSubject<string> = new BehaviorSubject(null);

  public searchQuery = '';

  @Output()
  public searchEvent: EventEmitter<string> = new EventEmitter();

  public search() {
    if ((this.searchQuery.length === 0) || (this.searchQuery.length >= ToolboxComponent.SEARCH_CHARS_MIN_BOUND)) {
      this.searchEvent.emit(this.searchQuery);
    }
  }

}
