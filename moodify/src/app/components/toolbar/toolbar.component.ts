import { Component, OnInit } from '@angular/core';
import { ToolbarService } from './toolbar.service';
import packageJson from '../../../../package.json';
import { AuthService } from '../../core/services/auth.service';
import { Observable } from 'rxjs';
import { User } from 'netlify-identity-widget';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  appVersion = packageJson.version;
  user$!: Observable<User | null>;
  isAvailabilitySidenav$!: Observable<boolean>;
  constructor(private toolbarService: ToolbarService, private authService: AuthService) {}

  ngOnInit(): void {
    this.user$ = this.authService.getUser();
    this.isAvailabilitySidenav$ = this.toolbarService.isAvailable$;
  }

  toggle(): void {
    this.toolbarService.toggle();
  }
}
