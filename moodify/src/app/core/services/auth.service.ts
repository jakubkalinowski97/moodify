import { Injectable } from '@angular/core';
import netlifyIdentity, { User } from 'netlify-identity-widget';
import { Observable, map, Subject, tap } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user$ = new Subject<User | null>();
  private user!: User | null;
  private inviteToken: string = '';

  constructor(private router: Router) { 
    this.handleNetlifyEvents();
    netlifyIdentity.init();
  }

  private handleNetlifyEvents(): void {
    netlifyIdentity.on('init', (user) => {
      this.user$.next(user);
      this.user = user;
    });

    netlifyIdentity.on('login', (user) => {
        this.user$.next(user);
        this.user = user;
        this.closeLoginModal();
        this.router.navigate(['/']);
    });

    netlifyIdentity.on('logout', () => {
      this.user$.next(null);
      this.user = null;
    });
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

  getUser(): Observable<User | null> {
    return this.user$.asObservable();
  }

  getUserRaw(): User | null {
    return this.user;
  }

  isAuthenticated(): Observable<boolean> {
    return this.user$.asObservable()
      .pipe(
        map(user => Boolean(user))
      )
  }

  isAuthenticatedRaw(): boolean {
    return Boolean(this.user);
  }

  setInviteToken(token: string): void {
    this.inviteToken = token;
  }

  getInviteToken(): string {
    return this.inviteToken;
  }
}
