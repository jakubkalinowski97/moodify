import { Component, OnInit } from '@angular/core';
import { ActivationStart, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { ToolbarService } from './core/components/toolbar/toolbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(public toolbarService: ToolbarService, private router: Router){}

  ngOnInit(): void {
    this.setSidenavButtonVisibility();
  }

  private setSidenavButtonVisibility() {
    this.router.events.pipe(
      filter((event): event is ActivationStart => event instanceof ActivationStart),
      map((activationStartEvent: ActivationStart) => activationStartEvent.snapshot.data)
    ).subscribe((data) => {
      this.toolbarService.setAvailability(data['isAvailabilitySidenav']);
    });
  }
}
