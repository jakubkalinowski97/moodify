import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AudioService } from 'src/app/core/services/audio.service';
import { Sound } from 'src/app/models/sound';
import { StreamState } from 'src/app/models/stream-state';

@Component({
  selector: 'app-mood-card',
  templateUrl: './mood-card.component.html',
  styleUrls: ['./mood-card.component.scss'],
  providers: [AudioService]
})
export class MoodCardComponent implements OnInit {
  @Input()
  data!: Sound;
  state!: StreamState;
  private isLoaded: boolean = false;

  constructor(private audioService: AudioService) {}
  
  ngOnInit(): void {
    this.audioService.getState().subscribe((state) => {
      this.state = state;
    });
  }

  play() {
    if (!this.isLoaded) {
      this.openFile(this.data);
    }
    this.audioService.play();
  }

  pause() {
    this.audioService.pause();
  }

  stop() {
    this.audioService.stop();
  }

  seekTo(value: number): void {
    this.audioService.seekTo(value);
  }

  openFile(file: Sound) {
    this.playStream(file.url);
    this.isLoaded = true;
  }  

  private playStream(url: string): void {
    this.audioService.playStream(url).pipe().subscribe();
  }
}
