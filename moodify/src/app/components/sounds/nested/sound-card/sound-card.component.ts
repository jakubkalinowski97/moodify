import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AudioService } from 'src/app/core/services/audio.service';
import { Sound } from 'src/app/models/sound';
import { StreamState } from 'src/app/models/stream-state';

@Component({
  selector: 'app-sound-card',
  templateUrl: './sound-card.component.html',
  styleUrls: ['./sound-card.component.scss']
})
export class SoundCardComponent {
  @Input()
  data!: Sound;
  @Input()
  state!: StreamState;

  @Output() openFile = new EventEmitter<Sound>();

  constructor(private audioService: AudioService) {}

  play() {
    this.openFile.emit(this.data);
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
}
