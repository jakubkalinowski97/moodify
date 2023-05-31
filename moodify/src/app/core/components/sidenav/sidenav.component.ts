import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'netlify-identity-widget';
import { Observable } from 'rxjs';
import { selectUser } from 'app/pages/login/state/login.selectors';
import { ToolbarService } from '../toolbar/toolbar.service';
import { AuthState } from 'app/pages/login/state/login.state';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  user$!: Observable<User | null>;

  constructor(private toolbarService: ToolbarService, private store: Store<AuthState>) { }

  ngOnInit(): void {
    this.user$ = this.store.select(selectUser);
  }

  closeSidenav(): void {
    this.toolbarService.close();
  }
}
