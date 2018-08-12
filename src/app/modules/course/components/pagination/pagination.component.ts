import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent {

  @Input()
  public isEmptyList: boolean;

  @Output()
  public loadMoreEvent: EventEmitter<void> = new EventEmitter();

  public loadMore() {
    this.loadMoreEvent.emit();
  }

}
