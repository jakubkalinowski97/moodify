import { Injectable } from "@angular/core";
import { createEffect, ofType, Actions } from "@ngrx/effects";
import { tap } from "rxjs";
import { AppActions } from "app/state/app.actions";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class AppEffects {
    apiRequestFailed$ = createEffect((): any => this.actions$.pipe(
            ofType(AppActions.apiRequestFailed),
            tap(({error}) => this.snackBarService.open(error.message, 'Zamknij'))
        ),
    );

    constructor(
        private actions$: Actions,
        private snackBarService: MatSnackBar
    ) { }
}