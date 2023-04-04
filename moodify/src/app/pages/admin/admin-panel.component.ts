import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Sound } from 'app/core/models/sound';
import { filter, map, Observable } from 'rxjs';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  data$!: Observable<Sound[]>;
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
      this.data$ = this.activatedRoute.data.pipe(
        filter((data: Data) => !!data['sounds']),
        map((data: Data) => data['sounds'])
      )
  }
}
