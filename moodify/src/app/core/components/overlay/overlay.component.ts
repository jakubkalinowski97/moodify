import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output,
  ViewChild
} from '@angular/core';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { Subject, debounceTime, filter, fromEvent, share, startWith, switchMap, switchMapTo, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverlayComponent implements OnDestroy, OnInit {
  @Input() CdkOverlayOrigin!: CdkOverlayOrigin;
  @Output() close = new EventEmitter<any>();
  @Output() open = new EventEmitter<any>();

  @ViewChild('dialog') dialog!: ElementRef;
  isOpened = false;
  destroy$ = new Subject<void>();

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    const CdkOverlayOriginEl = this.CdkOverlayOrigin.elementRef.nativeElement;
    const open$ = fromEvent(CdkOverlayOriginEl, 'mouseenter').pipe(
      filter(() => !this.isOpened),
      switchMap(enterEvent =>
        fromEvent(document, 'mousemove').pipe(
          startWith(enterEvent),
          debounceTime(50),
          filter((event: any) => CdkOverlayOriginEl === event['target'])
        )
      ),
      share()
    );

    open$.pipe(
      takeUntil(this.destroy$)
    )
    .subscribe(() => this.changeState(true));

    const close$ = fromEvent(document, 'mousemove').pipe(
      debounceTime(50),
      filter(() => this.isOpened),
      filter(event => this.isMovedOutside(CdkOverlayOriginEl, this.dialog, event))
    )

    open$.pipe(
      takeUntil(this.destroy$),
      switchMapTo(close$)
    )
      .subscribe(() => {
        this.changeState(false);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  connectedOverlayDetach() {
    this.changeState(false);
  }

  private changeState(isOpened: boolean) {
    this.isOpened = isOpened;
    isOpened ? this.open.emit() : this.close.emit();
    this.changeDetectorRef.markForCheck();
  }

  private isMovedOutside(CdkOverlayOriginEl: any, dialog: ElementRef<any>, event: Event): boolean {
    return !(CdkOverlayOriginEl.contains(event['target']) || dialog.nativeElement.contains(event['target']));
  }
}
