import { Injectable } from '@angular/core';
import netlifyIdentity from 'netlify-identity-widget';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoginActions } from 'app/pages/login/state/login.actions';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private inviteToken: string = '';

  constructor(private router: Router, private store: Store) { }

  handleNetlifyEvents(): void {
    netlifyIdentity.on('init', (user) => {
      this.store.dispatch(LoginActions.loginSuccess({ user }))
    });

    netlifyIdentity.on('login', (user) => {
        this.store.dispatch(LoginActions.loginSuccess({ user }))
        this.closeLoginModal();
        this.router.navigate(['/']);
    });

    netlifyIdentity.on('logout', () => {
    });

    netlifyIdentity.init();
  }

  showLoginModal(): void {
    netlifyIdentity.open('login');
  }

  closeLoginModal(): void {
    netlifyIdentity.close();
  }

  showRegistrationModal(): void {
    netlifyIdentity.open('signup');
  }

  setInviteToken(token: string): void {
    this.inviteToken = token;
  }

  getInviteToken(): string {
    return this.inviteToken;
  }
}
