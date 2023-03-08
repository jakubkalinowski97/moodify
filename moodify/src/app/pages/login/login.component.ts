import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.showLoginModal();
  }

  showLoginModal(): void {
    this.authService.showLoginModal();
  }

  showRegistrationModal(): void {
    this.authService.showRegistrationModal();
  }
}
