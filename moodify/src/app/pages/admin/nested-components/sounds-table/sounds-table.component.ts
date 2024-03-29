import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Sound } from 'app/core/models/sound';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-sounds-table',
  templateUrl: './sounds-table.component.html',
  styleUrls: ['./sounds-table.component.scss']
})
export class SoundsTableComponent implements OnInit {
  readonly displayedColumns: string[] = ['isVisible', 'name', 'category', 'subcategory', 'poster'];
  private _data: Sound[] = [];
  private onDestroy$ = new Subject<void>();
  selection = new SelectionModel<Sound>(true, []);

  @Input() set data(value: Sound[] | null) {
    if(value) this._data = value;

    this.selection.setSelection(...this._data.filter((sound) => sound.isVisible))
  }

  get data(): Sound[] {
    return this._data;
  }

  @Output() showSound = new EventEmitter<Sound>();
  @Output() hideSound = new EventEmitter<Sound>();

  ngOnInit(): void {
    this.subscribeToSelectionChanges();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this._data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.data);
  }

  private subscribeToSelectionChanges(): void {
    this.selection.changed.pipe(
      takeUntil(this.onDestroy$)
    ).subscribe((changedSelection) => {
      changedSelection.added.forEach((item) => {
        this.showSound.emit(item);
      });
      changedSelection.removed.forEach((item) => {
        this.hideSound.emit(item);
      });
    });
  }
}
