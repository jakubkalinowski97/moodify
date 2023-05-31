import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoundsAndMoodsComponent } from './sounds-and-moods.component';
import { SoundsAndMoodsRoutingModule } from './sounds-and-moods-routing.module';
import { FiltersComponent } from './nested/background-mood/nested/filters/filters.component';
import { CoreModule } from 'app/core/core.module';
import { SoundsModule } from './nested/sounds/sounds.module';
import { BackgroundMoodsModule } from './nested/background-mood/background-mood.module';


@NgModule({
  declarations: [
    SoundsAndMoodsComponent,
    FiltersComponent
  ],
  imports: [
    CommonModule,
    SoundsAndMoodsRoutingModule,
    SoundsModule,
    BackgroundMoodsModule,
    CoreModule
  ]
})
export class SoundsAndMoodsModule { }
