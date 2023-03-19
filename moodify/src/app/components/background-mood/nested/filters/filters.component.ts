import { Component } from '@angular/core';
import { Filter } from 'app/core/models/filter';
import { BackgroundMoodService } from '../../background-mood.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {
  constructor(private backgroundMoodsService: BackgroundMoodService){ }

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
    this.backgroundMoodsService.toggleFilter(filter);
  }
}
