import { Component, Input } from '@angular/core';
import { Sound } from 'src/app/models/sound';

@Component({
  selector: 'app-sound-card',
  templateUrl: './sound-card.component.html',
  styleUrls: ['./sound-card.component.scss']
})
export class SoundCardComponent {
  @Input()
  data!: Sound;
}
