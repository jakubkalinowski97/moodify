import { createReducer, on } from '@ngrx/store';

import { LoginActions } from './login.actions';
import { AuthState } from './login.state';

export const loginFeatureKey = 'auth';

export const initialState: AuthState = { 
        user: null, 
        isAdmin: false, 
        error: null
    };

export const loginReducer = createReducer(
  initialState,
  on(LoginActions.loginSuccess, (state, { user }) => ({ ...state, user, isAdmin: user?.app_metadata?.roles?.includes('admin') || false })),
  on(LoginActions.loginFailure, (state, { error }) => ({ ...state, error }))
);