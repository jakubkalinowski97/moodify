import { createActionGroup, props } from "@ngrx/store";

export const AppActions = createActionGroup({
    source: 'App',
    events: {
        'API request failed': props<{error: Error}>()
    }
});

