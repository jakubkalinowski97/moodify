import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Sound } from 'src/app/models/sound';

@Injectable({
  providedIn: 'root'
})
export class BackgroundMoodService {

  PREFIX = 'http://localhost:4200/';
  MOODS: Sound[] = [
    {
      url: this.PREFIX + 'assets/moods/jazz-bar-music.mp3',
      posterUrl: '',
      name: 'Barowa muzyka jazzowa',
      id: 0,
      group: 'Cthulhu',
      isFavorite: false
    },
    {
      url: this.PREFIX + 'assets/moods/bar-crowd-mood.mp3',
      posterUrl: '',
      name: 'Gwar ludzi',
      id: 1,
      group: 'Cthulhu',
      isFavorite: false
    },
    {
      url: this.PREFIX + 'assets/moods/nature-fireplace-mood.mp3',
      posterUrl: '',
      name: 'Ognisko',
      id: 2,
      group: 'Cthulhu',
      isFavorite: false
    },
    {
      url: this.PREFIX + 'assets/moods/fireplace-mood.mp3',
      posterUrl: '',
      name: 'Kominek',
      id: 3,
      group: 'Cthulhu',
      isFavorite: false
    },
    {
      url: this.PREFIX + 'assets/moods/light-rain-mood.mp3',
      posterUrl: '',
      name: 'Deszcz',
      id: 4,
      group: 'Cthulhu',
      isFavorite: false
    },
    {
      url: this.PREFIX + 'assets/moods/wind-mood.mp3',
      posterUrl: '',
      name: 'Wichura',
      id: 5,
      group: 'Cthulhu',
      isFavorite: false
    },
  ]

  constructor() { }

  getMoods(): Observable<Sound[]> {
    return of(this.MOODS);
  }
}
