import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./login.state";
import { loginFeatureKey } from "./login.reducer";

export const selectAuthState = createFeatureSelector<AuthState>(
    loginFeatureKey
  );

export const selectUser = createSelector(
    selectAuthState,
    (state) => state.user
);

export const selectIsAdmin = createSelector(
    selectAuthState,
    (state) => state.isAdmin
);

export const selectToken = createSelector(
    selectAuthState,
    (state) => state.user?.token?.access_token
);