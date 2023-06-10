import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { LoginComponent } from './login.component';
import { loginFeatureKey, loginReducer } from './state/login.reducer';
import { LoginEffects } from './state/login.effects';
import { LoginRoutingModule } from './login-routing.module';
import { CoreModule } from 'app/core/core.module';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    CoreModule
  ]
})
export class LoginModule { }
