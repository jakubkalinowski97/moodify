import { createReducer, on } from "@ngrx/store";
import { BackgroundMoodState } from "./background-mood.state";
import { BackgroundMoodsActions } from "./background-mood.actions";

export const backgroundMoodsFeatureKey = 'backgroundMoods';

export const initialState: BackgroundMoodState = {
    moods: []
};

export const backgroundMoodsReducer = createReducer(
    initialState,
    on(BackgroundMoodsActions.loadMoodsSuccess, (state, {moods}) => ({ ...state, moods}))
  );