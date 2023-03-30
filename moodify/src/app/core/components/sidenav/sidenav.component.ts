import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/core/services/auth.service';
import { User } from 'netlify-identity-widget';
import { Observable } from 'rxjs';
import { ToolbarService } from '../toolbar/toolbar.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  user$!: Observable<User | null>;

  constructor(private toolbarService: ToolbarService, private authService: AuthService) { }

  ngOnInit(): void {
    this.user$ = this.authService.getUser();
  }

  closeSidenav(): void {
    this.toolbarService.close();
  }
}
