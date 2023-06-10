import { Injectable } from "@angular/core";
import { createEffect, ofType, Actions } from "@ngrx/effects";
import { tap } from "rxjs";
import netlifyIdentity from 'netlify-identity-widget';
import { LoginActions } from "./login.actions";
import { Router } from "@angular/router";

@Injectable()
export class LoginEffects {
    login$ = createEffect((): any => this.actions$.pipe(
            ofType(LoginActions.login),
            tap(() => netlifyIdentity.open('login'))
        ),
        { dispatch: false }
    );

    logout$ = createEffect((): any => this.actions$.pipe(
            ofType(LoginActions.logout),
            tap(() => {
                netlifyIdentity.logout();
                this.router.navigate(['/']);
                netlifyIdentity.open('login');
            })
        ),
        { dispatch: false }
    )

    loginClose$ = createEffect((): any => this.actions$.pipe(
            ofType(LoginActions.loginClose),
            tap(() => netlifyIdentity.close())
        ),
        { dispatch: false }
    );

    signUp$ = createEffect((): any => this.actions$.pipe(
            ofType(LoginActions.singup),
            tap(() => netlifyIdentity.open('signup'))
        ),
        { dispatch: false }
    )

    constructor(
        private actions$: Actions,
        private router: Router
    ) { }
}