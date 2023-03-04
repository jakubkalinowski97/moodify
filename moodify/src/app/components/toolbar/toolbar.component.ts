import { Component } from '@angular/core';
import { AudioService } from 'src/app/core/services/audio.service';
import { ToolbarService } from './toolbar.service';
import packageJson from '../../../../package.json';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  appVersion = packageJson.version;
  constructor(private toolbarService: ToolbarService, private audioService: AudioService) {}

  toggle(): void {
    this.toolbarService.toggle();
  }

  setVolume(value: number): void {
    this.audioService.setVolume(value);
  }
}
