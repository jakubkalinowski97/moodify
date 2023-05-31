import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, filter } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUser } from 'app/pages/login/state/login.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}
  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let user;
    
    this.store.select(selectUser).pipe(filter(value => !!value)).subscribe((value) => {user = value;});
    
    if(user) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false
    }
  }
}
