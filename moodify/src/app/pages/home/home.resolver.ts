import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { EMPTY, Observable, catchError, tap } from 'rxjs';
import { HomeService } from './services/home.service';
import { Category } from 'app/core/models/category';
import { Store } from '@ngrx/store';
import { HomeActions } from './state/home.actions';
import { AppActions } from 'app/state/app.actions';

@Injectable({
  providedIn: 'root'
})
export class HomeResolver implements Resolve<Category[]> {
  constructor(private homeService: HomeService, private store: Store) {}

  resolve(): Observable<Category[]> {
    return this.homeService.getCategories().pipe(
        tap((categories) => this.store.dispatch(HomeActions.loadCategoriesSuccess({categories}))),
        catchError(({error}) => {
          this.store.dispatch(AppActions.apiRequestFailed({error}));
          return EMPTY;
        })
    );
  }
}
