import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, BehaviorSubject, of } from 'rxjs';

import { AuthService } from './auth.service';
import { User } from '../../entities/user';
import { JsonServerURL } from '../../../../common/constants';
import { RxJsUtils } from '../../../../utils/rxjs-utils';

@Injectable()
export class NodeAuthService extends AuthService {

  public loaderSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public loaderObservable: Observable<boolean>;

  public loginSubject: BehaviorSubject<void> = new BehaviorSubject(null);
  public loginObservable: Observable<void>;

  public constructor(
    private cookieService: CookieService,
    private http: HttpClient,
  ) {
    super();
    this.loaderObservable = this.loaderSubject.asObservable();
    this.loginObservable = this.loginSubject.asObservable();
  }

  public login(login: string, password: string): Observable<void> {
    const observable = this.http.post<any>(`${JsonServerURL.AUTH}/login`, { login, password });

    const handlerFunc = (response) => {
      this.cookieService.set(AuthService.TOKEN_KEY, response.token);
      this.loginSubject.next(null);
      return null;
    };

    return RxJsUtils.createObservable<any, void>(observable, handlerFunc, this.loaderSubject);
  }

  public logout(): Observable<void> {
    const handlerFunc = () => {
      this.cookieService.delete(AuthService.TOKEN_KEY);
      console.log(`You've been logged out`);
      return null;
    };

    return RxJsUtils.createObservable<void, void>(of(null), handlerFunc, this.loaderSubject);
  }

  public isAuthenticated(): boolean {
    return !!this.cookieService.get(AuthService.TOKEN_KEY);
  }

  public getUser(): Observable<User> {
    const observable = this.http.post<User>(`${JsonServerURL.AUTH}/userinfo`, {});
    const handlerFunc = response => new User(response);
    return RxJsUtils.createObservable<User, User>(observable, handlerFunc, this.loaderSubject);
  }

}
