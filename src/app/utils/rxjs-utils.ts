import { Observable, Subject } from 'rxjs';

export abstract class RxJsUtils {

  public static createObservable<I, O>(
    observable: Observable<I>, handlerFunc: (response: I) => O, loadingSubject: Subject<boolean>,
  ): Observable<O> {
    loadingSubject.next(true);

    return new Observable<O>((observer) => {
      observable.subscribe(
        (response) => {
          const value = handlerFunc(response);
          observer.next(value);
        },
        err => observer.error(err),
        () => loadingSubject.next(false),
      );
    });
  }

}
