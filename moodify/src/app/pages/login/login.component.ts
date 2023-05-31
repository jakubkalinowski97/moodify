import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import netlifyIdentity from 'netlify-identity-widget';

import { AuthService } from '../../core/services/auth.service';
import { Store } from '@ngrx/store';
import { LoginActions } from './state/login.actions';
import { selectUser } from './state/login.selectors';
import { first } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private store: Store, private router: Router) { }

  ngOnInit(): void {
    this.store.select(selectUser).pipe().subscribe((user) => {
      if(user) {
        this.router.navigate(['/home']);
      } else {
        this.showLoginModal();
      }
    })
  }

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
