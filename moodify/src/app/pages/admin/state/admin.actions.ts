import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Sound } from "app/core/models/sound";

export const AdminActions = createActionGroup({
    source: 'Admin',
    events: {
        'Load Sounds And Moods': emptyProps(),
        'Load Sounds And Moods Success': props<{soundsAndMoods: Sound[]}>(),
        'Show Sound': props<{sound: Sound}>(),
        'Hide Sound': props<{sound: Sound}>()
    }
});

