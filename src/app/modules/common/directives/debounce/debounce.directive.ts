import { Directive, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({
  selector: '[appDebounce]',
})
export class DebounceDirective implements OnInit, OnDestroy {

  private inputSubject = new Subject();
  private subscription: Subscription;

  @Input('appDebounce')
  public debounceTime = 500;

  @Output()
  public debounceClick = new EventEmitter();

  public ngOnInit() {
    this.subscription = this.inputSubject.pipe(
      debounceTime(this.debounceTime),
    )
      .subscribe(e => this.debounceClick.emit(e));
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  @HostListener('ngModelChange', ['$event'])
  public inputEvent(event) {
    this.inputSubject.next(event);
  }

}
