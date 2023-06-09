import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { EMPTY, Observable, catchError, tap, zip } from 'rxjs';
import { Sound } from 'app/core/models/sound';
import { SoundsService } from './nested/sounds/sounds.service';
import { BackgroundMoodService } from './nested/background-mood/background-mood.service';
import { Store } from '@ngrx/store';
import { SoundsActions } from './nested/sounds/state/sounds.actions';
import { BackgroundMoodsActions } from './nested/background-mood/state/background-mood.actions';
import { AppActions } from 'app/state/app.actions';

@Injectable({
  providedIn: 'root'
})
export class SoundsAndMoodsResolver implements Resolve<[Sound[], Sound[]]> {
  constructor(private soundsService: SoundsService, private backgroundMoodsService: BackgroundMoodService, private store: Store) {}

  resolve(route: ActivatedRouteSnapshot): Observable<[Sound[], Sound[]]> {
    const categoryId = route.params['categoryId'];
    return zip([
        this.soundsService.getSounds('', categoryId),
        this.backgroundMoodsService.getMoods(categoryId)
    ]).pipe(
        tap(([sounds, moods]) => {
            this.store.dispatch(SoundsActions.loadSoundsSuccess({sounds}));
            this.store.dispatch(BackgroundMoodsActions.loadMoodsSuccess({moods}));
        }),
        catchError(({error}) => {
          this.store.dispatch(AppActions.apiRequestFailed({error}));
          return EMPTY;
        })
    )
  }
}
