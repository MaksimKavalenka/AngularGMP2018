import { Observable, Subject } from 'rxjs';

export abstract class RxJsUtils {

  public static createObservable<I, O>(
    observable: Observable<I>, handlerFunc: (response: I) => O, loaderSubject: Subject<boolean>,
  ): Observable<O> {
    loaderSubject.next(true);

    return new Observable<O>((observer) => {
      observable.subscribe(
        (response) => {
          const value = handlerFunc(response);
          observer.next(value);
          loaderSubject.next(false);
        },
        (err) => {
          observer.error(err);
          loaderSubject.next(false);
        },
      );
    });
  }

}
