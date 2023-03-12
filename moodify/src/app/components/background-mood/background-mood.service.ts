import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Sound } from 'src/app/models/sound';

@Injectable({
  providedIn: 'root'
})
export class BackgroundMoodService {

  constructor(private api: HttpClient) {}
  getMoods(): Observable<Sound[]> {
    const params = new HttpParams().set('type', 'mood');
    return this.api.get<Sound[]>('/.netlify/functions/audios', {
      params
    });
  }
}
