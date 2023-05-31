import { Injectable } from "@angular/core";
import { createEffect, ofType, Actions } from "@ngrx/effects";
import { EMPTY, catchError, map, switchMap, tap } from "rxjs";
import { BackgroundMoodService } from "../background-mood.service";
import { BackgroundMoodsActions } from "./background-mood.actions";

@Injectable()
export class BackgroundMoodsEffects {
    loadBackgroundMoods$ = createEffect((): any => this.actions$.pipe(
            ofType(BackgroundMoodsActions.loadMoods),
            switchMap(
                ({categoryId}) => this.backgroundMoodsService.getMoods(categoryId)
                .pipe(
                    map(moods => BackgroundMoodsActions.loadMoodsSuccess({moods})),
                    catchError(() => { 
                        BackgroundMoodsActions.loadMoodsError({error: new Error('Background moods fetching failed.')}); 
                        return EMPTY;
                    })
                )
            )
        ),
    );

    constructor(
        private actions$: Actions,
        private backgroundMoodsService: BackgroundMoodService
    ) { }
}