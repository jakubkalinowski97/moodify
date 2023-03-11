import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AudioService } from '../../core/services/audio.service';
import { Sound } from '../../models/sound';
import { StreamState } from '../../models/stream-state';
import { BackgroundMoodService } from './background-mood.service';

@Component({
  selector: 'app-background-mood',
  templateUrl: './background-mood.component.html',
  styleUrls: ['./background-mood.component.scss'],
  providers: [AudioService]
})
export class BackgroundMoodComponent {
  moods = new Observable<Sound[]>();
  repeat$ = new Observable<boolean>();
  volume$ = new BehaviorSubject<number>(0.5);
  state!: StreamState;
  currentFile!: Sound;

  constructor(private audioService: AudioService, private backgroundMoodService: BackgroundMoodService) {}

  ngOnInit(): void {
    this.backgroundMoodService.getTest().subscribe(console.log);
    this.moods = this.backgroundMoodService.getMoods();
    this.audioService.setRepeat(true);
    this.repeat$ = this.audioService.getRepeat();

    this.audioService.getState().subscribe((state) => {
      this.state = state;
    });
  }
  
  setVolume(value: number): void {
    this.volume$.next(value);
  }

  toggleRepeat(): void {
    this.audioService.toggleRepeat();
  }
}
