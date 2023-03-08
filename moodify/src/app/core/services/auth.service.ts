import { Injectable } from '@angular/core';
import netlifyIdentity, { User } from 'netlify-identity-widget';
import { Observable, map, Subject, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user$ = new Subject<User | null>();
  private user!: User | null;
  constructor() { 
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
}
