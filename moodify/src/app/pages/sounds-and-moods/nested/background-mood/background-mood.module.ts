import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CoreModule } from "app/core/core.module";
import { SoundsAndMoodsRoutingModule } from "../../sounds-and-moods-routing.module";
import { BackgroundMoodComponent } from "./background-mood.component";
import { MoodCardComponent } from "./nested/mood-card/mood-card.component";

@NgModule({
  declarations: [
    BackgroundMoodComponent,
    MoodCardComponent
  ],
  imports: [
    CommonModule,
    SoundsAndMoodsRoutingModule,
    CoreModule
  ],
  exports: [
    BackgroundMoodComponent
  ]
})
export class BackgroundMoodsModule { }
