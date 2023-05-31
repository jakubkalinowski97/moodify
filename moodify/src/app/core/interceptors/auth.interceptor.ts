import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, first } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectToken } from 'app/pages/login/state/login.selectors';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
  token = '';
  constructor(private store: Store) {}
  
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.store.select(selectToken).pipe().subscribe((value) => {this.token = `${value}`});
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.token}`
      }
    });
    return next.handle(request);
  }
}
