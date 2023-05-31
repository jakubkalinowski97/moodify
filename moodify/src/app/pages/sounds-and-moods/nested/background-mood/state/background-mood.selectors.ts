import { createFeatureSelector, createSelector } from "@ngrx/store";
import { backgroundMoodsFeatureKey } from "./background-mood.reducer";
import { BackgroundMoodState } from "./background-mood.state";

export const selectBackgroundMoodsState = createFeatureSelector<BackgroundMoodState>(backgroundMoodsFeatureKey);

export const selectBackgroundMoods = createSelector(selectBackgroundMoodsState, (state) => state.moods);
