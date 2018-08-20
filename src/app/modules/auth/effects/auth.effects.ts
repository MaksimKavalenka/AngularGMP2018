import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, tap, switchMap } from 'rxjs/operators';

import { AuthActionTypes, Login, LoginSuccess, LoginFailure, GetUserSuccess } from '../actions/actions';
import { IAuthService } from '../services/auth/auth.service';
import { Path } from '../../router/constants/path';

@Injectable()
export class AuthEffects {

  public constructor(
    private actions$: Actions,
    private router: Router,
    @Inject('authService') private authService: IAuthService,
  ) { }

  @Effect()
  login$ = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN),
    switchMap((action: Login) => {
      return this.authService.login(action.login, action.password).pipe(
        map(() => new LoginSuccess()),
        catchError(err => of(new LoginFailure(err))),
      );
    }),
  );

  @Effect()
  loginSuccess$ = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    switchMap(() => {
      return this.authService.getUser().pipe(
        map(user => new GetUserSuccess(user)),
        tap(() => this.router.navigate([`/${Path.COURSES}`])),
      );
    }),
  );

  @Effect()
  logout$ = this.actions$.pipe(
    ofType(AuthActionTypes.LOGOUT),
    switchMap(() => {
      return this.authService.logout().pipe(
        map(() => this.router.navigate([`/${Path.LOGIN}`])),
      );
    }),
  );

  @Effect()
  getUser$ = this.actions$.pipe(
    ofType(AuthActionTypes.GET_USER),
    switchMap(() => {
      return this.authService.getUser().pipe(
        map(user => new GetUserSuccess(user)),
      );
    }),
  );

}
