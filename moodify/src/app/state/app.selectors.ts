import { RouterReducerState, getRouterSelectors } from "@ngrx/router-store";
import { createFeatureSelector } from "@ngrx/store";

export const selectRouter = createFeatureSelector<RouterReducerState>('router');

export const {
    selectCurrentRoute,
    selectQueryParams,
    selectQueryParam,
    selectRouteParams,
    selectRouteParam,
    selectRouteData,
    selectUrl
} = getRouterSelectors(selectRouter);