import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Sound } from 'app/core/models/sound';
import { filter, first, map, Observable, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectSoundsAndMoods } from './state/admin.selectors';
import { AdminActions } from './state/admin.actions';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  data$!: Observable<Sound[]>;
  constructor(private activatedRoute: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    this.data$ = this.store.select(selectSoundsAndMoods);
    this.activatedRoute.data.pipe(
      first(),
      filter((data: Data) => !!data['sounds']),
      map((data: Data) => data['sounds']),
      tap(soundsAndMoods => this.store.dispatch(AdminActions.loadSoundsAndMoodsSuccess({soundsAndMoods})))
    ).subscribe()
  }

  showSound(sound: Sound): void {
    this.store.dispatch(AdminActions.showSound({sound}))
  }

  hideSound(sound: Sound): void {
    this.store.dispatch(AdminActions.hideSound({sound}))
  }
}
