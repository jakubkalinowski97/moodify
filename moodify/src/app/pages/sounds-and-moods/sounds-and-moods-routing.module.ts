import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SoundsAndMoodsComponent } from './sounds-and-moods.component';

const routes: Routes = [{ path: '', component: SoundsAndMoodsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SoundsAndMoodsRoutingModule { }
