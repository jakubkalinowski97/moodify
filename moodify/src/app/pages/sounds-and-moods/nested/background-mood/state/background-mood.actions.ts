import { createActionGroup, props } from "@ngrx/store";
import { Sound } from "app/core/models/sound";

export const BackgroundMoodsActions = createActionGroup({
    source: 'Background Moods',
    events: {
        'Load Moods': props<{categoryId: number}>(),
        'Load Moods Success': props<{moods: Sound[]}>(),
        'Load Moods Error': props<{error: Error}>()
    }
});

