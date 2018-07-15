import { Injectable } from '@angular/core';

import { IAuthService } from './auth.service';
import { User } from '../../entities/user';

@Injectable()
export class LocalStorageAuthService implements IAuthService {

  public constructor() { }

  public login(user: User): string {
    return '';
  }

  public logout(id: string): void {

  }

  public isAuthenticated(id: string): boolean {
    return false;
  }

  public getUser(id: string): User {
    return null;
  }

}
