import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { LoginActions } from './state/login.actions';
import { selectUser } from './state/login.selectors';
import { tap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private store: Store) { }

  showLoginModal(): void {
    this.store.dispatch(LoginActions.login());
  }

  showRegistrationModal(): void {
    this.store.dispatch(LoginActions.singup());
  }

  closeLoginModal(): void {
    this.store.dispatch(LoginActions.loginClose());
  }
}
