import { Component, OnInit } from '@angular/core';
import { AudioService } from 'app/core/services/audio.service';
import { Sound } from 'app/core/models/sound';
import { StreamState } from 'app/core/models/stream-state';
import { BehaviorSubject, Observable} from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
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
  loading$!: Observable<boolean>;
  state!: StreamState;
  currentFile!: Sound;

  constructor(private soundsService: SoundsService, private audioService: AudioService) {}

  ngOnInit(): void {
    this.loading$ = this.soundsService.getLoading();

    this.handleSearch();

    this.audioService.getState().subscribe((state) => {
      this.state = state;
    });

  }

  indentify(_index: number, item: Sound): number {
    return item.id;
  }

  openFile(file: any) {
    if (this.currentFile?.audio_url && file.audio_url === this.currentFile?.audio_url) {
      return;
    }
    this.currentFile = file;
    this.audioService.stop();
    this.playStream(file.audio_url);
  }

  setVolume(value: number): void {
    this.audioService.setVolumeWithMultiplier(value);
  }

  search(value: string): void {
    this.searchValue$.next(value);
  }

  private handleSearch(): void {
    this.sounds = this.searchValue$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((name) => this.soundsService.getSounds(name))
    )
  }

  private playStream(url: string): void {
    this.audioService.playStream(url).subscribe();
  }
}
