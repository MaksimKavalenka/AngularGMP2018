import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';

@Injectable()
export class EventService {

  private observer: Observer<any>;
  public data = new Observable<any>(observer => this.observer = observer);

  public constructor(
    private router: Router,
  ) {
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.pushData(null);
        }
      });
  }

  public pushData(data: any) {
    this.observer.next(data);
  }

}
