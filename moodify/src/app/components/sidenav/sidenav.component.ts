import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/core/services/auth.service';
import { User } from 'netlify-identity-widget';
import { ToolbarService } from '../toolbar/toolbar.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  user!: User;

  constructor(private toolbarService: ToolbarService, private authService: AuthService) { }

  ngOnInit(): void {
    const user = this.authService.getUserRaw();
    if (user) {
      this.user = user;
    }
  }

  closeSidenav(): void {
    this.toolbarService.close();
  }
}
