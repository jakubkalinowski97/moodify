import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { LoginComponent } from './login.component';
import { loginFeatureKey, loginReducer } from './state/login.reducer';
import { LoginEffects } from './state/login.effects';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(loginFeatureKey, loginReducer),
    EffectsModule.forFeature(LoginEffects),
  ]
})
export class LoginModule { }
