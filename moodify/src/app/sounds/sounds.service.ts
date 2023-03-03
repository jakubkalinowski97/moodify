import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Sound } from '../models/sound';

@Injectable({
  providedIn: 'root'
})
export class SoundsService {
  SOUNDS: Sound[] = [
    {
      url: '',
      posterUrl: '',
      name: 'Kroki',
      id: 0,
      group: 'Cthulhu',
      isFavorite: true
    }, 
    {
      url: '',
      posterUrl: '',
      name: 'Skrzypiące drzwi',
      id: 1,
      group: 'Cthulhu',
      isFavorite: false
    }, 
    {
      url: '',
      posterUrl: '',
      name: 'Pukanie',
      id: 2,
      group: 'Cthulhu',
      isFavorite: false
    }, 
    {
      url: '',
      posterUrl: '',
      name: 'Miauczenie kota',
      id: 3,
      group: 'Cthulhu',
      isFavorite: false
    }
  ]

  constructor() { }

  getSounds(): Observable<Sound[]> {
    return of(this.SOUNDS);
  }
}
