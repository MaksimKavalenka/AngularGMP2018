import { Injectable, Inject, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { IAuthService } from '../../modules/auth/services/auth/auth.service';
import { ICourseService } from '../../modules/course/services/course/course.service';

enum Service {
  AUTH = 'auth',
  COURSE = 'course',
}

export interface ILoaderService {
  loaderSubject: BehaviorSubject<boolean>;
  loaderObservable: Observable<boolean>;
}

@Injectable()
export class LoaderService implements OnDestroy {

  private loadingStatus: any = {};

  public loaderSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public loaderObservable: Observable<boolean>;

  public constructor(
    @Inject('authService') private authService: IAuthService,
    @Inject('courseService') private courseService: ICourseService,
  ) {
    this.loaderObservable = this.loaderSubject.asObservable();

    this.loadingStatus[Service.AUTH] = false;
    this.loadingStatus[Service.COURSE] = false;

    this.authService.loaderObservable.subscribe(isBeingLoaded => this.updateLoaderStatus(Service.AUTH, isBeingLoaded));
    this.courseService.loaderObservable.subscribe(isBeingLoaded => this.updateLoaderStatus(Service.COURSE, isBeingLoaded));
  }

  public ngOnDestroy() {
    this.authService.loaderSubject.unsubscribe();
    this.courseService.loaderSubject.unsubscribe();
  }

  private updateLoaderStatus(service: string, isBeingLoaded: boolean) {
    this.loadingStatus[service] = isBeingLoaded;
    this.updateLoader();
  }

  private updateLoader() {
    const isBeingLoaded: boolean = Object.keys(this.loadingStatus).some(service => this.loadingStatus[service]);
    this.loaderSubject.next(isBeingLoaded);
  }

}
