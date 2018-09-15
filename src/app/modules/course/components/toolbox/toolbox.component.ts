import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.css'],
})
export class ToolboxComponent {

  private static readonly SEARCH_CHARS_MIN_BOUND: number = 3;

  @Output()
  public searchEvent: EventEmitter<string> = new EventEmitter();

  public search: FormGroup = new FormGroup({
    searchQuery: new FormControl(null, [Validators.minLength(ToolboxComponent.SEARCH_CHARS_MIN_BOUND)]),
  });

  public searchSubmit() {
    if ((this.search.get('searchQuery').value.length === 0)
      || (this.search.get('searchQuery').value.length >= ToolboxComponent.SEARCH_CHARS_MIN_BOUND)) {
      this.searchEvent.emit(this.search.get('searchQuery').value);
    }
  }

}
