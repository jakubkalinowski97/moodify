import { createActionGroup, props } from "@ngrx/store";
import { Sound } from "app/core/models/sound";

export const SoundsActions = createActionGroup({
    source: 'Sounds',
    events: {
        'Load Sounds': props<{name: string, categoryId: number}>(),
        'Load Sounds Success': props<{sounds: Sound[]}>(),
        'Load Sounds Error': props<{error: Error}>()
    }
});

