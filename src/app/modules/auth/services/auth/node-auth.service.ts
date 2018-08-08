import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, Observer, of } from 'rxjs';

import { AuthService } from './auth.service';
import { User } from '../../entities/user';
import { JsonServerURL } from '../../../../common/constants';

@Injectable()
export class NodeAuthService extends AuthService {

  public constructor(
    private cookieService: CookieService,
    private http: HttpClient,
  ) {
    super();
  }

  public login(login: string, password: string): Observable<void> {
    let _observer: Observer<void>;
    const observable = new Observable<void>((observer) => {
      _observer = observer;
      _login();
    });

    const _login = () => {
      this.http.post<any>(`${JsonServerURL.AUTH}/login`, { login, password })
        .subscribe(
          (user) => {
            this.cookieService.set(AuthService.TOKEN_KEY, user.token);
            _observer.next(null);
          },
          err => _observer.error(err),
      );
    };

    return observable;
  }

  public logout(): Observable<void> {
    const userId: string = this.cookieService.get(AuthService.TOKEN_KEY);
    this.cookieService.delete(AuthService.TOKEN_KEY);
    console.log(`You've been logged out`);
    return of(null);
  }

  public isAuthenticated(): boolean {
    return !!this.cookieService.get(AuthService.TOKEN_KEY);
  }

  public getUser(): Observable<User> {
    let _observer: Observer<User>;
    const observable = new Observable<User>((observer) => {
      _observer = observer;
      _getUser();
    });

    const _getUser = () => {
      this.http.post<User>(`${JsonServerURL.AUTH}/userinfo`, {})
        .subscribe(
          (user) => {
            const _user = new User(user);
            _observer.next(_user);
          },
          err => _observer.error(err),
      );
    };

    return observable;
  }

}
