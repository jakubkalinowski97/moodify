import { createFeatureSelector, createSelector } from "@ngrx/store";
import { HomeState } from "./home.state";
import { homeFeatureKey } from "./home.reducer";

export const selectSoundsAndMoodsState = createFeatureSelector<HomeState>(homeFeatureKey);

export const selectCategories = createSelector(selectSoundsAndMoodsState, (state) => state.categories);