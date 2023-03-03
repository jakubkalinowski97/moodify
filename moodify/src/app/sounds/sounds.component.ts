import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Sound } from '../models/sound';
import { SoundsService } from './sounds.service';

@Component({
  selector: 'app-sounds',
  templateUrl: './sounds.component.html',
  styleUrls: ['./sounds.component.scss']
})
export class SoundsComponent implements OnInit {
  sounds = new Observable<Sound[]>();
  constructor(private soundsService: SoundsService) {}

  ngOnInit(): void {
    this.sounds = this.soundsService.getSounds();
  }

  indentify(_index: number, item: Sound): number {
    return item.id;
  }
}
