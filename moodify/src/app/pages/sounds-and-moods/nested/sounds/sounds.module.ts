import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { CoreModule } from "app/core/core.module";
import { SoundCardComponent } from "./nested/sound-card/sound-card.component";
import { SoundsComponent } from "./sounds.component";
import { SoundsEffects } from "./state/sounds.effects";
import { soundsFeatureKey, soundsReducer } from "./state/sounds.reducer";

@NgModule({
  declarations: [
    SoundsComponent,
    SoundCardComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    StoreModule.forFeature(soundsFeatureKey, soundsReducer),
    EffectsModule.forFeature(SoundsEffects)
  ],
  exports: [
    SoundsComponent
  ]
})
export class SoundsModule { }
