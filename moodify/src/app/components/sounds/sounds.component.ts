import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, debounceTime, distinctUntilChanged, Observable, Subject, switchMap, tap } from 'rxjs';
import { AudioService } from 'src/app/core/services/audio.service';
import { Sound } from 'src/app/models/sound';
import { StreamState } from 'src/app/models/stream-state';
import { SoundsService } from './sounds.service';

@Component({
  selector: 'app-sounds',
  templateUrl: './sounds.component.html',
  styleUrls: ['./sounds.component.scss'],
  providers: [AudioService]
})
export class SoundsComponent implements OnInit {
  sounds = new Observable<Sound[]>();
  searchValue$ = new BehaviorSubject<string>('');
  state!: StreamState;
  currentFile!: Sound;

  constructor(private soundsService: SoundsService, private audioService: AudioService) {}

  ngOnInit(): void {
    this.handleSearch();
    
    this.audioService.getState().subscribe((state) => {
      this.state = state;
    });

  }

  indentify(_index: number, item: Sound): number {
    return item.id;
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
    this.audioService.setVolumeWithMultiplier(value);
  }

  search(value: string): void {
    this.searchValue$.next(value);
  }

  private handleSearch(): void {
    this.sounds = this.searchValue$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((name) => this.soundsService.getSounds(name))
    )
  }

  private playStream(url: string): void {
    this.audioService.playStream(url).subscribe();
  }
}
