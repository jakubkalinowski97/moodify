import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Sound } from 'src/app/models/sound';

@Injectable({
  providedIn: 'root'
})
export class SoundsService {
  PREFIX = 'http://localhost:4200/';
  SOUNDS: Sound[] = [
    {
      url: this.PREFIX + 'assets/sounds/broken-radio.wav',
      posterUrl: '',
      name: 'Zepsute radio',
      id: 0,
      group: 'Cthulhu',
      isFavorite: true
    },
    {
      url: this.PREFIX + 'assets/sounds/church-bell.wav',
      posterUrl: '',
      name: 'Kościelny dzwon',
      id: 1,
      group: 'Cthulhu',
      isFavorite: false
    }, 
    {
      url: this.PREFIX + 'assets/sounds/creaking-door-open-and-close.wav',
      posterUrl: '',
      name: 'Otwarcie i zamknięcie drzwi',
      id: 2,
      group: 'Cthulhu',
      isFavorite: false
    }, 
    {
      url: this.PREFIX + 'assets/sounds/knocking-on-a-thick-wooden-door.wav',
      posterUrl: '',
      name: 'Pukanie',
      id: 3,
      group: 'Cthulhu',
      isFavorite: false
    },
    {
      url: this.PREFIX + 'assets/sounds/old-church-door-open.wav',
      posterUrl: '',
      name: 'Naciśnięcie klamki dużych drzwi',
      id: 4,
      group: 'Cthulhu',
      isFavorite: false
    },
    {
      url: this.PREFIX + 'assets/sounds/old-medieval-door-lock.wav',
      posterUrl: '',
      name: 'Zamknięcie starych drzwi',
      id: 5,
      group: 'Cthulhu',
      isFavorite: false
    },
    {
      url: this.PREFIX + 'assets/sounds/scary-wooden-door-opening.wav',
      posterUrl: '',
      name: 'Otwarcie drzwi z piskiem',
      id: 6,
      group: 'Cthulhu',
      isFavorite: false
    },
    {
      url: this.PREFIX + 'assets/sounds/thunder-with-rain.wav',
      posterUrl: '',
      name: 'Burza',
      id: 7,
      group: 'Cthulhu',
      isFavorite: false
    },
    {
      url: this.PREFIX + 'assets/sounds/train.mp3',
      posterUrl: '',
      name: 'Pociąg',
      id: 8,
      group: 'Cthulhu',
      isFavorite: false
    },
    {
      url: this.PREFIX + 'assets/sounds/car-horn-beeps.mp3',
      posterUrl: '',
      name: 'Trąbienie',
      id: 9,
      group: 'Cthulhu',
      isFavorite: false
    }
  ]

  constructor() { }

  getSounds(): Observable<Sound[]> {
    return of(this.SOUNDS);
  }
}