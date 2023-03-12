import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Sound } from 'src/app/models/sound';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SoundsService {
  constructor(private api: HttpClient) { }

  getSounds(name: string): Observable<Sound[]> {
    const params = new HttpParams().set('type', 'sound').set('search', name);
    return this.api.get<Sound[]>('/.netlify/functions/audios', {
      params
    });
  }
}
