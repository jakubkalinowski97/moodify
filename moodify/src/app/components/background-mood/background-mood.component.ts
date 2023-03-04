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
  state!: StreamState;
  currentFile!: Sound;

  constructor(private audioService: AudioService, private backgroundMoodService: BackgroundMoodService) {}

  ngOnInit(): void {
    this.moods = this.backgroundMoodService.getMoods();

    this.audioService.getState().subscribe((state) => {
      this.state = state;
    });
  }

  openFile(file: any) {
    if (this.currentFile?.url && file.url === this.currentFile?.url) {
      return;
    }
    this.currentFile = file;
    this.audioService.stop();
    this.playStream(file.url);
  }  
  
  setVolume(value: number): void {
    this.audioService.setVolume(value);
  }

  private playStream(url: string): void {
    this.audioService.playStream(url).pipe().subscribe();
  }
}
