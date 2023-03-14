import { Component, Input, OnInit,  } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { AudioService } from 'app/core/services/audio.service';
import { Sound } from 'app/models/sound';
import { StreamState } from 'app/models/stream-state';
@Component({
  selector: 'app-mood-card',
  templateUrl: './mood-card.component.html',
  styleUrls: ['./mood-card.component.scss'],
  providers: [AudioService]
})
export class MoodCardComponent implements OnInit {
  @Input() data!: Sound;
  @Input() repeat$!: Observable<boolean>;
  @Input() volumeMultiplier$!: Subject<number>;

  volume$ = new Observable<number>();
  isSmooth = new BehaviorSubject<boolean>(false);
  state!: StreamState;
  private isLoaded: boolean = false;

  constructor(private audioService: AudioService) {}
  
  ngOnInit(): void {
    this.audioService.getState().subscribe((state) => {
      this.state = state;
    });

    this.repeat$.subscribe((repeat) => {
        this.audioService.setRepeat(repeat);
    })

    this.volume$ = this.audioService.getVolume();

    combineLatest([
      this.volume$,
      this.volumeMultiplier$
    ]).subscribe(([volume, multiplier]) => {
        this.audioService.setVolumeWithMultiplier(volume * multiplier);
    })
  }

  setVolume(value: number): void {
    this.audioService.setVolume(value);
  }

  play() {
    if (!this.isLoaded) {
      this.openFile(this.data);
    }
    if (this.isSmooth.value) {
      this.smoothPlay(3000);
    } else {
      this.audioService.play();
    }
  }

  pause() {
    if (this.isSmooth.value) {
      this.smoothPause(3000);
    } else {
      this.audioService.pause();
    }
  }

  stop() {
    this.audioService.stop();
  }

  seekTo(value: number): void {
    this.audioService.seekTo(value);
  }

  openFile(file: Sound) {
    this.playStream(file.audio_url);
    this.isLoaded = true;
  }

  toggleIsSmooth(): void {
    this.isSmooth.next(!this.isSmooth.value);
  }


  private smoothPlay(miliseconds: number): void {
    const volumeDestination = this.audioService.getVolumeValue();
    let currentvolume = 0;
    const step = 10;
    const increaseByStep = volumeDestination / (miliseconds / step);

    const interval = setInterval(() => {
      this.setVolume(currentvolume);
      currentvolume += increaseByStep;
      if (currentvolume >= volumeDestination) {
        clearInterval(interval);
      }
    }, step);
    this.audioService.play();
  }

  private smoothPause(miliseconds: number): void {
    const volumeDestination = this.audioService.getVolumeValue();
    let currentvolume = volumeDestination;
    const step = 10;
    const decreaseByStep = volumeDestination / (miliseconds / step);

    const interval = setInterval(() => {
      this.setVolume(currentvolume);
      currentvolume -= decreaseByStep;
      if (currentvolume <= 0) {
        this.audioService.pause();
        clearInterval(interval);
      }
    }, step);
  }

  private playStream(url: string): void {
    this.audioService.playStream(url).pipe().subscribe();
  }
}
