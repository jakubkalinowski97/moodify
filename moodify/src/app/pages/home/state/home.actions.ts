import { createActionGroup, props } from "@ngrx/store";
import { Category } from "app/core/models/category";

export const HomeActions = createActionGroup({
    source: 'Home',
    events: {
        'Load Categories Success': props<{categories: Category[]}>()
    }
})