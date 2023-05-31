import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { User } from "netlify-identity-widget";

export const LoginActions = createActionGroup({
    source: 'Auth',
    events: {
        'Login': emptyProps(),
        'Login Success': props<{user: User | null}>(),
        'Login Failure': props<{error: Error}>(),
        'Login Close': emptyProps(),
        'Logout': emptyProps(),
        'SingUp': emptyProps()
    }
});

