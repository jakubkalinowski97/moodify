import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Sound } from 'app/core/models/sound';
import { filter, map, Observable } from 'rxjs';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  data$!: Observable<Sound[]>;
  constructor(private activatedRoute: ActivatedRoute, private adminService: AdminService) {}

  ngOnInit(): void {
      this.data$ = this.activatedRoute.data.pipe(
        filter((data: Data) => !!data['sounds']),
        map((data: Data) => data['sounds'])
      )
  }

  updateSound({id, isVisible}: {id: number, isVisible: boolean}): void {
    this.adminService.updateSoundVisibility(id, isVisible).subscribe();
  }
}
