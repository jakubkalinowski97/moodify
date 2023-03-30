import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {
  isOpened$ = new BehaviorSubject<boolean>(false);
  isAvailable$ = new BehaviorSubject<boolean>(false);

  constructor() { }

  open(): void {
    this.isOpened$.next(true);
  }

  close(): void {
    this.isOpened$.next(false);
  }

  toggle(): void {
    this.isOpened$.next(!this.isOpened$.value);
  }

  setAvailability(value: boolean): void {
    this.isAvailable$.next(value);
    if(!value) {
      this.close();
    }
  }
}
