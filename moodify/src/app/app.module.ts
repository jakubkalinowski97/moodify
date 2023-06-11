import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AudioService } from './core/services/audio.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { CoreModule } from './core/core.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { initAppFactory } from './init-on-startup';
import { AuthService } from './core/services/auth.service';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { AppEffects } from './state/app.effects';
import { loginReducer } from './pages/login/state/login.reducer';
import { LoginEffects } from './pages/login/state/login.effects';
import { appReducer } from './state/app.reducer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    StoreModule.forRoot({router: routerReducer, auth: loginReducer, app: appReducer}),
    EffectsModule.forRoot([AppEffects, LoginEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, trace: true }),
    StoreRouterConnectingModule.forRoot()
  ],
  providers: [
    AudioService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initAppFactory,
      deps: [AuthService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
