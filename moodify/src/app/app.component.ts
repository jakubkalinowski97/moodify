import { Component } from '@angular/core';
import { ToolbarService } from './components/toolbar/toolbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isMobile = /Android|iPhone/i.test(navigator.userAgent);
  title = 'Moodify';
  constructor(public toolbarService: ToolbarService){}
}
