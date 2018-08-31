import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { CookieService } from 'ngx-cookie-service';
import { Observable, BehaviorSubject, of } from 'rxjs';

import { AuthService } from './auth.service';
import { User } from '../../entities/user';
import { GuidUtils } from '../../../../utils/guid-utils';
import { RxJsUtils } from '../../../../utils/rxjs-utils';

@Injectable()
export class LocalStorageAuthService extends AuthService {

  public loaderSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public loaderObservable: Observable<boolean>;

  public loginSubject: BehaviorSubject<void> = new BehaviorSubject(null);
  public loginObservable: Observable<void>;

  public constructor(
    private cookieService: CookieService,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
  ) {
    super();
    this.loaderObservable = this.loaderSubject.asObservable();
    this.loginObservable = this.loginSubject.asObservable();
  }

  public login(login: string, password: string): Observable<void> {
    const handlerFunc = () => {
      if (this.isAuthenticated()) {
        console.log('You are already logged in');
      } else {
        const user: User = new User({
          login,
          password,
          id: GuidUtils.guid(),
          firstName: '',
          lastName: '',
        });

        this.storage.set(user.id, user);
        this.cookieService.set(AuthService.TOKEN_KEY, user.id);
        console.log(`You've been logged in: ${user.login}`);
      }

      this.loginSubject.next(null);
      return null;
    };

    return RxJsUtils.createObservable<void, void>(of(null), handlerFunc, this.loaderSubject);
  }

  public logout(): Observable<void> {
    const handlerFunc = () => {
      const token: string = this.cookieService.get(AuthService.TOKEN_KEY);
      this.cookieService.delete(AuthService.TOKEN_KEY);
      this.storage.remove(token);

      console.log(`You've been logged out`);
      return null;
    };

    return RxJsUtils.createObservable<void, void>(of(null), handlerFunc, this.loaderSubject);
  }

  public isAuthenticated(): boolean {
    return !!this.cookieService.get(AuthService.TOKEN_KEY);
  }

  public getUser(): Observable<User> {
    const handlerFunc = () => {
      const token: string = this.cookieService.get(AuthService.TOKEN_KEY);
      return this.storage.get(token);
    };

    return RxJsUtils.createObservable<void, User>(of(null), handlerFunc, this.loaderSubject);
  }

}
