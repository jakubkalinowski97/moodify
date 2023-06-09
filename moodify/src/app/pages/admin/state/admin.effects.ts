import { Injectable } from "@angular/core";
import { createEffect, ofType, Actions } from "@ngrx/effects";
import { EMPTY, catchError, distinctUntilChanged, map, mergeMap, switchMap } from "rxjs";
import { AdminActions } from "./admin.actions";
import { AdminService } from "../admin.service";
import { AppActions } from "app/state/app.actions";

@Injectable()
export class AdminEffects {
    loadSoundsAndMoods$ = createEffect((): any => this.actions$.pipe(
        ofType(AdminActions.loadSoundsAndMoods),
        switchMap(
            () => this.adminService.getSoundsAndMoods()
                .pipe(
                    map(soundsAndMoods => AdminActions.loadSoundsAndMoodsSuccess({ soundsAndMoods })),
                    catchError(() => {
                        AppActions.apiRequestFailed({ error: new Error('Admin sounds and moods fetching failed.') });
                        return EMPTY;
                    })
                )
        )
    ));

    showSound$ = createEffect((): any => this.actions$.pipe(
        ofType(AdminActions.showSound),
        distinctUntilChanged(),
        mergeMap(
            ({ sound }) => this.adminService.updateSoundVisibility(sound.id, true)
                .pipe(
                    catchError(() => { 
                        AppActions.apiRequestFailed({ error: new Error('Sound visibility change failed.') });
                        return EMPTY;
                    })
                )
        )
    ));

    hideSound$ = createEffect((): any => this.actions$.pipe(
        ofType(AdminActions.hideSound),
        distinctUntilChanged(),
        mergeMap(
            ({ sound }) => this.adminService.updateSoundVisibility(sound.id, false)
        )
    ));

    constructor(
        private actions$: Actions,
        private adminService: AdminService
    ) { }
}