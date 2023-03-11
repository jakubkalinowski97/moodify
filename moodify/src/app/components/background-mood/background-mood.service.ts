import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Sound } from 'src/app/models/sound';

@Injectable({
  providedIn: 'root'
})
export class BackgroundMoodService {

  constructor(private api: HttpClient) {}

  PREFIX = '';
  MOODS: Sound[] = [
    {
      url: this.PREFIX + 'assets/moods/jazz-bar-music.mp3',
      posterUrl: '',
      name: 'Muzyka jazzowa',
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
    {
      url: this.PREFIX + 'assets/moods/the-great-old-ones-and-other-beings-music.mp3',
      posterUrl: '',
      name: 'Muzyka Cthulhu',
      id: 6,
      group: 'Cthulhu',
      isFavorite: false
    },
    {
      url: this.PREFIX + 'assets/moods/thunder-with-rain-mood.wav',
      posterUrl: '',
      name: 'Burza',
      id: 7,
      group: 'Cthulhu',
      isFavorite: false
    },
    {
      url: this.PREFIX + 'assets/moods/city-1930s-mood-1.mp3',
      posterUrl: '',
      name: 'Miasto za dnia',
      id: 8,
      group: 'Cthulhu',
      isFavorite: false
    },
    {
      url: this.PREFIX + 'assets/moods/noir-mood.mp3',
      posterUrl: '',
      name: 'Nastrój noir',
      id: 9,
      group: 'Cthulhu',
      isFavorite: false
    },
    {
      url: this.PREFIX + 'assets/moods/bar-1920s-mood.mp3',
      posterUrl: '',
      name: 'Bar (muzyka, rozmowy, tło)',
      id: 10,
      group: 'Cthulhu',
      isFavorite: false
    },
    {
      url: this.PREFIX + 'assets/moods/nature-mood.mp3',
      posterUrl: '',
      name: 'Słoneczny dzień',
      id: 11,
      group: 'Cthulhu',
      isFavorite: false
    },
    {
      url: this.PREFIX + 'assets/moods/steam-train-interior-mood.mp3',
      posterUrl: '',
      name: 'Jazda pociągiem',
      id: 12,
      group: 'Cthulhu',
      isFavorite: false
    }
  ]

  getMoods(): Observable<Sound[]> {
    return of(this.MOODS).pipe(
      map((moods) => moods.sort(
        (a, b) => {
          if (a.name > b.name) {
            return 1;
          }
          if (b.name > a.name) {
              return -1;
          }
          return 0;
        }
    )))
  }

  getTest(): Observable<any> {
    return this.api.get('/categories');
  }
}
