import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SoundsState } from "./sounds.state";
import { soundsFeatureKey } from "./sounds.reducer";

export const selectSoundsState = createFeatureSelector<SoundsState>(soundsFeatureKey);

export const selectSounds = createSelector(selectSoundsState, (state) => state.sounds);
