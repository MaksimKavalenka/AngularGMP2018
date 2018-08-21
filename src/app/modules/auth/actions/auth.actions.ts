import { Action } from '@ngrx/store';

import { User } from '../entities/user';

export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',
  LOGOUT = '[Auth] Logout',
  LOGOUT_SUCCESS = '[Auth] Logout Success',
  GET_USER = '[Auth] Get User',
  GET_USER_SUCCESS = '[Auth] Get User Success',
}

export class Login implements Action {
  public readonly type: AuthActionTypes = AuthActionTypes.LOGIN;

  public constructor(
    public login: string,
    public password: string,
  ) { }
}

export class LoginSuccess implements Action {
  public readonly type: AuthActionTypes = AuthActionTypes.LOGIN_SUCCESS;
}

export class LoginFailure implements Action {
  public readonly type: AuthActionTypes = AuthActionTypes.LOGIN_FAILURE;

  public constructor(
    public err: any,
  ) { }
}

export class Logout implements Action {
  public readonly type: AuthActionTypes = AuthActionTypes.LOGOUT;
}

export class LogoutSuccess implements Action {
  public readonly type: AuthActionTypes = AuthActionTypes.LOGOUT_SUCCESS;
}

export class GetUser implements Action {
  public readonly type: AuthActionTypes = AuthActionTypes.GET_USER;
}

export class GetUserSuccess implements Action {
  public readonly type: AuthActionTypes = AuthActionTypes.GET_USER_SUCCESS;

  public constructor(
    public user: User,
  ) { }
}

export type AuthActions =
  | Login
  | LoginSuccess
  | LoginFailure
  | Logout
  | GetUser
  | GetUserSuccess;
