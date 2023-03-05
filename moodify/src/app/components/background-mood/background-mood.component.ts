import { Component } from '@angular/core';
import { Observable } from 'rxjs';
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
  repeat = new Observable<boolean>();
  state!: StreamState;
  currentFile!: Sound;

  constructor(private audioService: AudioService, private backgroundMoodService: BackgroundMoodService) {}

  ngOnInit(): void {
    this.moods = this.backgroundMoodService.getMoods();
    this.repeat = this.audioService.getRepeat();

    this.audioService.getState().subscribe((state) => {
      this.state = state;
    });
  }
  
  setVolume(value: number): void {
    this.audioService.setVolume(value);
  }

  toggleRepeat(): void {
    this.audioService.toggleRepeat();
  }
}
