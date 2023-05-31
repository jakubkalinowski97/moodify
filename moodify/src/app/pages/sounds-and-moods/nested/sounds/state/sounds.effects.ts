import { Injectable } from "@angular/core";
import { createEffect, ofType, Actions } from "@ngrx/effects";
import { SoundsActions } from "./sounds.actions";
import { EMPTY, catchError, map, switchMap } from "rxjs";
import { SoundsService } from "../sounds.service";

@Injectable()
export class SoundsEffects {
    loadSounds$ = createEffect((): any => this.actions$.pipe(
            ofType(SoundsActions.loadSounds),
            switchMap(
                ({name, categoryId}) => this.soundsService.getSounds(name, categoryId)
                .pipe(
                    map(sounds => SoundsActions.loadSoundsSuccess({sounds})),
                    catchError(() => { 
                        SoundsActions.loadSoundsError({error: new Error('Sounds fetching failed.')}); 
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