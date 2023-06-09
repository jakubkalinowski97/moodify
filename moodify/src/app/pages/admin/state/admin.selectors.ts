import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AdminState } from "./admin.state";
import { adminFeatureKey } from "./admin.reducer";

export const selectSoundsAndMoodsState = createFeatureSelector<AdminState>(adminFeatureKey);

export const selectSoundsAndMoods = createSelector(selectSoundsAndMoodsState, (state) => state.soundsAndMoods);
