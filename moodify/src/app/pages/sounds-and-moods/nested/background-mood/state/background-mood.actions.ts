import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Filter } from "app/core/models/filter";
import { Sound } from "app/core/models/sound";

export const BackgroundMoodsActions = createActionGroup({
    source: 'Background Moods',
    events: {
        'Load Moods': props<{categoryId: number}>(),
        'Load Moods Success': props<{moods: Sound[]}>(),
        'Enable Repeat': emptyProps(),
        'Disable Repeat': emptyProps(),
        'Change Volume': props<{volume: number}>(),
        'Set Filters': props<{filters: Filter[]}>()
    }
});

