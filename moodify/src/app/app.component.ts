import { Component } from '@angular/core';
import { ToolbarService } from './components/toolbar/toolbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public toolbarService: ToolbarService){}
}
