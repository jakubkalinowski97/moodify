import { Filter } from "app/core/models/filter";
import { Sound } from "app/core/models/sound";

export interface BackgroundMoodState {
    moods: Sound[],
    repeat: boolean,
    volume: number,
    filters: Filter[]
}