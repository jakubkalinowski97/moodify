import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sound } from 'app/core/models/sound';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private api: HttpClient) { }

  getSounds(): Observable<Sound[]> {
    const params = new HttpParams().set('type', 'all');

    return this.api.get<Sound[]>('/api/audios', {
      params
    })
  }
}
