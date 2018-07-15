import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent {

  @Input()
  public isEmptyList: boolean;

  @Output()
  public loadMoreEvent: EventEmitter<void> = new EventEmitter();

  public constructor() { }

  public loadMore() {
    this.loadMoreEvent.emit();
  }

}
