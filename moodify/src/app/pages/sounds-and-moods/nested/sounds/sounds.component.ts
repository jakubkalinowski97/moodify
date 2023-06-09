import { Component, OnDestroy, OnInit } from '@angular/core';
import { AudioService } from 'app/core/services/audio.service';
import { Sound } from 'app/core/models/sound';
import { StreamState } from 'app/core/models/stream-state';
import { combineLatest, Observable, Subject } from 'rxjs';
import { shareReplay, skip, takeUntil, tap } from 'rxjs/operators';
import { SoundsService } from './sounds.service';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { SoundsActions } from './state/sounds.actions';
import { selectSearchValue, selectSounds, selectVolume } from './state/sounds.selectors';

@Component({
  selector: 'app-sounds',
  templateUrl: './sounds.component.html',
  styleUrls: ['./sounds.component.scss'],
  providers: [AudioService]
})
export class SoundsComponent implements OnInit, OnDestroy {
  sounds$ = new Observable<Sound[]>();
  state$ = new Observable<StreamState>();
  loading$!: Observable<boolean>;
  volume$!: Observable<number>;
  currentFile!: Sound;
  private onDestroy$ = new Subject<void>();

  constructor(private soundsService: SoundsService, private audioService: AudioService, private activatedRoute: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    this.loading$ = this.soundsService.getLoading();
    this.state$ = this.audioService.getState().pipe(shareReplay(1));
    this.sounds$ = this.store.select(selectSounds);
    this.volume$ = this.store.select(selectVolume)
      .pipe(tap(volume => this.audioService.setVolumeWithMultiplier(volume)));

    this.handleSearch();
  }

  ngOnDestroy(): void {
      this.onDestroy$.next();
      this.onDestroy$.complete();
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

  setVolume(volume: number): void {
    this.store.dispatch(SoundsActions.changeVolume({volume}));
  }

  search(searchValue: string): void {
    this.store.dispatch(SoundsActions.setSearchValue({searchValue}));
  }

  private handleSearch(): void {
    const searchValue$ = this.store.select(selectSearchValue);
    combineLatest([searchValue$, this.activatedRoute.params]).pipe(
      skip(1),
      takeUntil(this.onDestroy$),
      tap(([name, {categoryId}]) => this.store.dispatch(SoundsActions.loadSounds({name, categoryId})))
    ).subscribe()
  }

  private playStream(url: string): void {
    this.audioService.playStream(url).subscribe();
  }
}
