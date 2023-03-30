import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { CardComponent } from './nested/card/card.component';
import { CoreModule } from 'app/core/core.module';



@NgModule({
  declarations: [
    HomeComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    CoreModule
  ]
})
export class HomeModule { }
