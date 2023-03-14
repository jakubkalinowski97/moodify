import { Injectable } from '@angular/core';
import { AudioEvents } from 'app/models/audio-events.enum';
import { StreamState } from 'app/models/stream-state';
import { formatDuration } from 'date-fns';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';

@Injectable()
export class AudioService {
  private stop$ = new Subject<void>();
  private repeat$ = new BehaviorSubject<boolean>(false);
  private volume$ = new BehaviorSubject<number>(1);
  private audioObj = new Audio();
  private audioEvents = [
    AudioEvents.Ended,
    AudioEvents.Error,
    AudioEvents.Play,
    AudioEvents.Playing,
    AudioEvents.Pause,
    AudioEvents.Timeupdate,
    AudioEvents.Canplay,
    AudioEvents.Loadedmetadata,
    AudioEvents.Loadstart
  ];

  private state: StreamState = {
    currentSoundSrc: '',
    playing: false,
    readableCurrentTime: '',
    readableDuration: '',
    duration: 0,
    currentTime: 0, 
    canplay: false,
    error: false
  };

  private stateChange$: BehaviorSubject<StreamState> = new BehaviorSubject(this.state);

  constructor() { }

  getState(): Observable<StreamState> {
    return this.stateChange$.asObservable();
  }

  getRepeat(): Observable<boolean> {
    return this.repeat$.asObservable();
  }

  getVolume(): Observable<number> {
    return this.volume$.asObservable();
  }

  getVolumeValue(): number {
    return this.volume$.value;
  }

  play() {
    this.audioObj.play();
  }

  pause() {
    this.audioObj.pause();
  }

  stop() {
    this.stop$.next();
  }

  toggleRepeat(): void {
    this.repeat$.next(!this.repeat$.value);
  }

  setRepeat(value: boolean): void {
    this.repeat$.next(value);
  }

  seekTo(seconds: number) {
    this.audioObj.currentTime = seconds;
  }

  playStream(url: string) {
    return this.streamObservable(url)
      .pipe(
        // tap(console.log),
        takeUntil(this.stop$)
      );
  }

  setVolume(value: number): void {
    this.volume$.next(value);
  }

  setVolumeWithMultiplier(value: number): void {
    this.audioObj.volume = value;
  }

  private streamObservable(url: string): Observable<Event> {
     return new Observable<Event>((observer) => {
        this.audioObj.src = url;
        this.audioObj.load();
        this.audioObj.play();
  
        const handler = (event: Event) => {
          this.updateStateEvents(event);
          observer.next(event);
        }
  
        this.addEvents(this.audioObj, this.audioEvents, handler);
  
        return () => {
          this.audioObj.pause();
          this.audioObj.currentTime = 0;
          
          this.removeEvents(this.audioObj, this.audioEvents, handler);
          
          this.resetState();
        }
      });
  }

  private addEvents(obj: HTMLAudioElement, events: AudioEvents[], handler: EventListenerOrEventListenerObject) {
    Object.values(events).forEach(event => {
      obj.addEventListener(event, handler);
    });
  }

  private removeEvents(obj: HTMLAudioElement, events: AudioEvents[], handler: EventListenerOrEventListenerObject) {
    Object.values(events).forEach(event => {
      obj.removeEventListener(event, handler);
    });
  }

  private format(time: number) {
    return formatDuration({
      seconds: time
    },
    {format: ['minutes', 'seconds']});
  }

  private updateStateEvents(event: Event): void {
    switch (event.type) {
      case "canplay":
        this.state.duration = this.audioObj.duration;
        this.state.readableDuration = this.format(this.state.duration);
        this.state.canplay = true;
        this.state.currentSoundSrc = this.audioObj.src;
        break;
      case "playing":
        this.state.playing = true;
        break;
      case "pause":
        this.state.playing = false;
        break;
      case "timeupdate":
        this.state.currentTime = this.audioObj.currentTime;
        this.state.readableCurrentTime = this.format(
          this.state.currentTime
        );
        break;
      case "ended":
        if(this.repeat$.value) {
          this.audioObj.play();
        }
        break;
      case "error":
        this.resetState();
        this.state.error = true;
        break;
    }
    this.stateChange$.next(this.state);
  }

  private resetState() {
    this.state = {
      currentSoundSrc: '',
      playing: false,
      readableCurrentTime: '',
      readableDuration: '',
      duration: 0,
      currentTime: 0,
      canplay: false,
      error: false
    };
  }
}
