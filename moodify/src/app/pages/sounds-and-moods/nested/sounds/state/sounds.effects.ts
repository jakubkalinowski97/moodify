import { Injectable } from "@angular/core";
import { createEffect, ofType, Actions } from "@ngrx/effects";
import { SoundsActions } from "./sounds.actions";
import { EMPTY, catchError, debounceTime, distinctUntilChanged, map, switchMap } from "rxjs";
import { SoundsService } from "../sounds.service";
import { AppActions } from "app/state/app.actions";

@Injectable()
export class SoundsEffects {
    loadSounds$ = createEffect((): any => this.actions$.pipe(
            ofType(SoundsActions.loadSounds),
            debounceTime(500),
            distinctUntilChanged(),
            switchMap(
                ({name, categoryId}) => this.soundsService.getSounds(name, categoryId)
                .pipe(
                    map(sounds => SoundsActions.loadSoundsSuccess({sounds})),
                    catchError(() => { 
                        AppActions.apiRequestFailed({error: new Error('Sounds fetching failed.')}); 
                        return EMPTY;
                    })
                )
            )
        ),
    );

    constructor(
        private actions$: Actions,
        private soundsService: SoundsService
    ) { }
}