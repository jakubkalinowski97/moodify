import { RouterReducerState, getRouterSelectors } from "@ngrx/router-store";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "./app.state";

export const selectRouter = createFeatureSelector<RouterReducerState>('router');
export const selectApp = createFeatureSelector<AppState>('app');

export const {
    selectCurrentRoute,
    selectQueryParams,
    selectQueryParam,
    selectRouteParams,
    selectRouteParam,
    selectRouteData,
    selectUrl
} = getRouterSelectors(selectRouter);

export const selectIsNavigationLoading = createSelector(selectApp, (state) => state.isNavigationLoading);