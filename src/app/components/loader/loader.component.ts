import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent implements OnInit {

  @Input()
  public isEmptyList: boolean;

  @Output()
  public loadMoreEvent: EventEmitter<void> = new EventEmitter();

  public constructor() { }

  public ngOnInit() { }

  public loadMore() {
    this.loadMoreEvent.emit();
  }

}
