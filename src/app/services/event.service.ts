import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Injectable()
export class EventService {

  private _selected: BehaviorSubject<any> = new BehaviorSubject(null);
  public data = this._selected.asObservable();

  public constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.pushData(null);
        }
      });
  }

  public pushData(data: any) {
    this._selected.next(data);
  }

}
