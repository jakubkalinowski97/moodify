import { Sound } from "app/core/models/sound";

export interface SoundsState {
    sounds: Sound[],
    searchValue: string,
    volume: number
}