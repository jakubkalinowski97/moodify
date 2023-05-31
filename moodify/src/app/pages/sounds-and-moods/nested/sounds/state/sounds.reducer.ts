import { createReducer, on } from "@ngrx/store";
import { SoundsState } from "./sounds.state";
import { SoundsActions } from "./sounds.actions";

export const soundsFeatureKey = 'sounds';

export const initialState: SoundsState = {
    sounds: []
};

export const soundsReducer = createReducer(
    initialState,
    on(SoundsActions.loadSoundsSuccess, (state, {sounds}) => ({ ...state, sounds}))
  );