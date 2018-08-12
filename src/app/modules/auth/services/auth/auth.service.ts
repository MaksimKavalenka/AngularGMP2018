import { Observable, BehaviorSubject } from 'rxjs';

import { User } from '../../entities/user';

export interface IAuthService {
  loadingSubject: BehaviorSubject<boolean>;
  loadingObservable: Observable<boolean>;

  loginSubject: BehaviorSubject<void>;
  loginObservable: Observable<void>;

  login(login: string, password: string): Observable<void>;
  logout(): Observable<void>;
  isAuthenticated(): boolean;
  getUser(): Observable<User>;
}

export abstract class AuthService implements IAuthService {

  public static readonly TOKEN_KEY: string = 'token';

  public abstract loadingSubject: BehaviorSubject<boolean>;
  public abstract loadingObservable: Observable<boolean>;

  public abstract loginSubject: BehaviorSubject<void>;
  public abstract loginObservable: Observable<void>;

  public abstract login(login: string, password: string): Observable<void>;
  public abstract logout(): Observable<void>;
  public abstract isAuthenticated(): boolean;
  public abstract getUser(): Observable<User>;
}
