import { Component, OnInit } from '@angular/core';
import { ActivationStart, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { ToolbarService } from './core/components/toolbar/toolbar.service';
import { ComponentPortal } from '@angular/cdk/portal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(public toolbarService: ToolbarService, private router: Router){}

  ngOnInit(): void {
    this.subscribeToSidenavData();
  }

  private subscribeToSidenavData(): void {
    this.router.events.pipe(
      filter((event): event is ActivationStart => event instanceof ActivationStart),
      map((activationStartEvent: ActivationStart) => activationStartEvent.snapshot.data)
    ).subscribe((data) => {
      const { isAvailabilitySidenav, componentInPortal } = data;
      this.toolbarService.setAvailability(isAvailabilitySidenav);
      if(componentInPortal) {
        this.toolbarService.setComponentInPortal(new ComponentPortal(componentInPortal));
      }
    });
  }
}
