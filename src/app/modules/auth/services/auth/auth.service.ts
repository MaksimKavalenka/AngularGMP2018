import { Observable, BehaviorSubject } from 'rxjs';

import { User } from '../../entities/user';
import { ILoaderService } from '../../../../services/loader/loader.service';

export interface IAuthService extends ILoaderService {
  loginSubject: BehaviorSubject<void>;
  loginObservable: Observable<void>;

  login(login: string, password: string): Observable<void>;
  logout(): Observable<void>;
  isAuthenticated(): boolean;
  getUser(): Observable<User>;
}

export abstract class AuthService implements IAuthService {
  public static readonly TOKEN_KEY: string = 'token';

  public abstract loaderSubject: BehaviorSubject<boolean>;
  public abstract loaderObservable: Observable<boolean>;

  public abstract loginSubject: BehaviorSubject<void>;
  public abstract loginObservable: Observable<void>;

  public abstract login(login: string, password: string): Observable<void>;
  public abstract logout(): Observable<void>;
  public abstract isAuthenticated(): boolean;
  public abstract getUser(): Observable<User>;
}
