import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of, BehaviorSubject } from 'rxjs';

import { AuthService } from './auth.service';
import { User } from '../../entities/user';
import { GuidUtils } from '../../../../utils/guid-utils';

@Injectable()
export class LocalStorageAuthService extends AuthService {

  private loginSubject: BehaviorSubject<void> = new BehaviorSubject(null);
  public loginObservable: Observable<void>;

  public constructor(
    private cookieService: CookieService,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
  ) {
    super();
    this.loginObservable = this.loginSubject.asObservable();
  }

  public login(login: string, password: string): Observable<void> {
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
    return of(null);
  }

  public logout(): Observable<void> {
    const token: string = this.cookieService.get(AuthService.TOKEN_KEY);
    this.cookieService.delete(AuthService.TOKEN_KEY);
    this.storage.remove(token);
    console.log(`You've been logged out`);
    return of(null);
  }

  public isAuthenticated(): boolean {
    return !!this.cookieService.get(AuthService.TOKEN_KEY);
  }

  public getUser(): Observable<User> {
    const token: string = this.cookieService.get(AuthService.TOKEN_KEY);
    return of(this.storage.get(token));
  }

}
