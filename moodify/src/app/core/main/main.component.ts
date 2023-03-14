import { Component } from '@angular/core';
import { ToolbarService } from 'app/components/toolbar/toolbar.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  constructor(public toolbarService: ToolbarService) {}
}
