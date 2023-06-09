import { createReducer, on } from "@ngrx/store";
import { HomeState } from "./home.state";
import { HomeActions } from "./home.actions";

export const homeFeatureKey = 'home';

export const initialState: HomeState = {
    categories: []
}

export const homeReducer = createReducer(
    initialState,
    on(HomeActions.loadCategoriesSuccess, (state, { categories }) => ({ ...state, categories }))
) 