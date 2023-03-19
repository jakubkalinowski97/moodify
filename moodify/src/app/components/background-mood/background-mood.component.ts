import { AfterViewInit, Component, ElementRef, OnInit, QueryList, Renderer2, ViewChildren, ViewContainerRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { AudioService } from '../../core/services/audio.service';
import { Sound } from '../../core/models/sound';
import { StreamState } from '../../core/models/stream-state';
import { BackgroundMoodService } from './background-mood.service';
import { MoodCardComponent } from './nested/mood-card/mood-card.component';

@Component({
  selector: 'app-background-mood',
  templateUrl: './background-mood.component.html',
  styleUrls: ['./background-mood.component.scss'],
  providers: [AudioService]
})
export class BackgroundMoodComponent implements OnInit, AfterViewInit {
  moods = new Observable<Sound[]>();
  repeat$ = new Observable<boolean>();
  volume$ = new BehaviorSubject<number>(0.5);
  loading$!: Observable<boolean>;
  state!: StreamState;
  currentFile!: Sound;

  @ViewChildren(MoodCardComponent) cards!: QueryList<MoodCardComponent>;
  @ViewChildren(MoodCardComponent, { read: ElementRef }) cardsRef!: QueryList<ElementRef>;

  constructor(private audioService: AudioService, private backgroundMoodService: BackgroundMoodService) { }

  ngOnInit(): void {
    this.loading$ = this.backgroundMoodService.getLoading();

    this.moods = this.backgroundMoodService.getMoods();

    this.audioService.setRepeat(true);
    this.repeat$ = this.audioService.getRepeat();

    this.audioService.getState().subscribe((state) => {
      this.state = state;
    });
  }

  ngAfterViewInit(): void {
    this.applyFilters();

  }

  setVolume(value: number): void {
    this.volume$.next(value);
  }

  toggleRepeat(): void {
    this.audioService.toggleRepeat();
  }

  private applyFilters() {
    this.backgroundMoodService.getFilters().subscribe(filters => {
      const cardElements = this.cards.map((card, index) => {
        return {
          ...card,
          ...this.cardsRef.get(index)
        }
      });
      if (filters.length === 0) {
        cardElements.forEach((card) => {
          card.nativeElement.style.display = 'block';
        });
      } else {
        cardElements.forEach((card) => {
          if (filters.some(filter => filter.id === card.data.subcategory_id)) {
            card.nativeElement.style.display = 'block';
          } else {
            card.nativeElement.style.display = 'none';
          }
        });
      }
    });
  }
}
