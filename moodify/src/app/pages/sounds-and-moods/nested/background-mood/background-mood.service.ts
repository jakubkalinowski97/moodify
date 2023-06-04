import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Filter } from 'app/core/models/filter';
import { Sound } from 'app/core/models/sound';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BackgroundMoodService {
  private loading$ = new Subject<boolean>();
  private selectedFilters$ = new BehaviorSubject<Filter[]>([]);

  constructor(private api: HttpClient) {}

  getLoading(): Observable<boolean> {
    return this.loading$.asObservable();
  }

  getFilters(): Observable<Filter[]> {
    return this.selectedFilters$.asObservable();
  }

  getMoods(categoryId: number): Observable<Sound[]> {
    this.loading$.next(true);

    const params = new HttpParams()
      .set('type', 'mood')
      .set('categoryId', categoryId);
    return this.api.get<Sound[]>('/api/audios', {
      params
    }).pipe(
      tap(() => this.loading$.next(false))
    );
  }
}
