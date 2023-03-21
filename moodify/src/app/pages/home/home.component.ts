import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/core/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  isAdmin$!: Observable<boolean>;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isAdmin$ = this.authService.isAdmin();
  }
}
