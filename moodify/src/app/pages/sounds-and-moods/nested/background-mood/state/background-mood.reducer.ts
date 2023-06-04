import { createReducer, on } from "@ngrx/store";
import { BackgroundMoodState } from "./background-mood.state";
import { BackgroundMoodsActions } from "./background-mood.actions";

export const backgroundMoodsFeatureKey = 'backgroundMoods';

export const initialState: BackgroundMoodState = {
    moods: [],
    repeat: true,
    volume: 0.5,
    filters: []
};

export const backgroundMoodsReducer = createReducer(
    initialState,
    on(BackgroundMoodsActions.loadMoodsSuccess, (state, {moods}) => ({ ...state, moods})),
    on(BackgroundMoodsActions.enableRepeat, (state) => ({ ...state, repeat: true})),
    on(BackgroundMoodsActions.disableRepeat, (state) => ({ ...state, repeat: false})),
    on(BackgroundMoodsActions.changeVolume, (state, {volume}) => ({...state, volume})),
    on(BackgroundMoodsActions.setFilters, (state, {filters}) => ({...state, filters})),
  );