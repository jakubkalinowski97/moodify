import { Component } from '@angular/core';
import { Filter } from 'app/core/models/filter';
import { Store } from '@ngrx/store';
import { selectBackgroundMoodsFilters } from '../../state/background-mood.selectors';
import { first, map } from 'rxjs';
import { BackgroundMoodsActions } from '../../state/background-mood.actions';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {
  constructor(private store: Store){ }

  filters: Filter[] = [
    {
      name: 'Muzyka',
      id: 4
    },
    {
      name: 'Pogoda',
      id: 3
    },
    {
      name: 'Otoczenie',
      id: 1
    },
    {
      name: 'Podróż',
      id: 5
    }
  ];

  toggleFilter(filter: Filter): void {
    this.store.select(selectBackgroundMoodsFilters).pipe(
      first(),
      map(filters => {
        if (filters.some((currentFilter) => currentFilter.id === filter.id)) {
          this.store.dispatch(BackgroundMoodsActions.setFilters({
            filters: filters.filter((filteredFilter) => filter.id !== filteredFilter.id)
          }))
        } else {
          this.store.dispatch(BackgroundMoodsActions.setFilters({
            filters: [...filters, filter]
          }))
        }
      })
    ).subscribe();
  }
}
