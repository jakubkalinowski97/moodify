import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoundsAndMoodsComponent } from './sounds-and-moods.component';
import { SoundsAndMoodsRoutingModule } from './sounds-and-moods-routing.module';
import { BackgroundMoodComponent } from './nested/background-mood/background-mood.component';
import { FiltersComponent } from './nested/background-mood/nested/filters/filters.component';
import { MoodCardComponent } from './nested/background-mood/nested/mood-card/mood-card.component';
import { SoundCardComponent } from './nested/sounds/nested/sound-card/sound-card.component';
import { SoundsComponent } from './nested/sounds/sounds.component';
import { CoreModule } from 'app/core/core.module';


@NgModule({
  declarations: [
    SoundsAndMoodsComponent,
    SoundsComponent,
    SoundCardComponent,
    BackgroundMoodComponent,
    MoodCardComponent,
    FiltersComponent
  ],
  imports: [
    CommonModule,
    SoundsAndMoodsRoutingModule,
    CoreModule
  ]
})
export class SoundsAndMoodsModule { }
