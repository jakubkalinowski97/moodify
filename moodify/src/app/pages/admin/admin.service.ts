import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewSound } from 'app/core/models/new-sound';
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

  updateSoundVisibility(id: number, isVisible: boolean): Observable<Object> {
    const body = {
      id,
      isVisible
    };

    return this.api.patch('/api/audiosUpdate', body);
  }

  addNewSound(sound: NewSound): Observable<Object> {
    const formData = new FormData();
    if (sound.file) {
      formData.append('file', sound.file);
    }
    formData.append('name', sound.name);
    formData.append('type', sound.type);
    formData.append('category_id', `${sound.category_id}`);
    formData.append('subcategory_id', `${sound.subcategory_id}`);
    formData.append('isVisible', `${sound.isVisible}`);


    return this.api.post('/api/audiosInsert', formData, {
      reportProgress: true,
      observe: 'events'
    });
  }
}
