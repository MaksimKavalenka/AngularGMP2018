import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css'],
})
export class AuthorsComponent {

  private authorsValue: string; // TODO: Must be an array essentially

  @Output()
  public authorsChange: EventEmitter<string> = new EventEmitter();

  @Input()
  public get authors(): string {
    return this.authorsValue;
  }

  public set authors(authors: string) {
    this.authorsValue = authors;
    this.authorsChange.emit(this.authorsValue);
  }

}
