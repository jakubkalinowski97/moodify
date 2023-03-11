import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {
    let routeFragment = this.activatedRoute.fragment

    routeFragment
      .pipe(
        filter((fragment: any) => !!fragment),
        map((fragment: string) => fragment)
      )
      .subscribe(fragment => {
        console.log(fragment);
        let f = fragment?.match(/^(.*?)&/);
          if(f) {
          let token: string = f[1].replace('invite_token=', '');
          this.authService.setInviteToken(token);
        }
    });
  }

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
