import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { CardComponent } from './nested/card/card.component';
import { CoreModule } from 'app/core/core.module';
import { HomeRoutingModule } from './home-routing.module';
import { StoreModule } from '@ngrx/store';
import { homeFeatureKey, homeReducer } from './state/home.reducer';



@NgModule({
  declarations: [
    HomeComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    HomeRoutingModule,
    StoreModule.forFeature(homeFeatureKey, homeReducer)
  ]
})
export class HomeModule { }
