import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable, first, tap } from 'rxjs';

import { BackgroundMoodService } from './background-mood.service';
import { MoodCardComponent } from './nested/mood-card/mood-card.component';
import { ActivatedRoute } from '@angular/router';
import { Sound } from 'app/core/models/sound';
import { Store } from '@ngrx/store';
import { BackgroundMoodsActions } from './state/background-mood.actions';
import { selectBackgroundMoods, selectBackgroundMoodsFilters, selectBackgroundMoodsRepeat, selectBackgroundMoodsVolume } from './state/background-mood.selectors';
import { ToolbarService } from 'app/core/components/toolbar/toolbar.service';

@Component({
  selector: 'app-background-mood',
  templateUrl: './background-mood.component.html',
  styleUrls: ['./background-mood.component.scss']
})
export class BackgroundMoodComponent implements OnInit, AfterViewInit {
  moods$ = new Observable<Sound[]>();
  repeat$ = new Observable<boolean>();
  volume$ = new Observable<number>();
  loading$!: Observable<boolean>;
  currentFile!: Sound;

  @ViewChildren(MoodCardComponent) cards!: QueryList<MoodCardComponent>;
  @ViewChildren(MoodCardComponent, { read: ElementRef }) cardsRef!: QueryList<ElementRef>;

  constructor(private backgroundMoodService: BackgroundMoodService, private activatedRoute: ActivatedRoute, private store: Store, private toolbarService: ToolbarService) { }

  ngOnInit(): void {
    this.loading$ = this.backgroundMoodService.getLoading(); // TODO - not working
    
    this.moods$ = this.store.select(selectBackgroundMoods);
    this.repeat$ = this.store.select(selectBackgroundMoodsRepeat);
    this.volume$ = this.store.select(selectBackgroundMoodsVolume);
  }

  indentify(_index: number, item: Sound): number {
    return item.id;
  }

  ngAfterViewInit(): void {
    this.applyFilters();
  }

  setVolume(value: number): void {
    this.store.dispatch(BackgroundMoodsActions.changeVolume({volume: value}));
  }

  toggleRepeat(): void {
    this.repeat$.pipe(first()).subscribe(value => this.store.dispatch(value ? BackgroundMoodsActions.disableRepeat() : BackgroundMoodsActions.enableRepeat()));
  }

  private applyFilters(): void {
    this.store.select(selectBackgroundMoodsFilters).subscribe(filters => {
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
