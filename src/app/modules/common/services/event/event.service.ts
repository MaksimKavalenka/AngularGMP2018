import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';

@Injectable()
export class EventService {

  private eventSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  public eventObservable = this.eventSubject.asObservable();

  public constructor(
    private router: Router,
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.pushData(null);
      }
    });
  }

  public pushData(data: any) {
    this.eventSubject.next(data);
  }

}
