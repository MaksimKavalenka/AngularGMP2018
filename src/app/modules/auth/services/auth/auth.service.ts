import { Observable } from 'rxjs';

import { User } from '../../entities/user';

export interface IAuthService {
  loginObservable: Observable<void>;

  login(login: string, password: string): Observable<void>;
  logout(): Observable<void>;
  isAuthenticated(): boolean;
  getUser(): Observable<User>;
}

export abstract class AuthService implements IAuthService {

  public static readonly TOKEN_KEY: string = 'token';

  public abstract loginObservable: Observable<void>;

  public abstract login(login: string, password: string): Observable<void>;
  public abstract logout(): Observable<void>;
  public abstract isAuthenticated(): boolean;
  public abstract getUser(): Observable<User>;
}
