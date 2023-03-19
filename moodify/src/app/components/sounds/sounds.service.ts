import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sound } from 'app/core/models/sound';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SoundsService {
  private loading$ = new Subject<boolean>();
  
  constructor(private api: HttpClient) { }

  getLoading(): Observable<boolean> {
    return this.loading$.asObservable();
  }

  getSounds(name: string): Observable<Sound[]> {
    this.loading$.next(true);

    const params = new HttpParams().set('type', 'sound').set('search', name);
    return this.api.get<Sound[]>('/api/audios', {
      params
    }).pipe(
      tap(() => this.loading$.next(false))
    );;
  }
}
