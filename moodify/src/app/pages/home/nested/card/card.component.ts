import { Component, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @HostListener('mouseover', ['$event'])
  onHover() {
    document.body.style.backgroundImage = `url(${this.imgSrc})`;
  }

  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() imgSrc: string = '';
  @Input() disabled: boolean = false;
  @Input() href: string = '';
}
