import { Component } from '@angular/core';
import { ToolbarService } from '../toolbar/toolbar.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  constructor(private toolbarService: ToolbarService) {}

  closeSidenav(): void {
    this.toolbarService.close();
  }
}
