import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CoreModule } from "app/core/core.module";
import { BackgroundMoodComponent } from "./background-mood.component";
import { MoodCardComponent } from "./nested/mood-card/mood-card.component";
import { StoreModule } from '@ngrx/store';
import { backgroundMoodsFeatureKey, backgroundMoodsReducer } from "./state/background-mood.reducer";
import { EffectsModule } from "@ngrx/effects";
import { BackgroundMoodsEffects } from "./state/background-mood.effects";
import { FiltersComponent } from "./nested/filters/filters.component";

@NgModule({
  declarations: [
    BackgroundMoodComponent,
    MoodCardComponent,
    FiltersComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    StoreModule.forFeature(backgroundMoodsFeatureKey, backgroundMoodsReducer),
    EffectsModule.forFeature(BackgroundMoodsEffects)
  ],
  exports: [
    BackgroundMoodComponent
  ]
})
export class BackgroundMoodsModule { }
