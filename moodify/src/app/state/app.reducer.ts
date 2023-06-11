import { createReducer, on } from "@ngrx/store";
import { AppState } from "./app.state";
import { routerCancelAction, routerErrorAction, routerNavigatedAction, routerRequestAction } from "@ngrx/router-store";

const initialState: AppState = {
    isNavigationLoading: false,
}

export const appReducer = createReducer(
    initialState,
    on(routerRequestAction, (state) => ({ ...state, isNavigationLoading: true })),
    on(routerNavigatedAction, routerCancelAction, routerErrorAction, (state) => ({ ...state, isNavigationLoading: false}))
)