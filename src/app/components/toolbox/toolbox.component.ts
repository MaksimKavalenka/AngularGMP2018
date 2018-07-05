import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.css'],
})
export class ToolboxComponent implements OnInit {

  public searchQuery: string;

  @Output()
  public searchEvent: EventEmitter<string> = new EventEmitter();

  public constructor() { }

  public ngOnInit() { }

  public search() {
    this.searchEvent.emit(this.searchQuery);
  }

}
