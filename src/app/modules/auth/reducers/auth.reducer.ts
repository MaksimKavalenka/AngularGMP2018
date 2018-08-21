import { ActionReducer } from '@ngrx/store';

import { AuthActions, AuthActionTypes, GetUserSuccess, LoginFailure } from '../actions/auth.actions';

const defaultState: any = {
  user: null,
  isAuthenticated: false,
};

export function authReducer(state: any = defaultState, action: AuthActions): ActionReducer<any> {
  switch (action.type) {
    case AuthActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        err: (<LoginFailure>action).err,
      };

    case AuthActionTypes.LOGOUT_SUCCESS:
      return defaultState;

    case AuthActionTypes.GET_USER_SUCCESS:
      return {
        ...state,
        user: (<GetUserSuccess>action).user,
        isAuthenticated: true,
      };

    default:
      return state;
  }
}
