import { createReducer, on } from "@ngrx/store";
import { AdminState } from "./admin.state";
import { AdminActions } from "./admin.actions";

export const adminFeatureKey = 'admin';

export const initialState: AdminState = {
    soundsAndMoods: []
};

export const adminReducer = createReducer(
    initialState,
    on(AdminActions.loadSoundsAndMoodsSuccess, (state, {soundsAndMoods}) => ({ ...state, soundsAndMoods}))
  );