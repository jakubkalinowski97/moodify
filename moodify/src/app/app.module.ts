import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './core/main/main.component';

import { BackgroundMoodComponent } from './components/background-mood/background-mood.component';
import { ItemComponent } from './components/sidenav/nested/item/item.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SoundCardComponent } from './components/sounds/nested/sound-card/sound-card.component';
import { SoundsComponent } from './components/sounds/sounds.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { PageContainerComponent } from './core/page-container/page-container.component';
import { HomeComponent } from './pages/home/home.component';
import { CardComponent } from './pages/home/nested/card/card.component';
import { MoodCardComponent } from './components/background-mood/nested/mood-card/mood-card.component';
import { SoundsAndMoodsComponent } from './pages/sounds-and-moods/sounds-and-moods.component';
import { AudioService } from './core/services/audio.service';
import { SearchInputComponent } from './core/components/search-input/search-input.component';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ToolbarComponent,
    SidenavComponent,
    PageContainerComponent,
    SoundsComponent,
    ItemComponent,
    SoundCardComponent,
    HomeComponent,
    CardComponent,
    BackgroundMoodComponent,
    MoodCardComponent,
    SoundsAndMoodsComponent,
    SearchInputComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatSliderModule,
    MatInputModule
  ],
  providers: [AudioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
