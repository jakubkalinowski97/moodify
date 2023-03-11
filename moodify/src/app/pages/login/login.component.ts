import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if(this.authService.isAuthenticatedRaw()) {
      this.router.navigate(['/home']);
    } else {
      this.showLoginModal();
    }
  }

  showLoginModal(): void {
    this.authService.showLoginModal();
  }

  showRegistrationModal(): void {
    this.authService.showRegistrationModal();
  }
}
