import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { CookieService } from 'ngx-cookie-service';

import { IAuthService } from './auth.service';
import { User } from '../../entities/user';
import { GuidUtils } from '../../../../utils/guid-utils';

@Injectable()
export class LocalStorageAuthService implements IAuthService {

  public static readonly USER_ID_KEY: string = 'userId';

  public constructor(
    private cookieService: CookieService,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
  ) { }

  public login(email: string, password: string): User {
    let user: User;

    if (this.isAuthenticated()) {
      user = this.getUser();
      console.log(`You are already logged in: ${user.email}`);
    } else {
      user = new User(GuidUtils.guid(), '', '', email, password);
      this.storage.set(user.id, user);
      this.cookieService.set(LocalStorageAuthService.USER_ID_KEY, user.id);
      console.log(`You've been logged in: ${user.email}`);
    }

    return user;
  }

  public logout(): void {
    const userId: string = this.cookieService.get(LocalStorageAuthService.USER_ID_KEY);
    this.cookieService.delete(LocalStorageAuthService.USER_ID_KEY);
    this.storage.remove(userId);
    console.log(`You've been logged out`);
  }

  public isAuthenticated(): boolean {
    return !!this.cookieService.get(LocalStorageAuthService.USER_ID_KEY);
  }

  public getUser(): User {
    const userId: string = this.cookieService.get(LocalStorageAuthService.USER_ID_KEY);
    return this.storage.get(userId);
  }

}
