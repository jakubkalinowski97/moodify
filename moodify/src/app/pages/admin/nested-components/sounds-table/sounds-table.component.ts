import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input } from '@angular/core';
import { Sound } from 'app/core/models/sound';

@Component({
  selector: 'app-sounds-table',
  templateUrl: './sounds-table.component.html',
  styleUrls: ['./sounds-table.component.scss']
})
export class SoundsTableComponent {
  readonly displayedColumns: string[] = ['isVisible', 'name', 'category', 'subcategory'];
  private _data: Sound[] = [];
  selection = new SelectionModel<Sound>(true, []);

  @Input() set data(value: Sound[] | null) {
    console.log(value);
    if(value) this._data = value;
  }

  get data(): Sound[] {
    return this._data;
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
}
