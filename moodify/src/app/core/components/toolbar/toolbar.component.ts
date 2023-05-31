import { Component, OnInit } from '@angular/core';
import { ToolbarService } from './toolbar.service';
import packageJson from '../../../../../package.json';
import { Observable } from 'rxjs';
import { User } from 'netlify-identity-widget';
import { Store } from '@ngrx/store';
import { selectUser } from 'app/pages/login/state/login.selectors';
import { LoginActions } from 'app/pages/login/state/login.actions';
import { AuthState } from 'app/pages/login/state/login.state';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  appVersion = packageJson.version;
  user$!: Observable<User | null>;
  test!: any;
  isAvailabilitySidenav$!: Observable<boolean>;
  constructor(private toolbarService: ToolbarService, private store: Store<AuthState>) {}

  ngOnInit(): void {
    this.isAvailabilitySidenav$ = this.toolbarService.isAvailable$;
    this.user$ = this.store.select(selectUser);
  }

  toggle(): void {
    this.toolbarService.toggle();
  }

  logout(): void {
    this.store.dispatch(LoginActions.logout());
  }
}
