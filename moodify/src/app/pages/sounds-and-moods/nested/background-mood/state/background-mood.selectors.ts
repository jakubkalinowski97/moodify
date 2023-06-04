import { createFeatureSelector, createSelector } from "@ngrx/store";
import { backgroundMoodsFeatureKey } from "./background-mood.reducer";
import { BackgroundMoodState } from "./background-mood.state";

export const selectBackgroundMoodsState = createFeatureSelector<BackgroundMoodState>(backgroundMoodsFeatureKey);

export const selectBackgroundMoods = createSelector(selectBackgroundMoodsState, (state) => state.moods);
export const selectBackgroundMoodsVolume = createSelector(selectBackgroundMoodsState, (state) => state.volume);
export const selectBackgroundMoodsRepeat = createSelector(selectBackgroundMoodsState, (state) => state.repeat);
export const selectBackgroundMoodsFilters = createSelector(selectBackgroundMoodsState, (state) => state.filters);
