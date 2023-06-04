import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {
  isOpened$ = new BehaviorSubject<boolean>(false);
  isAvailable$ = new BehaviorSubject<boolean>(false);
  componentInPortal$ = new Subject<ComponentPortal<any>>;

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

  setComponentInPortal(component: ComponentPortal<any>): void {
    this.componentInPortal$.next(component);
  }

  setAvailability(value: boolean): void {
    this.isAvailable$.next(value);
    if(!value) {
      this.close();
    }
  }
}
