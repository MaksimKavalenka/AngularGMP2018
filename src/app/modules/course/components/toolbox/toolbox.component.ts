import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.css'],
})
export class ToolboxComponent {

  public searchQuery: string;

  @Output()
  public searchEvent: EventEmitter<string> = new EventEmitter();

  public search() {
    this.searchEvent.emit(this.searchQuery);
  }

}
