import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Sound } from 'src/app/models/sound';

@Injectable({
  providedIn: 'root'
})
export class SoundsService {
  private PREFIX = 'http://localhost:4200/';
  private SOUNDS: Sound[] = [
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
    },
    {
      url: this.PREFIX + 'assets/sounds/vintage-phone-sound.mp3',
      posterUrl: '',
      name: 'Dzwonienie starego telefonu',
      id: 10,
      group: 'Cthulhu',
      isFavorite: false
    },
    {
      url: this.PREFIX + 'assets/sounds/gun-shot-sound.mp3',
      posterUrl: '',
      name: 'Wystrzał z pistoletu',
      id: 11,
      group: 'Cthulhu',
      isFavorite: false
    },
    {
      url: this.PREFIX + 'assets/sounds/shotgun-shot-sound.mp3',
      posterUrl: '',
      name: 'Wystrzał ze strzelby',
      id: 12,
      group: 'Cthulhu',
      isFavorite: false
    }
  ]

  constructor() { }

  getSounds(name: string): Observable<Sound[]> {
    return of(this.SOUNDS).pipe(
      map((sounds) => sounds
        .filter((sound) => sound.name.toLowerCase().includes(name.toLowerCase()))
        .sort(
          (a, b) => {
            if (a.name > b.name) {
              return 1;
            }
            if (b.name > a.name) {
                return -1;
            }
            return 0;
          }
    )));
  }
}
